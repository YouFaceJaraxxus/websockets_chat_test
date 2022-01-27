import { Avatar } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import {
  deleteAccountAsync,
  editAccountPersonalInformationAsync,
  resetUser,
} from '../../Auth/slices/authSlice';
import { IconWrapper } from '../../Dashboard/ui/SaveTaskModalStyle';
import {
  FormWrapper,
  PersonalInformationWrapper,
  RightPartWrapper,
  YourPassword,
  Picture,
  Delete,
  PictureText,
  DeleteText,
  InputFileStyle,
  SpinnerWrapper,
  Spinner,
  ResponsiveDelete,
  InputLabelStyle,
} from './ui/AccountPersonalInformationStyle';
import account from '../../../assets/icons/account.svg';
import {
  DeleteAccountIcon,
  DeleteAccountIconLarge,
  UploadIcon,
} from '../../../assets/icons';
import {
  createAsset,
  getAssetPresignedUrl,
  uploadAsset,
} from '../../Dashboard/models/assets/AssetsService';
import AssetsRestrictionEnum from '../../Dashboard/models/assets/assetRestrictionEnum';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmation';
import { IDeleteUserResponse } from '../../Auth/models/deleteUserResponse';
import { openNotification } from '../../../components/notifications/model/globalNotificationSlice';
import AccountInfoForm from './AccountInfoForm';
import AccountPasswordForm from './AccountPasswordForm';
import { ALLOWED_IMAGE_TYPES, isAllowedImageType, MAX_FILE_SIZE } from '../../../common/util';

