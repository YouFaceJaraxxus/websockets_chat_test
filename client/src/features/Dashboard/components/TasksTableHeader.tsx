import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import {
  CreateTask,
  TableHeader,
  TablePleft,
  TablePTitle,
  TableTabs,
  TableTabsP,
  TasksLeftText,
} from '../ui/TasktableHeaderStyle';
import { BackgroundIcons } from '../DashboardStyle';
import tasks from '../../../assets/icons/tasks.svg';
import checklist from '../../../assets/icons/checklist.svg';
import SaveTaskModal from './SaveTaskModal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../Auth/slices/authSlice';
import { selectConfigMap } from '../../../common/config/configSlice';
import { CreateNewTaskIcon } from '../../../assets/icons';
import { IconWrapper } from '../ui/SaveTaskModalStyle';
import { ACCOUNT_PLAN_PATH } from '../../../routes/path-constants';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const MONTHLY = 'MONTHLY';
const ONE_TIME = 'ONE_TIME';
const ACTIVE = 'active';
const TasksTableHeader = ({
  getTasks,
  resetPage,
  listId,
  refreshTasks }) => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const config = useAppSelector(selectConfigMap);
  const currentUser = useAppSelector(selectUser);
  const { stats } = useAppSelector((state) => state.tasks);
  const { userSubscriptions } = useAppSelector((state) => state.auth);
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false);
  const toggleModal = () => setCreateTaskModalOpen(!createTaskModalOpen);
  const { t } = useTranslation();

  const handleSuccess = (success: boolean) => {
    if (success) {
      dispatch(openNotification({
        isOpen: true,
        messageBody: t('home-page.task-created'),
        severity: 'success',
      }));
      refreshTasks(true);
    }
  };

  const handleListChange = (newListId: number) => {
    resetPage();
    getTasks(newListId);
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
        <TablePTitle>
          <BackgroundIcons backColor="#948cfc36">
            <Avatar
              alt="Tasks Icon"
              src={tasks}
              sx={{ width: '80%', height: '80%', margin: '0px auto' }}
            />
          </BackgroundIcons>
          <Typography
            variant="h5"
            sx={{ fontWeight: 'bold', marginLeft: '20px' }}
          >
            {t('home-page.tasks')}
          </Typography>
        </TablePTitle>
        {!currentUser.isAdmin && (
          <TablePleft
            onClick={() => {
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
        )}
        <TableTabs>
          <TableTabsP
            isAdmin={currentUser.isAdmin}
            onClick={() => {
              handleListChange(0);
            }}
            selected={listId === 0}
          >
            {t('home-page.my-tasks')}
          </TableTabsP>
          <TableTabsP
            isAdmin={currentUser.isAdmin}
            onClick={() => {
              handleListChange(1);
            }}
            selected={listId === 1}
          >
            {t('home-page.pending')}
          </TableTabsP>
          <TableTabsP
            isAdmin={currentUser.isAdmin}
            onClick={() => {
              handleListChange(2);
            }}
            selected={listId === 2}
          >
            {t('home-page.active')}
          </TableTabsP>
          <TableTabsP
            isAdmin={currentUser.isAdmin}
            onClick={() => {
              handleListChange(3);
            }}
            selected={listId === 3}
          >
            {t('home-page.completed')}
          </TableTabsP>
          {currentUser.isAdmin && (
            <TableTabsP
              isAdmin={currentUser.isAdmin}
              onClick={() => {
                handleListChange(4);
              }}
              selected={listId === 4}
            >
              {t('home-page.blocked')}
            </TableTabsP>
          )}
        </TableTabs>
        {!currentUser.isAdmin && (
          <CreateTask onClick={() => toggleModal()}>
            <IconWrapper sx={{ marginRight: '6%' }}>
              <CreateNewTaskIcon />
            </IconWrapper>
            {t('home-page.create-new')}
          </CreateTask>
        )}
        <SaveTaskModal
          config={config}
          open={createTaskModalOpen}
          handleClose={() => {
            toggleModal();
          }}
          type="create"
          handleResult={(success: boolean) => {
            handleSuccess(success);
          }}
          taskId={null}
          initialValues={{}}
          initialAttachments={[]}
          toggleModal={null}
        />
      </TableHeader>
    </>
  );
};

export default TasksTableHeader;
