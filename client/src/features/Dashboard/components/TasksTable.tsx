import React, { useEffect, useState } from 'react';
import { Pagination, PaginationItem } from '@mui/material';
import TasksTableHeader from './TasksTableHeader';
import TableData from './TableData';
import {
  TasksTableStyled,
} from '../ui/TasksTableStyle';
import TasksTableMobileHeader from './mobile/TasksTableMobileHeader';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { getTasksAsync, getTaskStatsAsync, resetTasks } from '../models/tasks/tasksSlice';
import { selectUser } from '../../Auth/slices/authSlice';
import { IGetTasksFilter } from '../models/getTasksFilter.model';
import { IUser } from '../../Auth/models/user/user';

const ASC = 'asc';
const DESC = 'desc';
const LIMIT = 8;
const CREATED_AT = 'createdAt';
const SPINNER_DELAY_TIMEOUT = 200;
const TasksTable = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(selectUser);
  const { count, taskProcesses } = useAppSelector((state) => state.tasks);
  const [firstFetch, setFirstFetch] = useState(true);

  const filtersMap = new Map([
    [0, {
      dateArchived: false,
      isBlocked: false,
      ...(currentUser.isAdmin && { assignedToId: currentUser.id }),
    }],
    [1, {
      isBlocked: false,
      dateArchived: false,
      statusId: 1,
    }],
    [2, {
      isBlocked: false,
      dateArchived: false,
      statusId: 2,
    }],
    [3, {
      isBlocked: false,
      dateArchived: false,
      statusId: 3,
    }],
    [4, {
      isBlocked: true,
    }],
  ]);

  const [allUsers, setAllUsers] = useState([] as IUser[]);
  const [selectedUsers, setSelectedUsers] = useState([] as IUser[]);

  const getNumberOfPages = () => Math.ceil(count / LIMIT);

  const [listId, setListId] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  const [sort, setSort] = useState({
    sortBy: CREATED_AT,
    sortDirection: DESC,
  });

  const [fetchTasksDelay, setFetchTasksDelay] = useState(true);
  const getTasks = (id: number, sortParams = sort, page = 1, users = selectedUsers) => {
    setListId(id);
    const queryFilter = {
      where: {
        ...filtersMap.get(id),
        ...(users && users.length > 0 && { userFilter: users.map((u) => u.id) }),
      },
      limit: LIMIT,
      page,
      ...sortParams,
    } as IGetTasksFilter;

    dispatch(getTasksAsync(queryFilter)).then(() => {
      setFetchTasksDelay(false);
      setFirstFetch(false);
    });
  };

  useEffect(() => {
    const setDelay = setTimeout(() => {
      if (taskProcesses.fetchingTasks) {
        setFetchTasksDelay(true);
      }
    }, SPINNER_DELAY_TIMEOUT);
    return () => { clearInterval(setDelay); };
  }, [taskProcesses.fetchingTasks]);

  const getNextSortState = (sortValue: string): string => {
    if (sortValue === ASC) return DESC;
    if (sortValue === DESC) return ASC;
    return DESC;
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
      getTasks(listId, {
        sortBy,
        sortDirection: direction,
      }, currentPage);
    }
  };

  const refreshTasks = (resetId = true) => {
    setCurrentPage(1);
    if (resetId) {
      getTasks(0, sort, 1);
    } else getTasks(listId, sort, 1);
    dispatch(getTaskStatsAsync());
  };

  useEffect(() => {
    getTasks(0, sort, 1);
    dispatch(getTaskStatsAsync());
    return () => {
      setCurrentPage(1);
      setListId(0);
      dispatch(resetTasks());
    };
  }, []);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, newPage: number) => {
    if (currentPage !== newPage) {
      setCurrentPage(newPage);
      getTasks(listId, sort, newPage);
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

  const runSearch = (users = selectedUsers) => {
    setCurrentPage(1);
    getTasks(listId, sort, 1, users);
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

  return (
    <TasksTableStyled>
      <TasksTableHeader
        getTasks={getTasks}
        resetPage={() => setCurrentPage(1)}
        listId={listId}
        refreshTasks={refreshTasks}
      />
      <TasksTableMobileHeader
        getTasks={getTasks}
        resetPage={() => setCurrentPage(1)}
        listId={listId}
        refreshTasks={refreshTasks}
      />
      <TableData
        refreshTasks={(resetId: boolean) => refreshTasks(resetId)}
        toggleSortState={toggleSortState}
        sort={sort}
        allUsers={allUsers}
        setAllUsers={setAllUsers}
        toggleUser={toggleUser}
        selectedUsers={selectedUsers}
        resetSelectedUsers={resetSelectedUsers}
        selectedListId={listId}
        fetchTasksDelay={fetchTasksDelay}
        firstFetch={firstFetch}
        listId={listId}
      />

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
    </TasksTableStyled>
  );
};

export default TasksTable;
