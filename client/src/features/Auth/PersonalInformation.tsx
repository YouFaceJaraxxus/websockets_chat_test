import React, { FC, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { useTranslation } from 'react-i18next';
import { Avatar } from '@mui/material';
import { CardStyle, useStyles } from './ui/style';
import { IUserPersonalInformation } from './models/forms/model';
import { LogoIcon, UploadIcon } from '../../assets/icons';
import { editAccountPersonalInformationAsync } from './slices/authSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import personalInfoIcon from '../../assets/icons/personalInfoIcon.svg';
import {
  AddProfilePicture,
  IconWrapper,
  InputFileStyle,
  PictureText,
  ButtonStyled,
  SpinnerWrapper,
  Spinner,
  InputLabelStyle,
} from './ui/PersonalInformationStyle';
import {
  createAsset,
  uploadAsset,
} from '../Dashboard/models/assets/AssetsService';
import AssetsRestrictionEnum from '../Dashboard/models/assets/assetRestrictionEnum';
import { openNotification } from '../../components/notifications/model/globalNotificationSlice';
import { ALLOWED_IMAGE_TYPES, isAllowedImageType, MAX_FILE_SIZE } from '../../common/util';

const PersonalInformation: FC = () => {
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const { handleSubmit, control, getValues } =
    useForm<IUserPersonalInformation>();

  const firstnameRequired = t('personal.firstname-required');
  const lastnameRequired = t('personal.lastname-required');
  const { root, h2, holder } = useStyles();

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
                  messageBody: t('account.successfully-added-picture'),
                  severity: 'success',
                }));
              }
            });
        });
      }
    }
  };

  const onSubmit = () => {
    const values = getValues();
    dispatch(
      editAccountPersonalInformationAsync({
        ...values,
        newProfileImageId: null,
      }),
    ).then((dispatchResponse) => {
      if (dispatchResponse.payload) {
        dispatch(openNotification({
          isOpen: true,
          messageBody: t('personal.success-created-account'),
          severity: 'success',
        }));
      }
    });
  };

  return (
    <div className={holder}>
      <LogoIcon />
      <CardStyle>
        <div>
          <form
            className={root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className={h2}>
              <Avatar
                alt="Account Icon"
                src={userIcon?.icon || personalInfoIcon}
                sx={{ width: 40, height: 40, margin: '0px auto' }}
              />
              {t('personal.personal-information')}
            </h2>

            <Controller
              name="firstname"
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
                  onChange={onChange}
                  type="firstname"
                  fullWidth
                  label={t('personal.firstname')}
                  id="outlined-basic"
                />
              )}
              rules={{
                required: firstnameRequired,
                minLength: {
                  value: 2,
                  message: t('account.personal-firstname-minlength'),
                },
              }}
            />

            <Controller
              name="lastname"
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
                  onChange={onChange}
                  type="lastname"
                  fullWidth
                  label={t('personal.lastname')}
                  id="outlined-basic"
                />
              )}
              rules={{
                required: lastnameRequired,
                minLength: {
                  value: 2,
                  message: t('account.personal-lastname-minlength'),
                },
              }}
            />

            <AddProfilePicture>
              <IconWrapper sx={{ marginLeft: '1%', marginRight: '3%' }}>
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
            </AddProfilePicture>
            {
              isLoading ?
                (
                  <SpinnerWrapper>
                    <Spinner color="primary" />
                  </SpinnerWrapper>
                ) :
                  <ButtonStyled type="submit">{t('personal.continue')}</ButtonStyled>
            }
          </form>
        </div>
      </CardStyle>
    </div>
  );
};

export default PersonalInformation;
