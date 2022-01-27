/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { KeyboardArrowUp } from '@material-ui/icons';
import { useLocation, useParams } from 'react-router';
import {
  NoTask,
  StatusBar,
  TableSpinner,
  PriorityIconWrapper,
  PriorityIconText,
  Regular,
  SortableCell,
  TableSpinnerWrapper,
  SortableCellText,
} from '../ui/TableDataStyle';
import TaskOverviewModal from './TaskOverviewModal';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  selectConfigMap,
  selectPriorities,
  selectStatuses,
} from '../../../common/config/configSlice';
import { AssignToUserIcon, DeleteIcon, EditCommentIcon, FilterIcon, PriorityIcon, ThreeDotsIcon } from '../../../assets/icons';
import SaveTaskModal from './SaveTaskModal';
import { selectUser } from '../../Auth/slices/authSlice';
import { IconWrapperPointer } from '../ui/TaskOverviewModalStyle';
import { archiveTaskAsync, assignTaskAsync, selectTask, toggleOverviewModal } from '../models/tasks/tasksSlice';
import TaskOverviewDropdown from '../../../components/dropdown/CustomDropdown';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { createDeleteRequest } from '../models/deleteRequests/DeleteRequestService';
import AssignTaskModal from './AssignTaskModal';
import { IUser } from '../../Auth/models/user/user';
import UserFilterModal from './UserFilterModal';
import TaskListUser from './TaskListUser';
import { ITask } from '../models/tasks/task';
import NewActions from './NewActions';
import { getTaskById } from '../models/tasks/TaskService';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const ASC = 'asc';
const DESC = 'desc';
const PENDING_STATUS_ID = 1;
const ACTIVE_STATUS_ID = 2;
const COMPLETED_STATUS_ID = 3;
const TITLE = 'title';
const CREATED_AT = 'createdAt';
const DUE_DATE = 'dueDate';
const PRIORITY_ID = 'priorityId';
const TableData = ({
  refreshTasks,
  toggleSortState,
  sort,
  allUsers,
  setAllUsers,
  toggleUser,
  selectedUsers,
  resetSelectedUsers,
  selectedListId,
  fetchTasksDelay,
  firstFetch,
  listId }) => {
  const { t } = useTranslation();
  const config = useAppSelector(selectConfigMap);
  const tasks = useAppSelector((state) => state.tasks);
  const statuses = useAppSelector(selectStatuses)
    .map((status) => { status.label = t(`config.${status.label}`); return status; });
  const priorities = useAppSelector(selectPriorities)
    .map((priority) => { priority.label = t(`config.${priority.label}`); return priority; });
  const currentUser = useAppSelector(selectUser);
  const dispatch = useAppDispatch();

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

  const renderStatus = (task) => {
    const { statusId } = task;
    let color = '';
    if (task.isBlocked) {
      return <StatusBar color="black">{t('home-page.blocked')}</StatusBar>;
    }
    if (task.dateArchived) {
      return <StatusBar color="#FF3A4F">{t('home-page.archived')}</StatusBar>;
    }
    if (statusId !== null && statusId !== undefined) {
      if (statusId === 2) {
        color = '#FF6A00';
      } else if (statusId === 1) {
        color = '#948CFC';
      } else {
        color = '#2ECC71';
      }
      return (
        <StatusBar color={color}>
          {statuses?.find((status) => status.value === statusId)?.label ||
            'Status'}
        </StatusBar>
      );
    }
    return null;
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

  const params = useParams() as any;
  const location = useLocation();
  const selectedTask = useAppSelector((state) => state.tasks.selectedTask);
  const setSelectedTask = (task: ITask) => {
    dispatch(selectTask(task));
  };
  const taskOverviewModalOpen = useAppSelector((state) => state.tasks.taskOverviewModalOpen);
  const setTaskOverviewModalOpen = (open: boolean) => {
    dispatch(toggleOverviewModal(open));
  };
  const [dropdownSelectedTask, setDropdownSelectedTask] = useState(tasks[0]);

  const closeModal = (refresh: boolean) => {
    if (taskOverviewModalOpen) {
      setTaskOverviewModalOpen(false);
      if (refresh) {
        refreshTasks(false);
      }
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

  const toggleNotification = (success: boolean, messageBody: string, isSuccessColor = true) => {
    if (success) {
      dispatch(openNotification({
        isOpen: true,
        messageBody,
        severity: isSuccessColor ? 'success' : 'error',
      }));
    }
  };

  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const toggleEditModal = () => setEditTaskModalOpen(!editTaskModalOpen);

  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const openAssignModal = (assignToTask = null) => {
    if (assignToTask) setDropdownSelectedTask(assignToTask);
    setAssignTaskModalOpen(true);
  };
  const closeAssignModal = () => {
    setAssignTaskModalOpen(!assignTaskModalOpen);
    setDropdownSelectedTask(null);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const dropdownOpen = Boolean(anchorEl);
  const handleDropdownClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setDropdownSelectedTask(task);
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    method: null,
    type: '',
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
    setDropdownSelectedTask(null);
  };

  const deleteTask = () => {
    closeConfirmDialog();
    dispatch(archiveTaskAsync(dropdownSelectedTask))
      .then((response) => {
        if (response.payload) {
          toggleNotification(true, t('home-page.task-deleted'));
          refreshTasks(false);
        }
      });
  };

  const requestDelete = () => {
    closeConfirmDialog();
    createDeleteRequest(dropdownSelectedTask.id)
      .then(() => {
        toggleNotification(true, t('home-page.request-for-deleting-task-sent'), false);
      });
  };

  const openConfirmDeleteDialog = () => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('home-page.delete-this-task'),
      actionText: t('home-page.delete-task'),
      IconComponent: DeleteIcon,
      method: deleteTask,
      type: 'red',
    });
  };

  const openAddCommentDialog = () => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('home-page.leave-a-comment'),
      actionText: null,
      IconComponent: EditCommentIcon,
      method: null,
      type: 'primary',
    });
  };

  const openRequestDeleteDialog = () => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('home-page.do-you-want-to-delete-this-task'),
      actionText: t('home-page.delete-task'),
      IconComponent: DeleteIcon,
      method: requestDelete,
      type: 'red',
    });
  };

  const assignTask = (user: IUser) => {
    dispatch(assignTaskAsync({ id: dropdownSelectedTask.id, userId: user.id }))
      .then((response) => {
        if (response.payload) {
          toggleNotification(true, t('home-page.task-assigned'));
          refreshTasks(false);
        }
        closeAssignModal();
      });
  };

  const editOption = { id: 2,
    label: t('home-page.edit'),
    action: () => {
      if (currentUser.isAdmin) {
        toggleEditModal();
      } else {
        openAddCommentDialog();
      }
    } };

  const deleteOption = { id: 3,
    label: t('home-page.delete'),
    action: () => {
      if (currentUser.isAdmin) {
        openConfirmDeleteDialog();
      } else {
        openRequestDeleteDialog();
      }
    },
  };
  const assignTaskOption = { id: 1,
    label: t('home-page.assign'),
    action: () => {
      openAssignModal();
    } };

  const [filterByUserNameModalOpen, setUserFilterModalOpen] = useState(false);
  const closeUserFilterModal = () => {
    if (filterByUserNameModalOpen) { setUserFilterModalOpen(false); }
  };
  const openUserFilterModal = () => {
    if (!filterByUserNameModalOpen) { setUserFilterModalOpen(true); }
  };

  const getDropdownOptions = (task: ITask) => {
    const dropdownOptions = [];
    if (task.isBlocked || task.statusId === COMPLETED_STATUS_ID) {
      dropdownOptions.push(deleteOption);
    } else if (task.statusId === PENDING_STATUS_ID) {
      if (currentUser.isAdmin) { dropdownOptions.push(assignTaskOption); }
      dropdownOptions.push(editOption);
      dropdownOptions.push(deleteOption);
    } else if (task.statusId === ACTIVE_STATUS_ID) {
      dropdownOptions.push(editOption);
      dropdownOptions.push(deleteOption);
    }
    return dropdownOptions;
  };

  const getFilterIconColor = () => (selectedUsers &&
    selectedUsers.length > 0 ?
    '#948CFC' :
    '#9BA8DB');

  const getColSpan = () => {
    if (currentUser.isAdmin) return 9;
    if (selectedListId === PENDING_STATUS_ID) return 7;
    return 8;
  };

  const renderNewActions = (task: ITask) => {
    const ticketVisits = task?.ticketVisits;
    const comments = task?.ticketComments;
    if (ticketVisits != null && comments != null) {
      let newComments = 0;
      if (ticketVisits.length > 0) {
        const lastVisited = ticketVisits[0].dateVisited;
        comments.forEach((comment) => {
          if (new Date(comment.createdAt).getTime() > new Date(lastVisited).getTime()) {
            newComments += 1;
          }
        });
      } else {
        newComments = comments.length;
      }
      return (
        <NewActions
          value={newComments}
        />
      );
    }
    return null;
  };

  useEffect(() => {
    let taskId = null;
    if (params.id != null) {
      taskId = params.id;
    } else if (location.state) {
      taskId = (location.state as any).id;
    }
    if (taskId) {
      getTaskById(taskId)
        .then((task) => {
          setSelectedTask({
            ...task,
          });
          setTaskOverviewModalOpen(true);
        });
    }
  }, []);

  const getTooltipText = (sortBy: string): string => {
    if (sortBy === sort.sortBy) {
      const currentSortValue = sort.sortDirection;
      if (currentSortValue === ASC) return t('home-page.ascending');
      if (currentSortValue === DESC) return t('home-page.descending');
      return t('home-page.not-selected');
    } return t('home-page.not-selected');
  };

  const handleTaskEdit = (success: boolean) => {
    if (success) toggleNotification(true, t('home-page.changes-saved'));
    else toggleNotification(false, t('home-page.failed-to-edit-task'));
  };

  return (
  // eslint-disable-next-line no-nested-ternary
    <TableContainer sx={{
      border: 'none',
      overflow: 'auto',
      whiteSpace: 'nowrap',
      width: '100%',
    }}
    >
      <Table
        sx={{
          minWidth: 650,
          border: 'none',
        }}
        aria-label="dense table"
      >
        <TableHead>
          <TableRow>
            <TableCell
              sx={{ fontWeight: 'bold', maxWidth: '300px !important', minWidth: '300px !important' }}
              align="left"
            >
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(TITLE)}
                >
                  {t('home-page.task-name')}
                </SortableCellText>
                {renderArrow(TITLE)}
              </SortableCell>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }} align="left">
              {t('home-page.status')}
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }}
              align="left"
            >
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(CREATED_AT)}
                >
                  {t('home-page.date-created')}
                </SortableCellText>

                {renderArrow(CREATED_AT)}
              </SortableCell>
            </TableCell>
            {
              currentUser.isAdmin && (
              <TableCell sx={{ fontWeight: 'bold', maxWidth: '300px !important', minWidth: '300px !important' }} align="left">
                {t('home-page.created-by')}
              </TableCell>
              )
            }
            <TableCell
              sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }}
              align="left"
            >
              <SortableCell>
                {' '}
                <SortableCellText
                  title={getTooltipText(DUE_DATE)}
                >
                  {listId === 3 ? 'Completed' : listId === 4 ? 'Blocked' : t('home-page.due-date')}
                </SortableCellText>

                {renderArrow(DUE_DATE)}
              </SortableCell>
            </TableCell>
            <TableCell
              sx={{ fontWeight: 'bold', maxWidth: '125px !important', minWidth: '125px !important' }}
              align="left"
            >
              <SortableCell>
                <SortableCellText
                  title={getTooltipText(PRIORITY_ID)}
                >
                  {t('home-page.priority')}
                </SortableCellText>
                {renderArrow(PRIORITY_ID)}
              </SortableCell>
            </TableCell>
            {
              selectedListId === PENDING_STATUS_ID ?
                (
                  currentUser.isAdmin && (
                  <TableCell sx={{ fontWeight: 'bold', maxWidth: '200px !important', minWidth: '200px !important' }} align="left">
                    {t('home-page.assign-to')}
                  </TableCell>
                  )
                ) :
                (
                  <TableCell sx={{ fontWeight: 'bold', maxWidth: '200px !important', minWidth: '200px !important' }} align="left">
                    {t('home-page.assigned-to')}
                  </TableCell>
                )
            }
            <TableCell
              align="left"
              sx={{
                maxWidth: '65px !important', minWidth: '65px !important',
              }}
            />
            <TableCell
              sx={{
                fontWeight: 'bold',
                maxWidth: '125px !important',
                minWidth: '125px !important',
                position: 'relative' }}
              align="right"
            >
              {currentUser.isAdmin && (
              <IconWrapperPointer
                onClick={openUserFilterModal}
              >
                <FilterIcon color={getFilterIconColor()} />

                {currentUser.isAdmin && filterByUserNameModalOpen && (
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
              )}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody sx={{ position: 'relative', overflow: 'scroll' }}>
          {firstFetch ?
            (
              <TableRow>
                <TableCell colSpan={getColSpan()} sx={{ borderBottom: 'none' }}>
                  <TableSpinnerWrapper>
                    <TableSpinner color="primary" />
                  </TableSpinnerWrapper>
                </TableCell>
              </TableRow>
            )
            :
            (
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
                tasks.tickets && tasks.tickets.length > 0 ? (
                  tasks.tickets.map((task) => (
                    <TableRow
                      key={task.id}
                      sx={{
                        '&:last-child td, &:last-child th': { border: 0 },
                        '&:hover': {
                          opacity: 0.8,
                          cursor: 'pointer',
                        },
                        height: '60px',
                      }}
                      onClick={() => {
                        openTaskOverview(task);
                      }}
                    >
                      <TableCell
                        sx={{
                          minWidth: '300px !important',
                          maxWidth: '300px !important',
                          overflowX: 'hidden',
                          overflowY: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                        component="th"
                        scope="row"
                      >
                        {task.title}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          minWidth: '125px !important',
                          maxWidth: '125px !important',
                        }}
                      >
                        {renderStatus(task)}

                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          minWidth: '125px !important',
                          maxWidth: '125px !important',
                        }}
                      >
                        {moment(task.createdAt)?.format('DD/MM/YYYY')}
                      </TableCell>
                      {currentUser.isAdmin && (
                        <TableCell
                          align="left"
                          sx={{
                            minWidth: '300px !important',
                            overflowX: 'hidden',
                            overflowY: 'hidden',
                            maxWidth: '300px !important',
                            textOverflow: 'ellipsis',
                          }}
                        >
                          <TaskListUser type="createdBy" user={task.createdBy} />
                        </TableCell>
                      )}
                      <TableCell
                        align="left"
                        sx={{
                          minWidth: '125px !important',
                          maxWidth: '125px !important',
                        }}
                      >
                        {moment(task.dueDate)?.format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell
                        align="left"
                        sx={{
                          minWidth: '125px !important',
                          maxWidth: '125px !important',
                        }}
                      >
                        {renderPriority(task.priorityId)}
                      </TableCell>
                      {
                        selectedListId === PENDING_STATUS_ID ?
                          (
                            currentUser.isAdmin && (
                            <TableCell
                              sx={{ fontWeight: 'bold',
                                minWidth: '200px !important',
                                maxWidth: '200px !important',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis' }}
                              align="left"
                            >
                              <IconWrapperPointer
                                sx={{ justifyContent: 'flex-start' }}
                                onClick={(e) => { e.stopPropagation(); openAssignModal(task); }}
                              >
                                <AssignToUserIcon />
                              </IconWrapperPointer>
                            </TableCell>
                            )
                          ) :
                          (
                            <TableCell
                              align="left"
                              sx={{
                                minWidth: '200px !important',
                                maxWidth: '200px !important',
                                overflowX: 'hidden',
                                overflowY: 'hidden',
                                textOverflow: 'ellipsis',
                              }}
                            >
                              <TaskListUser type="assignedTo" user={task.assignedTo} />
                            </TableCell>
                          )
                      }
                      <TableCell
                        align="left"
                        sx={{
                          width: '65px !important',
                          maxWidth: '65px !important',
                        }}
                      >
                        {renderNewActions(task)}
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          minWidth: '125px !important',
                          maxWidth: '125px !important',
                        }}
                      >
                        {!task.isBlocked && (
                          <>
                            <IconWrapperPointer onClick={(e) => {
                              handleDropdownClick(e, task);
                              e.stopPropagation();
                            }}
                            >
                              <ThreeDotsIcon />
                            </IconWrapperPointer>
                            <TaskOverviewDropdown
                              open={dropdownOpen && dropdownSelectedTask?.id === task.id}
                              anchorEl={anchorEl}
                              setAnchorEl={setAnchorEl}
                              options={getDropdownOptions(task)}
                            />
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) :
                  (
                    <TableRow>
                      <TableCell colSpan={getColSpan()} sx={{ borderBottom: 'none' }}>
                        <NoTask>{t('home-page.no-tasks')}</NoTask>
                      </TableCell>
                    </TableRow>
                  )
              }
              </>
            )}
        </TableBody>
      </Table>
      {selectedTask != null && (
        <TaskOverviewModal
          config={config}
          handleClose={(refresh: boolean) => { closeModal(refresh); }}
          task={selectedTask}
          handleResult={(success: boolean, messageBody: string) => {
            toggleNotification(success, messageBody);
          }}
        />
      )}
      {currentUser.isAdmin && dropdownSelectedTask != null && editTaskModalOpen && (
      <SaveTaskModal
        config={config}
        open={editTaskModalOpen}
        handleClose={() => { toggleEditModal(); }}
        type="edit"
        handleResult={(success: boolean) => {
          handleTaskEdit(success);
        }}
        taskId={dropdownSelectedTask.id}
        initialValues={{
          description: dropdownSelectedTask.description,
          objectId: dropdownSelectedTask.objectId,
          priorityId: dropdownSelectedTask.priorityId,
          productId: dropdownSelectedTask.productId,
          subject: dropdownSelectedTask.subject,
          title: dropdownSelectedTask.title,
          taskTypeId: dropdownSelectedTask.taskTypeId,
          dueDate: new Date(dropdownSelectedTask.dueDate),
        }}
        initialAttachments={[]}
        toggleModal={null}
        fetchTask
      />
      )}
      {confirmDialog.open && (
        <ConfirmationDialog
          isOpen={confirmDialog.open}
          handleAcceptConfirmation={confirmDialog.method}
          handleCloseConfirmation={closeConfirmDialog}
          confirmationTitle={confirmDialog.dialogMessage}
          icon={<confirmDialog.IconComponent />}
          approveText={confirmDialog.actionText}
          declineText="Cancel"
          type={confirmDialog.type}
        />
      )}
      {currentUser.isAdmin &&
        assignTaskModalOpen &&
        dropdownSelectedTask != null && (
          <AssignTaskModal
            open={assignTaskModalOpen && dropdownSelectedTask != null}
            handleClose={() => { closeAssignModal(); }}
            handleAssignTask={assignTask}
            currentUser={currentUser}
          />
      )}
    </TableContainer>
  );
};

export default TableData;
