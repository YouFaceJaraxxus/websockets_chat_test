import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { Controller, useForm } from 'react-hook-form';
import { FormHelperText, TextField, Slide } from '@mui/material';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ISaveTask } from '../models/saveTask.model';
import { CreateTaskTitlePenIcon,
  BackIcon,
  AttachmentIcon,
  UploadIcon,
  DeleteAttachmentIcon,
  DoubleChecksIcon,
  SingleCheckIcon,
  CancelSubscriptionIcon,
} from '../../../assets/icons/index';
import { SaveTaskInputTitle,
  InputBox,
  SubmitButton,
  CustomSaveTaskDrawer,
  CustomSaveTaskWrapper,
  useStyles,
  SaveTaskInputTitleWrapper,
  IconWrapper,
  AttachmentsHeader,
  AttachTitle,
  UploadTitle,
  UploadTitleText,
  AttachmentsList,
  AttachmentsListItem,
  AttachmentsListItemText,
  IconWrapperPointer,
  InputFileStyle,
  InputLabelStyle,
  CreatingSpinnerWrapper,
  DeletingSpinnerWrapper,
  Spinner,
} from '../ui/SaveTaskModalStyle';
import SaveTaskSelect from './SaveTaskSelect';
import { useAppDispatch } from '../../../store/hooks';
import { createTaskAsync, editTaskAsync } from '../models/tasks/tasksSlice';
import { ISaveTaskModalProps } from '../models/ISaveTaskModalProps';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { bulkDeleteAssets, createAsset, deleteAsset, uploadAsset } from '../models/assets/AssetsService';
import AssetsRestrictionEnum from '../models/assets/assetRestrictionEnum';
import { IAssetResponse } from '../models/assets/asset';
import { getTaskAttachmentsById } from '../models/tasks/TaskService';
import { ALLOWED_FILE_TYPES, isAllowedFileType, MAX_FILE_SIZE } from '../../../common/util';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';