export default function AccountPersonalInformation() {
  const { user, isDeletingAccount } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [userIcon, setUserIcon] = useState({
    icon: null,
    file: null,
  });

  const handleImageChange = (e) => {
    e.preventDefault();

    const reader = new FileReader();
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0] as File;
      if (!isAllowedImageType(file.type)) {
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
        createAsset({
          mimetype: file.type,
          name: file.name,
          size: file.size,
          restriction: AssetsRestrictionEnum.FREE_FOR_ALL,
        }).then((assetResponse) => {
          dispatch(editAccountPersonalInformationAsync({
            newProfileImageId: assetResponse.asset.id,
          }))
            .then((dispatchResponse) => {
              if (dispatchResponse.payload) {
                const formData = new FormData();
                formData.append('file', file);
                formData.append('presignedUrl', assetResponse.preSignedUrl);
                uploadAsset(formData);
                reader.onloadend = () => {
                  setUserIcon({
                    icon: reader.result,
                    file,
                  });
                };
                reader.readAsDataURL(file);
                dispatch(openNotification({
                  isOpen: true,
                  messageBody: t('account.successfully-edited-picture'),
                  severity: 'success',
                }));
              }
            });
        });
      }
    }
  };

  const getUserIcon = () => {
    if (user?.profileImageId) {
      setUserIcon({
        icon: null,
        file: null,
      });
      getAssetPresignedUrl(user.profileImageId).then((presigned) => {
        setUserIcon({
          ...userIcon,
          icon: presigned.preSignedUrl,
        });
      });
    }
  };

  useEffect(() => {
    getUserIcon();
  }, []);

  const [submitDisabled, setSubmitDisabled] = useState(false);

  const saveUserInfoChanges = (values) => {
    setSubmitDisabled(true);
    dispatch(
      editAccountPersonalInformationAsync({
        ...values,
      }),
    ).then((dispatchResponse) => {
      if (dispatchResponse.payload) {
        dispatch(openNotification({
          isOpen: true,
          messageBody: t('account.successfully-edited-account'),
          severity: 'success',
        }));
      }
    });
    setSubmitDisabled(false);
  };

  const savePasswordChanges = (values) => {
    setSubmitDisabled(true);
    dispatch(
      editAccountPersonalInformationAsync({
        ...values,
      }),
    ).then((dispatchResponse) => {
      if (dispatchResponse.payload) {
        dispatch(openNotification({
          isOpen: true,
          severity: 'success',
          messageBody: t('account.successfully-changed-password'),
        }));
      }
    });
    setSubmitDisabled(false);
  };

  const [verifyPassword, setVerifyPassword] = useState('');

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    dialogMessage: '',
    actionText: '',
    IconComponent: null,
  });

  const openConfirmDeleteDialog = () => {
    const confirmDialogConfig = {
      dialogMessage: t('account.delete-account-dialog-message'),
      actionText: t('account.delete'),
      IconComponent: DeleteAccountIconLarge,
    };
    setConfirmDialog({
      open: true,
      ...confirmDialogConfig,
    });
  };

  const handlePasswordChange = (e) => {
    setVerifyPassword(e.target.value);
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    });
  };

  const deleteAccount = () => {
    dispatch(deleteAccountAsync(verifyPassword)).then((response) => {
      if (response.payload) {
        const payload = response.payload as IDeleteUserResponse;
        const { success } = payload;
        if (success) {
          dispatch(openNotification({
            isOpen: true,
            messageBody: t('account.account-deleted'),
            severity: 'error',
          }));
          setTimeout(() => { dispatch(resetUser()); }, 1500);
        } else {
          dispatch(openNotification({
            isOpen: true,
            messageBody: t('account.account-deleted'),
            severity: 'error',
          }));
        }
      }
    });
    setVerifyPassword('');
    closeConfirmDialog();
  };

  return (
    <>
      <PersonalInformationWrapper>
        <FormWrapper>
          <AccountInfoForm
            submitDisabled={submitDisabled}
            saveUserInfoChanges={saveUserInfoChanges}
          />
          <YourPassword>{t('account.your-password')}</YourPassword>

          <AccountPasswordForm
            submitDisabled={submitDisabled}
            saveUserInfoChanges={savePasswordChanges}
          />

          <Picture sx={{ '@media (min-width: 1081px)': {
            display: 'none',
          } }}
          >
            <IconWrapper>
              <Avatar
                alt="Account Icon"
                src={userIcon?.icon || account}
                sx={{ width: 40, height: 40, margin: '0px auto' }}
              />
            </IconWrapper>
            <IconWrapper sx={{ marginLeft: '5%', marginRight: '3%' }}>
              <UploadIcon color="#948CFC" />
            </IconWrapper>
            <InputFileStyle
              type="file"
              id="inputProfileImage"
              onChange={handleImageChange}
              title=""
              accept={ALLOWED_IMAGE_TYPES.join(', ')}
            />
            <InputLabelStyle htmlFor="inputProfileImage" />
            <PictureText>{t('account.add-profile-picture')}</PictureText>
          </Picture>
          <ResponsiveDelete>
            {isDeletingAccount ? (
              <SpinnerWrapper>
                <Spinner color="primary" />
              </SpinnerWrapper>
            ) : (
              <Tooltip
                title={t('account.once-you-deleted')}
                placement="top"
                arrow
              >
                <Delete onClick={openConfirmDeleteDialog}>
                  <IconWrapper sx={{ marginRight: '5%' }}>
                    <DeleteAccountIcon />
                  </IconWrapper>
                  <DeleteText>{t('account.delete-your-account')}</DeleteText>
                </Delete>
              </Tooltip>
            )}
          </ResponsiveDelete>
        </FormWrapper>
        <RightPartWrapper>
          <Picture>
            <IconWrapper>
              <Avatar
                alt="Account Icon"
                src={userIcon?.icon || account}
                sx={{ width: 40, height: 40, margin: '0px auto' }}
              />
            </IconWrapper>
            <IconWrapper sx={{ marginLeft: '5%', marginRight: '3%' }}>
              <UploadIcon color="#948CFC" />
            </IconWrapper>
            <InputFileStyle
              type="file"
              id="inputProfileImage"
              onChange={handleImageChange}
              title=""
            />
            <InputLabelStyle htmlFor="inputProfileImage" />
            <PictureText>{t('account.add-profile-picture')}</PictureText>
          </Picture>
          {isDeletingAccount ? (
            <SpinnerWrapper>
              <Spinner color="primary" />
            </SpinnerWrapper>
          ) : (
            <Tooltip
              title={t('account.once-you-deleted')}
              placement="top"
              arrow
            >
              <Delete onClick={openConfirmDeleteDialog}>
                <IconWrapper sx={{ marginRight: '5%' }}>
                  <DeleteAccountIcon />
                </IconWrapper>
                <DeleteText>{t('account.delete-your-account')}</DeleteText>
              </Delete>
            </Tooltip>
          )}
        </RightPartWrapper>
      </PersonalInformationWrapper>
      {confirmDialog.open && (
        <ConfirmationDialog
          isOpen={confirmDialog.open}
          handleAcceptConfirmation={deleteAccount}
          handleCloseConfirmation={closeConfirmDialog}
          confirmationTitle={confirmDialog.dialogMessage}
          icon={<confirmDialog.IconComponent />}
          approveText={confirmDialog.actionText}
          declineText={t('account.cancel')}
          type="red"
          inputValidationValue={verifyPassword}
          handleInputValidationChange={handlePasswordChange}
          inputValidationLabel={t('account.your-password')}
          inputHidden
        />
      )}
    </>
  );
}
