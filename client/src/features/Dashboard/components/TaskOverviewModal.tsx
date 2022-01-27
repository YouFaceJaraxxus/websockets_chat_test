import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useForm, Controller } from 'react-hook-form';
import { Avatar, Slide, Modal, TextField, FormHelperText } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { CustomTaskOverviewWrapper,
  TitleWrapper,
  IconWrapper,
  TitleText,
  TitleIconTextWrapper,
  TitleActionsWrapper,
  IconWrapperPointer,
  Row,
  RowHeader,
  RowBody,
  DescriptionRow,
  DescriptionHeader,
  Bolder,
  Regular,
  DatesBody,
  StatusPriorityBody,
  PriorityIconText,
  AttachmentsList,
  AttachmentsListItem,
  BackgroundIcons,
  AddCommentWrapper,
  SubmitButton,
  SubmitButtonWrapper,
  CompleteTaskButton,
  useStyles,
  Spinner,
  SpinnerWrapper,
  RegularPrimary,
  StatusBar,
  PriorityText,
  CustomTaskOverviewDrawer,
  TitleIconWrapper,
} from '../ui/TaskOverviewModalStyle';
import { TaskOverviewTitleIcon,
  BackIcon,
  ThreeDotsIcon,
  PriorityIcon,
  AssignToUserIcon,
  AttachmentIcon,
  ChecksIcon,
  DoubleChecksIcon,
  DeleteIcon,
  EditCommentIcon,
} from '../../../assets/icons';
import account from '../../../assets/icons/account.svg';
import { IAddComment } from '../models/addComment.model';
import TaskOverviewDropdown from '../../../components/dropdown/CustomDropdown';
import TaskOverviewComment from './TaskOverviewComment';
import AssignTaskModal from './AssignTaskModal';
import { ITask } from '../models/tasks/task';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../Auth/slices/authSlice';
import SaveTaskModal from './SaveTaskModal';
import { archiveTaskAsync, assignTaskAsync, completeTaskAsync, respondToDeleteRequestAsync, updateLastVisit } from '../models/tasks/tasksSlice';
import { IConfig } from '../../../common/config/config';
import { createComment } from '../models/comments/CommentService';
import { ICreateComment } from '../models/createComment.model';
import { createDeleteRequest } from '../models/deleteRequests/DeleteRequestService';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { IUser } from '../../Auth/models/user/user';
import { getAssetPresignedUrl } from '../models/assets/AssetsService';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import { getTaskById } from '../models/tasks/TaskService';
import { IDeleteRequest } from '../models/deleteRequests/deleteRequest';
import { IAttachment } from '../models/attachments/attachment';
import { IComment } from '../models/comments/comment';