const SaveTaskModal = ({
  config,
  open,
  handleClose,
  type,
  handleResult,
  taskId = null,
  initialValues = {
    description: null,
    dueDate: new Date(),
    objectId: null,
    priorityId: null,
    productId: null,
    subject: null,
    taskTypeId: null,
    title: null,
  },
  initialAttachments = [],
  toggleModal = null,
  fetchTask = false,
} : ISaveTaskModalProps) => {
  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    setError,
    reset,
    formState,
  } = useForm<ISaveTask>({
    defaultValues: initialValues,
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const isEditType = () => type === 'edit';
  const isCreateType = () => type === 'create';

  const [attachments, setAttachments] = useState({
    creating: false,
    attachments: isEditType() ? initialAttachments : [] as IAssetResponse[],
    additionalAttachmentIds: [] as number[],
    additionalFiles: [] as { file: File, preSignedUrl: string, id: number, }[],
    deletingAttachmentId: null,
  });

  useEffect(() => {
    if (fetchTask && isEditType()) {
      setAttachments({
        ...attachments,
        creating: true,
      });
      getTaskAttachmentsById(taskId).then((response) => {
        setAttachments({
          ...attachments,
          attachments: response
            ?.map((a) => ({ asset: a.asset, preSignedUrl: '' })),
          creating: false,
        });
      }).catch(() => {
        setAttachments({
          ...attachments,
          creating: false,
        });
      });
    }
  }, []);

  useEffect(() => {
    const err = Object.keys(formState.errors);
    if (err.length) {
      const input = document.querySelector(
        `input[name=${err[0]}]`,
      );
      if (input) {
        input.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
          inline: 'start',
        });
      }
    }
  });

  const [anyFieldTouched, setAnyFieldTouched] = useState(false);
  const setNotTouched = () => {
    setAnyFieldTouched(false);
  };
  const setTouched = () => {
    if (!anyFieldTouched) { setAnyFieldTouched(true); }
  };

  const { t } = useTranslation();
  const products = config.products.map((product) => ({
    id: product.id,
    label: t(`config.${product.product}`),
  }));

  const priorities = config.priorities.map((priority) => ({
    id: priority.id,
    label: t(`config.${priority.priority}`),
  }));

  const taskTypes = config.taskTypes.map((taskType) => ({
    id: taskType.id,
    label: t(`config.${taskType.taskType}`),
    productId: taskType.productId,
  }));

  const objects = config.objects.map((object) => ({
    id: object.id,
    label: t(`config.${object.object}`),
  }));

  const titleRequired = t('create-task.title-required');
  const productRequired = t('create-task.product-required');
  const taskTypeRequired = t('create-task.task-type-required');
  const dueDateRequired = t('create-task.due-to-date-required');
  const dueDateInvalid = t('create-task.due-to-date-invalid');
  const dueDateInvalidPick = t('create-task.due-to-date-invalid-pick');
  const priorityRequired = t('create-task.priority-required');
  const objectRequired = t('create-task.object-required');
  const subjectRequired = t('create-task.subject-required');
  const descriptionRequired = t('create-task.description-required');

  const initialTaskTypes = isEditType() ?
    taskTypes.filter((taskType) => taskType.productId === initialValues.productId) :
    taskTypes.filter((taskType) => taskType.productId === 1);
  const [currentTaskTypes, setCurrentTaskTypes] = useState(initialTaskTypes);

  const handleRemoveAttachment = (removedAttachment: IAssetResponse) => {
    const { id } = removedAttachment.asset;
    setAttachments({
      ...attachments,
      deletingAttachmentId: id,
    });
    deleteAsset(id).then((response) => {
      if (response.success) {
        setAttachments({
          ...attachments,
          attachments: attachments
            .attachments
            .filter((attachment) => attachment.asset.id !== id),
          deletingAttachmentId: null,
          additionalAttachmentIds: attachments.additionalAttachmentIds
            .filter((attachmentId) => attachmentId !== id),
          additionalFiles: attachments.additionalFiles
            .filter((file) => file.id !== id),
        });
        setTouched();
      }
    }).catch(() => {
      setAttachments({
        ...attachments,
        deletingAttachmentId: null,
      });
    });
  };

  const classes = useStyles();
  const dispatch = useAppDispatch();

  const setTaskTypeOptions = (newValue) => {
    const newTaskTypes = taskTypes
      .filter((taskType) => taskType.productId === newValue);
    setCurrentTaskTypes(newTaskTypes);
    setValue('taskTypeId', null);
  };

  const toggleLabelText = (text, labelText) => {
    if (text && text.length > 0) return labelText;
    return null;
  };

  const minDate = new Date();
  minDate.setHours(0);
  minDate.setMinutes(0);
  minDate.setSeconds(0);

  const validateDate = (date: Date) => {
    if (date) {
      date.setHours(23);
      date.setMinutes(59);
      date.setSeconds(59);
      if (Number.isNaN(date.getTime())) {
        setError('dueDate', { message: dueDateInvalid });
        return dueDateInvalid;
      } if (minDate.getTime() > date.getTime()) {
        setError('dueDate', { message: dueDateInvalidPick });
        return dueDateInvalidPick;
      }
      setError('dueDate', null);
      return null;
    }
    setError('dueDate', { message: dueDateInvalid });
    return dueDateInvalid;
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
    type: '',
    method: null,
    hasSpinner: false,
  });

  const closeConfirmDialog = () => {
    setConfirmDialog({ ...confirmDialog, hasSpinner: false, open: false });
  };

  const finishClosingModal = (deleteAttachments: boolean) => {
    reset({
      description: null,
      dueDate: new Date(),
      objectId: null,
      priorityId: null,
      productId: null,
      subject: null,
      taskTypeId: null,
      title: null,
    });
    setNotTouched();
    if (deleteAttachments) {
      const assetsToDelete = isEditType() ?
        attachments.attachments
          .filter((attachment) => attachments.additionalAttachmentIds
            .includes(attachment.asset.id))
        : attachments.attachments;
      if (assetsToDelete.length > 0) {
        bulkDeleteAssets({
          assets: assetsToDelete.map((attachment) => attachment.asset.id),
        });
      }
    }
    setAttachments({
      attachments: [],
      creating: false,
      deletingAttachmentId: null,
      additionalAttachmentIds: [],
      additionalFiles: [],
    });
    handleClose();
    if (toggleModal) {
      toggleModal();
    }
  };

  const openConfirmCloseDialog = (deleteAttachments: boolean) => {
    const confirmDialogConfig = {
      dialogMessage: t('home-page.close-without-saving'),
      actionText: t('home-page.close'),
      IconComponent: CancelSubscriptionIcon,
      type: 'red',
      method: () => {
        closeConfirmDialog();
        finishClosingModal(deleteAttachments);
      },
      hasSpinner: false,
    };
    setConfirmDialog({
      open: true,
      ...confirmDialogConfig,
    });
  };

  const closeModal = (deleteAttachments: boolean) => {
    if (anyFieldTouched) {
      openConfirmCloseDialog(deleteAttachments);
    } else {
      finishClosingModal(deleteAttachments);
    }
  };

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const handleResponse = (response) => {
    let deleteAttachments = false;
    if (response.type && response.type.includes('fulfilled')) {
      deleteAttachments = false;
      handleResult(true, response.payload);
    } else {
      deleteAttachments = true;
      handleResult(false, null);
    }
    closeConfirmDialog();
    setTimeout(() => {
      setSubmitDisabled(false);
      finishClosingModal(deleteAttachments);
    }, 1000);
  };

  const saveTask = () => {
    const taskFormValues = getValues();
    setSubmitDisabled(true);
    const saveTaskValues = {
      ...taskFormValues,
      attachments: attachments.attachments.map((attachment) => attachment.asset.id),
    };
    attachments.additionalFiles.forEach((additionalFile) => {
      const formData = new FormData();
      formData.append('file', additionalFile.file);
      formData.append('presignedUrl', additionalFile.preSignedUrl);
      uploadAsset(formData).catch(() => {
        deleteAsset(additionalFile.id);
      });
    });
    if (isCreateType()) {
      dispatch(createTaskAsync(saveTaskValues)).then((response) => {
        handleResponse(response);
      });
    } else {
      const changedValues = Object.fromEntries(Object.entries(saveTaskValues)
        .filter(([key, value]) => {
          const initialValue = initialValues[key];
          if (key === 'attachments') {
            const attachmentsValue = value as number[];
            if (attachmentsValue.length !== initialAttachments.length) {
              return true;
            }
            const initialAttachmentsValue = initialAttachments.map((ia) => ia.asset.id);
            const diff = attachmentsValue.filter(
              (a) => initialAttachmentsValue.indexOf(a) === -1,
            );
            if (diff.length > 0) {
              return true;
            }
            return false;
          }
          if (key === 'dueDate') {
            const dateValue = value as Date;
            return dateValue.toLocaleDateString() !== initialValues.dueDate.toLocaleDateString();
          }
          return value !== initialValue;
        }));
      dispatch(editTaskAsync({
        id: taskId,
        data: {
          ...changedValues,
        },
      })).then((response) => {
        handleResponse(response);
      });
    }
  };

  const openConfirmSaveDialog = () => {
    const confirmDialogConfig = isCreateType() ? {
      dialogMessage: t('home-page.create-new-task'),
      actionText: t('home-page.create'),
      IconComponent: DoubleChecksIcon,
    } : {
      dialogMessage: t('home-page.save-changes-to-this-task'),
      actionText: t('home-page.save'),
      IconComponent: SingleCheckIcon,
    };
    setConfirmDialog({
      open: true,
      type: 'green',
      method: saveTask,
      ...confirmDialogConfig,
      hasSpinner: true,
    });
  };

  // without this, it's impossible to pick a same file twice in a row.
  const handleInputClick = (event) => {
    event.target.value = null;
  };

  const handleAddAttachment = (event) => {
    if (event.target.files.length > 0) {
      const file = event.target.files[0] as File;
      if (!isAllowedFileType(file.type)) {
        dispatch(
          openNotification({
            isOpen: true,
            messageBody: t('account.invalid-file-format'),
            severity: 'error',
          }),
        );
      } else if (file.size > MAX_FILE_SIZE) {
        dispatch(
          openNotification({
            isOpen: true,
            messageBody: t('account.file-too-large'),
            severity: 'error',
          }),
        );
      } else {
        setAttachments({
          ...attachments,
          creating: true,
        });
        createAsset({
          mimetype: file.type,
          name: file.name,
          size: file.size,
          restriction: AssetsRestrictionEnum.FREE_FOR_ALL,
        }).then((addAssetResponse) => {
          setTouched();
          const { preSignedUrl } = addAssetResponse;
          const additionalAttachmentIds = [
            ...attachments.additionalAttachmentIds,
            addAssetResponse.asset.id,
          ];
          setAttachments({
            ...attachments,
            additionalFiles: [...attachments.additionalFiles, {
              id: addAssetResponse.asset.id,
              preSignedUrl,
              file,
            }],
            additionalAttachmentIds,
            attachments: [...(attachments.attachments), addAssetResponse],
            creating: false,
          });
        }).catch(() => {
          setAttachments({
            ...attachments,
            creating: false,
          });
        });
      }
    }
  };

  const getDateLabelColor = () => {
    const date = getValues('dueDate');
    return date == null ? '#A5AFB0' : '#000000';
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => { closeModal(true); }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ outline: 'none' }}
      >
        <Slide in={open} direction="left" mountOnEnter unmountOnExit>
          <CustomSaveTaskDrawer>
            <CustomSaveTaskWrapper>
              <form onSubmit={handleSubmit(() => openConfirmSaveDialog())}>
                <Box
                  id="title-box"
                  sx={{
                    marginBottom: '20px',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}
                >
                  <IconWrapper sx={{ minWidth: '25px' }}>
                    <CreateTaskTitlePenIcon />
                  </IconWrapper>
                  <Controller
                    name="title"
                    control={control}
                    defaultValue=""
                    render={({
                      field: { onChange, value },
                      fieldState: { error },
                    }) => (
                      <SaveTaskInputTitleWrapper>
                        <SaveTaskInputTitle
                          value={value}
                          onChange={(e) => { onChange(e); setTouched(); }}
                          type="text"
                          placeholder={t('create-task.title-placeholder')}
                          maxLength={50}
                          name="title"
                        />
                        {!!error && (
                        <FormHelperText className={classes.errorText}>
                          {error.message}
                        </FormHelperText>
                        )}
                      </SaveTaskInputTitleWrapper>

                    )}
                    rules={{
                      required: titleRequired,
                      maxLength: {
                        value: 50,
                        message: t('create-task.title-maxlen-error'),
                      },
                    }}
                  />
                  <IconWrapperPointer role="button" onClick={() => { closeModal(true); }}>
                    <BackIcon />
                  </IconWrapperPointer>
                </Box>

                <Box id="other-fields-box">

                  <InputBox>
                    <Controller
                      name="productId"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <SaveTaskSelect
                          value={value}
                          label={t('create-task.product-placeholder')}
                          onChange={(e) => {
                            onChange(e);
                            setTaskTypeOptions(e.target.value);
                            setTouched();
                          }}
                          options={products}
                          hasError={!!error}
                          errorMessage={t('create-task.product-error-message')}
                          name="productId"
                        />
                      )}
                      rules={{
                        required: productRequired,
                      }}
                    />
                  </InputBox>

                  <InputBox>
                    <Controller
                      name="taskTypeId"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <SaveTaskSelect
                          value={value}
                          label={t('create-task.task-type-placeholder')}
                          onChange={(e) => { onChange(e); setTouched(); }}
                          options={currentTaskTypes}
                          hasError={!!error}
                          errorMessage={t('create-task.task-type-error-message')}
                          name="taskTypeId"
                        />
                      )}
                      rules={{
                        required: taskTypeRequired,
                      }}
                    />
                  </InputBox>

                  <InputBox
                    sx={{ '& > div >label': { color: getDateLabelColor() } }}
                  >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Controller
                        name="dueDate"
                        control={control}
                        defaultValue={minDate}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <>
                            <DesktopDatePicker
                              value={value}
                              onChange={(e) => {
                                onChange(e);
                                setTouched();
                                validateDate(e);
                              }}
                              renderInput={(params) => (
                                <TextField
                                  label={t('create-task.due-to-date-label')}
                                  fullWidth
                                  {...params}
                                  name="dueDate"
                                />
                              )}
                              label={t('create-task.due-to-date-label')}
                              minDate={minDate}
                            />
                            {!!error && (
                            <FormHelperText className={classes.errorText}>
                              {error.message}
                            </FormHelperText>
                            )}
                          </>

                        )}
                        rules={{
                          required: dueDateRequired,
                          validate: (value) => validateDate(value),
                        }}
                      />
                    </LocalizationProvider>
                  </InputBox>

                  <InputBox>
                    <Controller
                      name="priorityId"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <SaveTaskSelect
                          value={value}
                          label={t('create-task.priority-placeholder')}
                          onChange={(e) => { onChange(e); setTouched(); }}
                          options={priorities}
                          hasError={!!error}
                          errorMessage={t('create-task.priority-error-message')}
                          name="priorityId"
                        />
                      )}
                      rules={{
                        required: priorityRequired,
                      }}
                    />
                  </InputBox>

                  <InputBox>
                    <Controller
                      name="objectId"
                      control={control}
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <SaveTaskSelect
                          value={value}
                          label={t('create-task.object-placeholder')}
                          onChange={(e) => { onChange(e); setTouched(); }}
                          options={objects}
                          hasError={!!error}
                          errorMessage={t('create-task.object-error-message')}
                          name="objectId"
                        />
                      )}
                      rules={{
                        required: objectRequired,
                      }}
                    />
                  </InputBox>

                  <InputBox>
                    <Controller
                      name="subject"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          onChange={(e) => { onChange(e); setTouched(); }}
                          type="text"
                          fullWidth
                          id="outlined-basic"
                          label={toggleLabelText(value, t('create-task.subject-label'))}
                          placeholder={t('create-task.subject-placeholder')}
                          inputProps={{ maxLength: 50 }}
                          autoComplete="off"
                          name="subject"
                        />
                      )}
                      rules={{
                        required: subjectRequired,
                        maxLength: {
                          value: 50,
                          message: t('create-task.subject-maxlen-error'),
                        },
                      }}
                    />
                  </InputBox>

                  <InputBox>
                    <Controller
                      name="description"
                      control={control}
                      defaultValue=""
                      render={({
                        field: { onChange, value },
                        fieldState: { error },
                      }) => (
                        <TextField
                          multiline
                          rows={4}
                          value={value}
                          error={!!error}
                          helperText={error ? error.message : null}
                          onChange={(e) => { onChange(e); setTouched(); }}
                          type="text"
                          fullWidth
                          id="outlined-basic"
                          label={toggleLabelText(value, t('create-task.description-label'))}
                          placeholder={t('create-task.description-placeholder')}
                          inputProps={{ maxLength: 300 }}
                          autoComplete="off"
                          name="description"
                        />
                      )}
                      rules={{
                        required: descriptionRequired,
                        maxLength: {
                          value: 300,
                          message: t('create-task.description-maxlen-error'),
                        },
                      }}
                    />
                  </InputBox>
                </Box>

                <AttachmentsHeader>
                  <IconWrapper>
                    <AttachmentIcon />
                  </IconWrapper>
                  <AttachTitle>
                    {t('create-task.attach-document-header')}
                  </AttachTitle>
                  <InputFileStyle
                    type="file"
                    onChange={(e) => { handleAddAttachment(e); }}
                    id="inputAttachment"
                    onClick={handleInputClick}
                    title=""
                    accept={ALLOWED_FILE_TYPES.join(', ')}
                  />
                  <InputLabelStyle htmlFor="inputAttachment" />
                  <UploadTitle>
                    <UploadTitleText>
                      {t('create-task.click-to-upload')}
                    </UploadTitleText>
                    <IconWrapperPointer>
                      <UploadIcon />
                    </IconWrapperPointer>
                  </UploadTitle>
                </AttachmentsHeader>
                <AttachmentsList>
                  <>
                    {attachments
                      .attachments
                      .map((attachment) => (attachment.asset.id ===
                        attachments.deletingAttachmentId ?
                        (
                          <DeletingSpinnerWrapper>
                            <Spinner color="primary" />
                          </DeletingSpinnerWrapper>
                        )
                        :
                        (
                          <AttachmentsListItem key={attachment.asset.id}>
                            <AttachmentsListItemText>
                              {attachment.asset.name}
                            </AttachmentsListItemText>
                            <IconWrapperPointer
                              sx={{ marginLeft: '3%' }}
                              onClick={() => {
                                handleRemoveAttachment(attachment);
                              }}
                            >
                              <DeleteAttachmentIcon />
                            </IconWrapperPointer>
                          </AttachmentsListItem>
                        )))}
                  </>
                </AttachmentsList>
                {
                attachments.creating && (
                  <CreatingSpinnerWrapper>
                    <Spinner color="primary" />
                  </CreatingSpinnerWrapper>
                )
              }
                <SubmitButton
                  disabled={submitDisabled || attachments.creating}
                  type="submit"
                >
                  {t(isCreateType() ? 'create-task.create-task' : 'create-task.save-task')}
                </SubmitButton>
              </form>
            </CustomSaveTaskWrapper>
          </CustomSaveTaskDrawer>
        </Slide>
      </Modal>
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
        hasSpinner={confirmDialog.hasSpinner}
      />
      )}
    </>
  );
};

export default SaveTaskModal;
