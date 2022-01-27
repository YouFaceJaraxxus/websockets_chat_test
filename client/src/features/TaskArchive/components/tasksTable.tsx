/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Pagination, PaginationItem } from '@mui/material';
import { KeyboardArrowDown, KeyboardArrowUp } from '@material-ui/icons';
import moment from 'moment';
import { NoTask, PriorityIconText, StatusBar, TableSpinner, TableSpinnerWrapper } from '../../Dashboard/ui/TableDataStyle';
import { FilterIcon, PriorityIcon } from '../../../assets/icons/index';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectConfigMap, selectPriorities } from '../../../common/config/configSlice';
import { PriorityIconWrapper, Regular } from '../TasksStyle';
import { IGetTasksFilter } from '../../Dashboard/models/getTasksFilter.model';
import { getTasksAsync, resetTasks } from '../../Dashboard/models/tasks/tasksSlice';
import TaskOverviewModal from '../../Dashboard/components/TaskOverviewModal';
import TaskListUser from '../../Dashboard/components/TaskListUser';
import { SortableCell, SortableCellText } from '../ui/tasksTableStyle';
import { IconWrapperPointer } from '../../Dashboard/ui/SaveTaskModalStyle';
import { IUser } from '../../Auth/models/user/user';
import UserFilterModal from '../../Dashboard/components/UserFilterModal';

