import React, { useState } from 'react';
import { useHistory } from 'react-router';
import Avatar from '@mui/material/Avatar';
import { useTranslation } from 'react-i18next';
import {
  CreateTask,
  SelectArrowDown,
  TableHeader,
  TableHeaderRow,
  TablePleft,
  TablePTitle,
  TaskListSelect,
  TaskListSelectText,
  TasksLeftText,
} from '../../ui/mobile/TasktableMobileHeaderStyle';
import { BackgroundIcons } from '../../DashboardStyle';
import tasks from '../../../../assets/icons/tasks.svg';
import checklist from '../../../../assets/icons/checklist.svg';
import SaveTaskModal from '../SaveTaskModal';
import { useAppDispatch, useAppSelector } from '../../../../store/hooks';
import { selectUser } from '../../../Auth/slices/authSlice';
import { selectConfigMap } from '../../../../common/config/configSlice';
import { CreateNewTaskIcon } from '../../../../assets/icons';
import { IconWrapper } from '../../ui/SaveTaskModalStyle';
import TaskOverviewDropdown from '../../../../components/dropdown/CustomDropdown';
import { ACCOUNT_PLAN_PATH } from '../../../../routes/path-constants';
import { openNotification } from '../../../../components/notifications/model/globalNotificationSlice';

const MONTHLY = 'MONTHLY';
const ONE_TIME = 'ONE_TIME';
const ACTIVE = 'active';
const TasksTableHeader = ({
  getTasks,
  resetPage,
  listId,
  refreshTasks }) => {
  const dispatch = useAppDispatch();
  const config = useAppSelector(selectConfigMap);
  const { stats } = useAppSelector((state) => state.tasks);
  const { userSubscriptions } = useAppSelector((state) => state.auth);
  const currentUser = useAppSelector(selectUser);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const toggleModal = () => setCreateTaskModalOpen(!createTaskModalOpen);
  const { t } = useTranslation();
  const history = useHistory();
  const selectTaskTypeList = new Map([
    [0, 'My Tasks'],
    [1, 'Pending'],
    [2, 'Active'],
    [3, 'Completed'],
    [4, 'Blocked'],
  ]);

  const handleListChange = (newListId: number) => {
    resetPage();
    getTasks(newListId);
  };

  const dropdownOptions = Array.from(selectTaskTypeList)
    .map(([key, value]) => ({
      id: key,
      label: value,
      action: () => {
        handleListChange(key);
      },
    }));

  const handleSuccess = (success: boolean) => {
    if (success) {
      dispatch(openNotification({
        isOpen: true,
        messageBody: 'Task created',
        severity: 'success',
      }));
      refreshTasks(true);
    }
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dropdownOpen = Boolean(anchorEl);
  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const renderTasksLeft = () => {
    if (userSubscriptions != null) {
      const monthly = userSubscriptions.find((s) => s.users_subscriptions.status === ACTIVE &&
       s.type === MONTHLY);
      if (monthly) return monthly.maxActiveTickets - stats.openTasks;

      const oneTime = userSubscriptions.find((s) => s.users_subscriptions.status === ACTIVE &&
      s.type === ONE_TIME);
      if (oneTime) return 0;
    }
    return 0;
  };

  return (
    <>
      <TableHeader>
        <TableHeaderRow>
          <TablePTitle>
            <BackgroundIcons backColor="#948cfc36">
              <Avatar
                alt="Tasks Icon"
                src={tasks}
                sx={{ width: '80%', height: '80%', margin: '0px auto' }}
              />
            </BackgroundIcons>
            {t('home-page.tasks')}
          </TablePTitle>
          <TaskListSelect onClick={handleDropdownClick}>
            <TaskListSelectText>
              {selectTaskTypeList.get(listId)}
            </TaskListSelectText>
            <IconWrapper>
              <SelectArrowDown />
            </IconWrapper>
          </TaskListSelect>
          <TaskOverviewDropdown
            open={dropdownOpen}
            anchorEl={anchorEl}
            setAnchorEl={setAnchorEl}
            options={dropdownOptions}
          />
        </TableHeaderRow>
        {
          !currentUser.isAdmin && (
            <>
              <TableHeaderRow>
                <TablePleft onClick={() => {
                  history.push(ACCOUNT_PLAN_PATH);
                }}
                >
                  <Avatar
                    alt="Check List Icon"
                    src={checklist}
                    sx={{ width: 30, height: 30, margin: '0px auto' }}
                  />
                  <TasksLeftText>
                    {renderTasksLeft()}
                    &nbsp;
                    {t('home-page.tasks-left')}
                  </TasksLeftText>
                </TablePleft>
                <CreateTask onClick={() => toggleModal()}>
                  <IconWrapper sx={{ marginRight: '6%' }}>
                    <CreateNewTaskIcon />
                  </IconWrapper>
                  {t('home-page.create-new')}
                </CreateTask>
              </TableHeaderRow>
              {createTaskModalOpen && (
              <SaveTaskModal
                config={config}
                open={createTaskModalOpen}
                handleClose={() => { toggleModal(); }}
                type="create"
                handleResult={(success: boolean) => { handleSuccess(success); }}
                taskId={null}
                initialValues={{}}
                initialAttachments={[]}
                toggleModal={null}
              />
              )}
            </>
          )
        }

      </TableHeader>
    </>
  );
};

export default TasksTableHeader;