const ACTIVE_STATUS_ID = 2;
const COMPLETED_TASK_STATUS_ID = 3;
const WHITE_SPACE_REGEX = /^\s+$/;
const TaskOverviewModal = ({ config, handleClose, task, handleResult } :
{
  config: IConfig,
  handleClose: (refresh: boolean) => any,
  task: ITask,
  handleResult: (success: boolean, messageBody: string) => any }) => {
  const { t } = useTranslation();
  const commentTextRequired = t('home-page.comment-text-required');
  const { products, taskTypes, objects, statuses, priorities } = config;

  const classes = useStyles();
  const getElement = (array: any[], id, fieldName?) => {
    if (array) {
      const result = array.find((element) => element.id === id);
      if (result) {
        return fieldName ? t(`config.${result[fieldName]}`) : result;
      }
      return null;
    } return null;
  };

  const dispatch = useAppDispatch();
  const [currentTask, setCurrentTask] = useState(task);
  const [sliderOpen, setSliderOpen] = useState(true);
  const currentUser = useAppSelector(selectUser);
  const initialStatusId = task && task.statusId;
  const taskProcesses = useAppSelector((state) => state.tasks.taskProcesses);

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    clearErrors,
  } = useForm<IAddComment>();

  const [editTaskModalOpen, setEditTaskModalOpen] = useState(false);
  const toggleModal = () => { setSliderOpen(!sliderOpen); };
  const toggleEditModal = () => setEditTaskModalOpen(!editTaskModalOpen);

  const getUserName = (user) => (user ? `${user.firstname} ${user.lastname}` : t('home-page.account-deleted'));

  const getCreatedBy = () => (currentTask.createdById === currentUser.id ?
    t('global.you') : getUserName(currentTask.createdBy));

  const getAssignedTo = () => (currentTask.assignedToId === currentUser.id ?
    t('global.you') : getUserName(currentTask.assignedTo));

  const toggleNotification = (
    success: boolean,
    messageBody: string,
    result: ITask = null,
    isSuccessColor = true,
  ) => {
    if (success) {
      dispatch(openNotification({
        isOpen: true,
        messageBody,
        severity: isSuccessColor ? 'success' : 'error',
      }));
      if (result) {
        setCurrentTask(result);
      }
    }
  };

  const onClose = () => {
    setSliderOpen(false);
    handleClose(initialStatusId !== currentTask.statusId);
  };

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const dropdownOpen = Boolean(anchorEl);
  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const [actions, setActions] = useState({
    creatingAction: false,
    fetchingTaskData: false,
    respondingToDeleteRequest: false,
    comments: [] as IComment[],
    deleteRequests: [] as IDeleteRequest[],
    attachments: [] as IAttachment[],
  });

  const toggleCreatingAction = (creatingAction: boolean) => {
    setActions({ ...actions, creatingAction });
  };

  const toggleRespondingToDeleteRequest = (respondingToDeleteRequest: boolean) => {
    setActions({
      ...actions,
      respondingToDeleteRequest,
      creatingAction: respondingToDeleteRequest,
    });
  };

  const fetchTaskData = () => {
    setActions({ ...actions, fetchingTaskData: true, comments: null, deleteRequests: null });

    getTaskById(currentTask.id).then((taskResponse) => {
      setActions({
        ...actions,
        comments: taskResponse.ticketComments,
        deleteRequests: taskResponse.ticketDeleteRequests,
        attachments: taskResponse.ticketAttachments,
        fetchingTaskData: false,
      });
    }).catch(() => {
      setActions({ ...actions, fetchingTaskData: false, comments: null, deleteRequests: null });
    });
  };

  const [createdByUserIcons, setCreatedByIcons] = useState({
    createdByIcon: null as string,
    fetchingCreatedBy: false,
  });

  const [assignedToUserIcons, setAssignedToIcons] = useState({
    assignedToIcon: null as string,
    fetchingAssignedTo: false,
  });

  const getUserIcons = () => {
    setCreatedByIcons({
      ...createdByUserIcons,
      fetchingCreatedBy: true,
    });
    setAssignedToIcons({
      ...assignedToUserIcons,
      fetchingAssignedTo: true,
    });
    if (currentTask.createdBy?.profileImageId) {
      getAssetPresignedUrl(currentTask.createdBy.profileImageId)
        .then((presigned) => {
          setCreatedByIcons({
            createdByIcon: presigned.preSignedUrl,
            fetchingCreatedBy: false,
          });
        });
    }
    if (currentTask.assignedTo && currentTask.assignedTo.profileImageId) {
      getAssetPresignedUrl(currentTask.assignedTo.profileImageId)
        .then((presigned) => {
          setAssignedToIcons({
            assignedToIcon: presigned.preSignedUrl,
            fetchingAssignedTo: false,
          });
        });
    }
  };

  const getUserIcon = (type: string) => {
    let userIcon = null;
    let fetchingIcon = false;
    if (type === 'createdBy') {
      userIcon = createdByUserIcons.createdByIcon;
      fetchingIcon = createdByUserIcons.fetchingCreatedBy;
    } else {
      userIcon = assignedToUserIcons.assignedToIcon;
      fetchingIcon = assignedToUserIcons.fetchingAssignedTo;
    }
    // eslint-disable-next-line no-nested-ternary
    return userIcon ?
      fetchingIcon ?
        (
          <SpinnerWrapper>
            <Spinner color="primary" />
          </SpinnerWrapper>
        )

        :
        (
          <Avatar
            alt="Account Icon"
            src={userIcon}
            sx={{
              width: 40,
              height: 40,
              margin: '0px auto',
              '@media (max-width:400px)': {
                marginLeft: '2%',
              },
            }}
          />
        )
      :
      (
        <BackgroundIcons backgroundColor="#948cfc36">
          <Avatar
            alt="Account Icon"
            src={account}
            sx={{ width: 30, height: 30, margin: '0px auto' }}
          />
        </BackgroundIcons>
      );
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    method: null,
    type: '',
    hasSpinner: false,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, open: false });
  };

  const deleteTask = () => {
    dispatch(archiveTaskAsync(currentTask))
      .then((response) => {
        if (response.payload) {
          handleResult(true, t('home-page.task-deleted'));
          setTimeout(onClose, 2000);
        }
        closeConfirmDialog();
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
      hasSpinner: true,
    });
  };

  const requestDelete = () => {
    toggleCreatingAction(true);
    createDeleteRequest(currentTask.id)
      .then(() => {
        toggleCreatingAction(false);
        toggleNotification(true, t('home-page.request-for-deleting-task-sent'), null, false);
        fetchTaskData();
        closeConfirmDialog();
      }).catch(() => {
        toggleCreatingAction(false);
        closeConfirmDialog();
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
      hasSpinner: true,
    });
  };

  const completeTask = () => {
    closeConfirmDialog();
    dispatch(completeTaskAsync({ id: currentTask.id, statusId: COMPLETED_TASK_STATUS_ID }))
      .then((response) => {
        if (response.payload) {
          const responseTask = response.payload as ITask;
          toggleNotification(true, t('home-page.task-completed'), response.payload as ITask);
          setCurrentTask(responseTask);
        }
      });
  };

  const openConfirmCompleteDialog = () => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('home-page.do-you-want-to-complete-this-task'),
      actionText: t('home-page.complete'),
      IconComponent: DoubleChecksIcon,
      method: completeTask,
      type: 'green',
      hasSpinner: true,
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
      hasSpinner: false,
    });
  };

  const respondToDeleteRequest = (deleteRequestId, accept) => {
    toggleRespondingToDeleteRequest(true);
    dispatch(respondToDeleteRequestAsync({
      id: deleteRequestId,
      accept,
    }))
      .then((response) => {
        toggleRespondingToDeleteRequest(false);
        if (accept) {
          if (response.payload) {
            handleResult(true, t('home-page.task-deleted'));
            setCurrentTask({
              ...currentTask,
              dateArchived: new Date(),
            });
            setTimeout(onClose, 2000);
          } else {
            handleResult(false, t('home-page.failed-to-delete-task'));
          }
          closeConfirmDialog();
        }
        fetchTaskData();
      }).catch(() => {
        toggleRespondingToDeleteRequest(false);
        if (accept) {
          handleResult(false, t('home-page.failed-to-delete-task'));
        } else {
          handleResult(false, t('home-page.failed-to-reject-deletion'));
        }
        closeConfirmDialog();
      });
  };

  const openConfirmDeleteDialogFromComment = (deleteRequestId) => {
    setConfirmDialog({
      open: true,
      dialogMessage: t('home-page.delete-this-task'),
      actionText: t('home-page.delete-task'),
      IconComponent: DeleteIcon,
      method: () => { respondToDeleteRequest(deleteRequestId, true); },
      type: 'red',
      hasSpinner: true,
    });
  };

  const rejectDeleteComment = (deleteRequestId) => {
    respondToDeleteRequest(deleteRequestId, false);
  };

  const canComment = () => currentTask.dateArchived == null;
  const canEdit = () => currentTask.dateArchived == null &&
  currentTask.statusId !== COMPLETED_TASK_STATUS_ID;

  const dropdownOptions = currentTask.dateArchived == null ? [
    { id: 2,
      label: t('home-page.delete'),
      action: () => {
        if (currentUser.isAdmin) {
          openConfirmDeleteDialog();
        } else {
          openRequestDeleteDialog();
        }
      },
    },
  ] : [];

  if (canEdit()) {
    dropdownOptions.unshift({ id: 1,
      label: t('home-page.edit'),
      action: () => {
        if (currentUser.isAdmin) {
          toggleModal();
          toggleEditModal();
        } else {
          openAddCommentDialog();
        }
      } });
  }

  const [assignTaskModalOpen, setAssignTaskModalOpen] = useState(false);
  const toggleAssignTaskModal = () => {
    setAssignTaskModalOpen(!assignTaskModalOpen);
  };

  const assignTask = (user: IUser) => {
    dispatch(assignTaskAsync({ id: currentTask.id, userId: user.id }))
      .then((response) => {
        if (response.payload) {
          setCurrentTask({
            ...currentTask,
            assignedTo: user,
            assignedToId: user.id,
            statusId: ACTIVE_STATUS_ID,
          });
          toggleNotification(true, t('home-page.task-assigned'), response.payload as ITask);
        }
        toggleAssignTaskModal();
      });
  };

  const saveFile = (url: string) => {
    const a = document.createElement('A') as HTMLAnchorElement;
    a.href = url;
    a.download = url.substr(url.lastIndexOf('/') + 1);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const downloadFile = (assetId: number) => {
    getAssetPresignedUrl(assetId)
      .then((response) => {
        if (response) {
          saveFile(response.preSignedUrl);
        }
      }).catch(() => {
        toggleNotification(
          false,
          t('home-page.error-downloading-file'),
        );
      });
  };

  const canDisplayDeleteRequests = () => currentTask.dateArchived == null &&
  actions.deleteRequests &&
  actions.deleteRequests.length > 0 &&
  !actions.respondingToDeleteRequest;

  useEffect(() => {
    fetchTaskData();
    getUserIcons();
    dispatch(updateLastVisit(currentTask.id));
  }, []);

  const toggleLabelText = (text, labelText) => {
    if (text && text.length > 0) return labelText;
    return null;
  };
  const addCommentPlaceholder = t('task-overview.add-comment-placeholder');
  const addCommentLabel = t('task-overview.add-comment-label');

  const renderAssignTo = () => (
    // eslint-disable-next-line no-nested-ternary
    taskProcesses.assigningTask ? (
      <SpinnerWrapper>
        <Spinner color="primary" />
      </SpinnerWrapper>
    )
      :
      currentUser.isAdmin ? (
        <BackgroundIcons backgroundColor="white">
          <IconWrapperPointer
            onClick={() => { setAssignTaskModalOpen(true); }}
            sx={{
              width: 40,
              height: 40 }}
          >
            <AssignToUserIcon />
          </IconWrapperPointer>
        </BackgroundIcons>
      )
        :
        <Regular>{t('home-page.unassigned')}</Regular>
  );

  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(true);

  const onCommentTextChange = (e) => {
    const commentText = e.target.value;
    if (commentText && commentText.length > 0) {
      if (commentText.match(WHITE_SPACE_REGEX)) {
        setSubmitButtonDisabled(true);
        setError('text', { message: t('home-page.comment-cant-be-empty') });
      } else {
        setSubmitButtonDisabled(false);
        clearErrors('text');
      }
    } else {
      setSubmitButtonDisabled(true);
      clearErrors('text');
    }
  };

  const parseAssigned = () => (
    <RowBody>
      {currentTask.assignedTo ? (
        <>
          {
              getUserIcon('assignedTo')
            }
          <Regular sx={{ marginLeft: '1em', wordBreak: 'break-word' }}>
            {getAssignedTo()}
          </Regular>
        </>
      ) : renderAssignTo()}
    </RowBody>
  );

  const renderStatus = (statusId) => {
    let color = '';
    if (currentTask.isBlocked) {
      color = 'black';
      return (
        <StatusBar color={color}>{t('home-page.blocked')}</StatusBar>
      );
    }
    if (currentTask.dateArchived) {
      color = '#FF3A4F';
      return (
        <StatusBar color={color}>{t('home-page.archived')}</StatusBar>
      );
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
          {
            getElement(statuses, statusId, 'status')
          }
        </StatusBar>
      );
    }
    return null;
  };

  const renderDateText = () => {
    if (currentTask.isBlocked) {
      return 'Blocked';
    }
    if (currentTask.dateArchived) {
      return 'Archived';
    }
    return getElement(statuses, currentTask.statusId, 'dateText');
  };

  const renderDate = () => {
    if (currentTask.dateArchived) return moment(currentTask.dateArchived)?.format('DD/MM/YYYY');
    if (currentTask.dateCompleted) return moment(currentTask.dateCompleted)?.format('DD/MM/YYYY');
    return moment(currentTask.dueDate)?.format('DD/MM/YYYY');
  };

  const renderPriority = (priorityId) => {
    const priority = getElement(priorities, priorityId);
    if (priority) {
      return (
        <PriorityIconText>
          <IconWrapper sx={{ paddingBottom: '1.5%' }}>
            <PriorityIcon color={priority.colorCode} />
          </IconWrapper>
          <PriorityText>
            {t(`config.${priority.priority}`)}
          </PriorityText>
        </PriorityIconText>
      );
    }
    return null;
  };

  const isCompleteable = () => currentUser.isAdmin &&
  currentTask.statusId !== COMPLETED_TASK_STATUS_ID &&
  currentTask.dateArchived == null &&
  !currentTask.isBlocked;

  const addComment = () => {
    const text = getValues('text');
    const commentData = {
      text,
      type: 'comment',
    } as ICreateComment;
    toggleCreatingAction(true);
    setValue('text', '');
    setSubmitButtonDisabled(true);
    createComment(currentTask.id, commentData).then((response) => {
      toggleNotification(true, t('home-page.comment-created'), null);
      setActions({
        ...actions,
        creatingAction: false,
        comments: [response, ...actions.comments],
      });
      setSubmitButtonDisabled(true);
    }).catch((error) => {
      toggleCreatingAction(false);
      const errorBody = error.response.data;
      toggleNotification(false, errorBody.message, null);
      setSubmitButtonDisabled(true);
    });
  };

  const getAddCommentTooltipText = () => (submitButtonDisabled ? t('home-page.cannot-add-empty-comment') : null);

  return (
    <>
      {
        currentTask != null && currentUser != null ? (
          <Modal
            open
            onClose={onClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Slide in={sliderOpen} direction="left" mountOnEnter unmountOnExit>
              <CustomTaskOverviewDrawer>
                <CustomTaskOverviewWrapper>
                  <TitleWrapper>
                    <TitleIconTextWrapper>
                      <TitleIconWrapper>
                        <TaskOverviewTitleIcon />
                      </TitleIconWrapper>
                      <TitleText>
                        {currentTask.title}
                      </TitleText>
                    </TitleIconTextWrapper>
                    <TitleActionsWrapper>
                      {
                      currentTask.dateArchived == null && (
                        <>
                          <IconWrapperPointer sx={{ position: 'relative', right: '35%' }} onClick={handleDropdownClick}>
                            <ThreeDotsIcon />
                          </IconWrapperPointer>
                          <TaskOverviewDropdown
                            open={dropdownOpen}
                            anchorEl={anchorEl}
                            setAnchorEl={setAnchorEl}
                            options={dropdownOptions}
                          />
                        </>
                      )
                    }
                      <IconWrapperPointer onClick={onClose}>
                        <BackIcon />
                      </IconWrapperPointer>
                    </TitleActionsWrapper>
                  </TitleWrapper>

                  <Row>
                    <RowHeader>
                      {t('home-page.product')}
                    </RowHeader>
                    <RowBody>
                      {
                  getElement(products, currentTask.productId, 'product')
                }
                    </RowBody>
                    {
                    currentUser.isAdmin && taskProcesses.completingTask ? (
                      <SpinnerWrapper>
                        <Spinner color="primary" />
                      </SpinnerWrapper>
                    )
                      :
                      isCompleteable() && (
                      <CompleteTaskButton onClick={openConfirmCompleteDialog}>
                        <IconWrapper>
                          <ChecksIcon color="#2ECC71" />
                        </IconWrapper>
                        {t('home-page.complete-uppercase')}
                      </CompleteTaskButton>
                      )
                  }
                  </Row>

                  <Row>
                    <RowHeader>
                      {t('home-page.created')}
                    </RowHeader>
                    <DatesBody>
                      <Regular>
                        {moment(currentTask.createdAt)?.format('DD/MM/YYYY')}
                      </Regular>
                      <Bolder>
                        {
                    renderDateText()
                  }
                      </Bolder>
                      <Regular>
                        {renderDate()}
                      </Regular>
                    </DatesBody>
                  </Row>

                  <Row alignItems="flex-start">
                    <RowHeader>
                      {t('home-page.task-type')}
                    </RowHeader>
                    <RowBody sx={{ paddingRight: '10%' }}>
                      {
                  getElement(taskTypes, currentTask.taskTypeId, 'taskType')
                }
                    </RowBody>
                  </Row>

                  <Row>
                    <RowHeader>
                      {t('home-page.status')}
                    </RowHeader>
                    <StatusPriorityBody>
                      {renderStatus(currentTask.statusId)}
                      <Bolder>
                        {t('home-page.priority')}
                      </Bolder>
                      {renderPriority(currentTask.priorityId)}
                    </StatusPriorityBody>
                  </Row>

                  <Row>
                    <RowHeader>
                      {t('home-page.object')}
                    </RowHeader>
                    <RowBody>
                      {
                  getElement(objects, currentTask.objectId, 'object')
                }
                    </RowBody>
                  </Row>

                  {
                  currentUser.isAdmin &&
                  (
                    <Row sx={{ minHeight: '50px' }}>
                      <RowHeader>
                        {t('home-page.user')}
                      </RowHeader>
                      <RowBody>
                        {
                          getUserIcon('createdBy')
                        }
                        <Regular sx={{ marginLeft: '1em' }}>
                          {getCreatedBy()}
                        </Regular>
                      </RowBody>
                    </Row>
                  )
                }
                  <Row sx={{ minHeight: '50px' }}>
                    <RowHeader>
                      {t('home-page.assigned-to')}
                    </RowHeader>
                    {parseAssigned()}
                    {currentUser.isAdmin && (
                    <AssignTaskModal
                      open={assignTaskModalOpen}
                      handleClose={() => { toggleAssignTaskModal(); }}
                      handleAssignTask={assignTask}
                      currentUser={currentUser}
                    />
                    )}
                  </Row>

                  <Row>
                    <RowHeader>
                      {t('home-page.subject')}
                    </RowHeader>
                    <RowBody sx={{ wordBreak: 'break-word' }}>
                      {currentTask.subject}
                    </RowBody>
                  </Row>

                  <DescriptionRow>
                    <DescriptionHeader>
                      {t('home-page.description')}
                    </DescriptionHeader>
                    <Regular sx={{ wordBreak: 'break-word' }}>
                      {currentTask.description}
                    </Regular>
                  </DescriptionRow>

                  <Row alignItems="flex-start">
                    <RowHeader>
                      {t('home-page.attached')}
                    </RowHeader>
                    <AttachmentsList>
                      {
                      (actions.attachments &&
                      actions.attachments.length > 0) ?
                        actions.attachments?.map((attachment) => (
                          <AttachmentsListItem
                            key={attachment.asset.id}
                            onClick={() => { downloadFile(attachment.asset.id); }}
                          >
                            <IconWrapper sx={{ marginRight: '7%', marginTop: '1%' }}>
                              <AttachmentIcon />
                            </IconWrapper>
                            {attachment.asset.name}
                          </AttachmentsListItem>
                        ))
                        :
                        (
                          <RegularPrimary>
                            {t('home-page.no-attachments')}
                          </RegularPrimary>
                        )
                    }
                    </AttachmentsList>

                  </Row>

                  <Row>
                    <Bolder>
                      {t('home-page.comments-and-actions')}
                    </Bolder>
                  </Row>

                  {actions.fetchingTaskData ?

                    (
                      <SpinnerWrapper>
                        <Spinner color="primary" />
                      </SpinnerWrapper>
                    ) :

                    (
                      <>
                        {
                        actions.creatingAction && (
                        <SpinnerWrapper>
                          <Spinner color="primary" />
                        </SpinnerWrapper>
                        )
                      }
                        <>
                          {canDisplayDeleteRequests() &&
                          actions.deleteRequests
                            .filter((dr) => dr.approved == null)
                            .map((deleteRequest) => (
                              <TaskOverviewComment
                                key={deleteRequest.id}
                                comment={{ ...deleteRequest, type: 'delete_request' }}
                                user={currentUser}
                                confirmDeleteComment={openConfirmDeleteDialogFromComment}
                                rejectDeleteComment={rejectDeleteComment}
                              />
                            ))}
                        </>
                        <>
                          {actions.comments &&
                      actions.comments.length > 0 &&
                      actions.comments.map((comment) => (
                        <TaskOverviewComment
                          key={comment.id}
                          comment={comment}
                          user={currentUser}
                          confirmDeleteComment={null}
                          rejectDeleteComment={null}
                        />
                      ))}
                        </>
                      </>

                    )}

                  {canComment() &&
                  (
                    <form onSubmit={handleSubmit(() => addComment())}>
                      <AddCommentWrapper>
                        <Controller
                          name="text"
                          control={control}
                          defaultValue=""
                          render={({
                            field: { onChange, value },
                            fieldState: { error },
                          }) => (
                            <>
                              <TextField
                                multiline
                                value={value}
                                error={!!error}
                                onChange={(e) => {
                                  onCommentTextChange(e);
                                  onChange(e);
                                }}
                                type="text"
                                fullWidth
                                id="outlined-basic"
                                label={toggleLabelText(value, addCommentLabel)}
                                placeholder={addCommentPlaceholder}
                                inputProps={{ maxLength: 300 }}
                              />
                              {error && (
                              <FormHelperText className={classes.errorText}>
                                {error.message}
                              </FormHelperText>
                              )}
                            </>
                          )}
                          rules={{
                            required: commentTextRequired,
                            maxLength: {
                              value: 300,
                              message: t('home-page.comment-max-characters'),
                            },
                          }}
                        />
                      </AddCommentWrapper>
                      <SubmitButtonWrapper
                        title={getAddCommentTooltipText()}
                      >
                        <SubmitButton
                          disabled={submitButtonDisabled}
                          type="submit"
                        >
                          {t('home-page.add-comment')}
                        </SubmitButton>
                      </SubmitButtonWrapper>
                    </form>
                  )}
                </CustomTaskOverviewWrapper>
              </CustomTaskOverviewDrawer>
            </Slide>
          </Modal>
        )
          : (
            <SpinnerWrapper>
              <Spinner color="primary" />
            </SpinnerWrapper>
          )
}

      {currentUser.isAdmin && editTaskModalOpen && (
        <SaveTaskModal
          config={config}
          open={editTaskModalOpen}
          handleClose={() => { toggleEditModal(); }}
          type="edit"
          handleResult={(success: boolean, result: ITask) => {
            if (success) {
              toggleNotification(true, t('home-page.changes-saved'), result);
              setActions({
                ...actions,
                deleteRequests: result.ticketDeleteRequests,
                comments: result.ticketComments,
                attachments: result.ticketAttachments,
              });
            } else {
              toggleNotification(false, t('home-page.failed-to-save-changes'), null);
            }
          }}
          taskId={currentTask.id}
          initialValues={{
            title: currentTask.title,
            productId: currentTask.productId,
            taskTypeId: currentTask.taskTypeId,
            dueDate: new Date(currentTask.dueDate),
            priorityId: currentTask.priorityId,
            objectId: currentTask.objectId,
            subject: currentTask.subject,
            description: currentTask.description,
          }}
          toggleModal={toggleModal}
          initialAttachments={actions.attachments
            .map((a) => ({ asset: a.asset, preSignedUrl: '' }))}
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
          declineText={t('home-page.cancel')}
          type={confirmDialog.type}
          hasSpinner={confirmDialog.hasSpinner}
        />
      )}
    </>
  );
};

export default TaskOverviewModal;