const ASC = 'asc';
const DESC = 'desc';
const LIMIT = 8;
const TITLE = 'title';
const CREATED_AT = 'createdAt';
const DUE_DATE = 'dueDate';
const PRIORITY_ID = 'priorityId';
const SPINNER_DELAY_TIMEOUT = 200;
export default function TasksTable() {
  const tasks = useAppSelector((state) => state.tasks);
  const { t } = useTranslation();
  const priorities = useAppSelector(selectPriorities).map((priority) => ({
    value: priority.value,
    label: t(`config.${priority.label}`),
    colorCode: priority.colorCode,
  }));
  const count = useAppSelector((state) => state.tasks.count);
  const dispatch = useAppDispatch();
  const config = useAppSelector(selectConfigMap);

  const [fetchTasksDelay, setFetchTasksDelay] = useState(true);
  const [firstFetch, setFirstFetch] = useState(true);

  const [allUsers, setAllUsers] = useState([] as IUser[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);

  const getTasksByPage = (page = 1, sort = {}, users = selectedUsers) => {
    const queryFilter = {
      where: {
        dateArchived: true,
        isBlocked: false,
        ...(users && users.length > 0 && { userFilter: users.map((u) => u.id) }),
      },
      limit: LIMIT,
      page,
      ...sort,
    } as IGetTasksFilter;
    dispatch(getTasksAsync(queryFilter)).then(() => {
      setFetchTasksDelay(false);
      setFirstFetch(false);
    });
  };

  useEffect(() => {
    const setDelay = setTimeout(() => {
      if (tasks.taskProcesses.fetchingTasks) {
        setFetchTasksDelay(true);
      }
    }, SPINNER_DELAY_TIMEOUT);
    return () => { clearInterval(setDelay); };
  }, [tasks.taskProcesses.fetchingTasks]);

  const [sort, setSort] = useState({
    sortBy: CREATED_AT,
    sortDirection: DESC,
  });

  const getNumberOfPages = () => Math.ceil(count / LIMIT);

  const [currentPage, setCurrentPage] = useState(1);

  const getNextSortState = (sortValue: string): string => {
    if (sortValue === ASC) return DESC;
    if (sortValue === DESC) return ASC;
    return DESC;
  };

  const getTooltipText = (sortBy: string): string => {
    if (sortBy === sort.sortBy) {
      const currentSortValue = sort.sortDirection;
      if (currentSortValue === ASC) return t('home-page.ascending');
      if (currentSortValue === DESC) return t('home-page.descending');
      return t('home-page.not-selected');
    } return t('home-page.not-selected');
  };

  const toggleSortState = (sortBy: string) => {
    let direction = null;
    if (sort.sortBy !== sortBy) {
      direction = DESC;
    } else {
      direction = getNextSortState(sort.sortDirection);
    }
    setSort({
      sortBy,
      sortDirection: direction,
    });
    if (direction != null) {
      getTasksByPage(currentPage, {
        sortBy,
        sortDirection: direction,
      });
    }
  };

  const renderArrow = (sortBy: string) => {
    if (sortBy === sort.sortBy) {
      const currentSortValue = sort.sortDirection;
      if (currentSortValue === ASC) {
        return (
          <KeyboardArrowUp
            onClick={() => { toggleSortState(sortBy); }}
            sx={{ cursor: 'pointer' }}
          />
        );
      }
      if (currentSortValue === DESC) {
        return (
          <KeyboardArrowDown
            onClick={() => { toggleSortState(sortBy); }}
            sx={{ cursor: 'pointer' }}
          />
        );
      }
      return (
        <KeyboardArrowDown
          onClick={() => { toggleSortState(sortBy); }}
          sx={{ cursor: 'pointer' }}
        />
      );
    }
    return (
      <KeyboardArrowDown
        onClick={() => { toggleSortState(sortBy); }}
        sx={{ cursor: 'pointer' }}
      />
    );
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    if (currentPage !== newPage) {
      setCurrentPage(newPage);
      getTasksByPage(newPage, sort);
    }
  };

  const getNumberIconColor = (item) => {
    if (item.type === 'previous' || item.type === 'next') return '#948CFC !important';
    return (currentPage === item.page ? '#948CFC !important' : 'black !important');
  };

  const getNumberIconWeight = (item) => {
    if (item.type === 'previous' || item.type === 'next') return 'bolder';
    return (currentPage === item.page ? 'bolder' : 'regular');
  };

  useEffect(() => {
    getTasksByPage(1, sort);
    return () => {
      setCurrentPage(1);
      dispatch(resetTasks());
    };
  }, [dispatch]);

  const [filterByUserNameModalOpen, setUserFilterModalOpen] = useState(false);
  const closeUserFilterModal = () => {
    if (filterByUserNameModalOpen) { setUserFilterModalOpen(false); }
  };
  const openUserFilterModal = () => {
    if (!filterByUserNameModalOpen) { setUserFilterModalOpen(true); }
  };

  const runSearch = (users = selectedUsers) => {
    setCurrentPage(1);
    getTasksByPage(1, sort, users);
  };

  const toggleUser = (user: IUser) => {
    const existingUser = selectedUsers.find((u) => u.id === user.id);
    let users = selectedUsers;
    if (existingUser) {
      setSelectedUsers(selectedUsers.filter((u) => u.id !== user.id));
      users = users.filter((u) => u.id !== user.id);
    } else {
      setSelectedUsers([...selectedUsers, user]);
      users.push(user);
    }
    runSearch(users);
  };

  const resetSelectedUsers = () => {
    setSelectedUsers([]);
    runSearch([]);
  };

  const getFilterIconColor = () => (selectedUsers &&
    selectedUsers.length > 0 ?
    '#948CFC' :
    '#9BA8DB');

  const [selectedTask, setSelectedTask] = useState(null);
  const [taskOverviewModalOpen, setTaskOverviewModalOpen] = useState(false);
  const closeModal = () => {
    if (taskOverviewModalOpen) {
      setTaskOverviewModalOpen(false);
      // there is a reason for this timeout and the way tasks are set
      setTimeout(() => setSelectedTask(null), 250);
    }
  };
  const openTaskOverview = (task) => {
    if (selectedTask == null && !taskOverviewModalOpen) {
      setSelectedTask(task);
      setTaskOverviewModalOpen(true);
    }
  };

  const renderPriority = (priorityId) => {
    const priority = priorities && priorities.find((p) => p.value === priorityId);
    if (priority) {
      return (
        <PriorityIconText>
          <PriorityIconWrapper>
            <PriorityIcon color={priority.colorCode} size={16} />
          </PriorityIconWrapper>
          <Regular sx={{ marginLeft: '10%' }}>
            {priority.label}
          </Regular>
        </PriorityIconText>
      );
    }
    return null;
  };
  return (
    <>
      <TableContainer>
        <Table sx={{ minWidth: 650, border: 'none' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ fontWeight: 'bold', minWidth: '200px', maxWidth: '200px' }}
                align="left"
              >
                <SortableCell>
                  <SortableCellText
                    title={getTooltipText(TITLE)}
                  >
                    {t('task-archive.task-name')}
                  </SortableCellText>
                  {renderArrow(TITLE)}
                </SortableCell>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', minWidth: '125px', maxWidth: '125px' }} align="left">
                {t('task-archive.status')}
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', minWidth: '125px', maxWidth: '125px' }}
                align="left"
              >
                <SortableCell>
                  <SortableCellText
                    title={getTooltipText(CREATED_AT)}
                  >
                    {t('task-archive.created')}
                  </SortableCellText>
                  {renderArrow(CREATED_AT)}
                </SortableCell>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', width: '200px' }} align="left">
                {t('task-archive.user')}
              </TableCell>

              <TableCell
                sx={{ fontWeight: 'bold', minWidth: '125px', maxWidth: '125px' }}
                align="left"
              >
                <SortableCell>
                  <SortableCellText
                    title={getTooltipText(DUE_DATE)}
                  >
                    {t('task-archive.due-date')}
                  </SortableCellText>
                  {renderArrow(DUE_DATE)}
                </SortableCell>
              </TableCell>
              <TableCell
                sx={{ fontWeight: 'bold', minWidth: '125px', maxWidth: '125px' }}
                align="left"
              >
                <SortableCell>
                  <SortableCellText
                    title={getTooltipText(PRIORITY_ID)}
                  >
                    {t('task-archive.priority')}
                  </SortableCellText>
                  {renderArrow(PRIORITY_ID)}
                </SortableCell>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', minWidth: '200px', maxWidth: '200px' }} align="left">
                {t('task-archive.assignment')}
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  maxWidth: '125px !important',
                  minWidth: '125px !important',
                  position: 'relative' }}
                align="right"
              >
                <IconWrapperPointer
                  onClick={openUserFilterModal}
                >
                  <FilterIcon color={getFilterIconColor()} />

                  {filterByUserNameModalOpen && (
                  <UserFilterModal
                    open={filterByUserNameModalOpen}
                    handleClose={closeUserFilterModal}
                    toggleUser={toggleUser}
                    selectedUsers={selectedUsers}
                    resetSelectedUsers={resetSelectedUsers}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                  />
                  )}
                </IconWrapperPointer>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody
            sx={{
              overflow: 'scroll',
              minHeight: '50vh',
              position: 'relative',
            }}
          >
            {firstFetch ?
              (
                <TableRow sx={{ height: '100%' }}>
                  <TableCell colSpan={8} sx={{ borderBottom: 'none' }}>
                    <TableSpinnerWrapper>
                      <TableSpinner color="primary" />
                    </TableSpinnerWrapper>
                  </TableCell>
                </TableRow>
              )
              : (
                <>
                  {
                    !firstFetch && tasks.taskProcesses.fetchingTasks && fetchTasksDelay &&
                    (
                      <TableSpinnerWrapper sx={{
                        position: 'absolute',
                        textAlign: 'center',
                        margin: '0px auto',
                        background: '#ffffffc7',
                        width: '100%',
                        height: '99%',
                        zIndex: '10',
                      }}
                      >
                        <TableSpinner color="primary" />
                      </TableSpinnerWrapper>
                    )
                  }
                  {
                    tasks.tickets.length > 0 ?
                      tasks.tickets.map((task) => (
                        <TableRow
                          key={task.id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                            '&:hover': { opacity: 0.8, cursor: 'pointer' },
                          }}
                          onClick={() => {
                            openTaskOverview(task);
                          }}
                        >
                          <TableCell
                            align="left"
                          >
                            {task.title}

                          </TableCell>
                          <TableCell align="left">
                            <StatusBar color="#FF3A4F">{t('home-page.archived')}</StatusBar>
                          </TableCell>
                          <TableCell align="left">
                            {moment(task.createdAt)?.format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell align="left">
                            <TaskListUser type="createdBy" user={task.createdBy} />
                          </TableCell>
                          <TableCell align="left">
                            {moment(task.dueDate)?.format('DD/MM/YYYY')}
                          </TableCell>
                          <TableCell align="left">
                            {renderPriority(task.priorityId)}
                          </TableCell>
                          <TableCell align="left">
                            <TaskListUser type="assignedTo" user={task.assignedTo} />
                          </TableCell>
                          <TableCell />
                        </TableRow>
                      )) :
                      (
                        <TableRow sx={{ height: '100%' }}>
                          <TableCell colSpan={8} sx={{ borderBottom: 'none' }}>
                            <NoTask>{t('home-page.no-tasks')}</NoTask>
                          </TableCell>
                        </TableRow>
                      )
                    }
                </>
              )}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        sx={{
          '& > ul:first-child': {
            color: 'red !important',
          },
          '& > ul:last-child': {
            color: 'red !important',
          },
        }}
        count={getNumberOfPages()}
        page={+currentPage}
        onChange={handlePaginationChange}
        defaultPage={+1}
        renderItem={(item) => (
          <PaginationItem
            {...item}
            sx={{
              backgroundColor: 'white !important',
              color: getNumberIconColor(item),
              fontWeight: getNumberIconWeight(item),
            }}
          >
            {item.page}
          </PaginationItem>
        )}
        variant="text"
        color="primary"
      />
      {selectedTask != null && (
        <div style={{ position: 'absolute' }}>
          <TaskOverviewModal
            config={config}
            handleClose={() => { closeModal(); }}
            task={selectedTask}
            handleResult={null}
          />
        </div>
      )}
    </>
  );
}
