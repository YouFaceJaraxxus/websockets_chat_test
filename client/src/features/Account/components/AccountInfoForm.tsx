import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import {
  CustomForm,
  CustomInputBox,
  SubmitButton,
} from './ui/AccountPersonalInformationStyle';
import { useAppSelector } from '../../../store/hooks';
import { selectUser } from '../../Auth/slices/authSlice';
import { IEditPersonalInfoForm } from '../models/userForm/editUserForm';

const AccountInfoForm = ({ submitDisabled, saveUserInfoChanges }) => {
  const { t } = useTranslation();
  const firstnameRequired = t('account.personal-firstname-required');
  const lastnameRequired = t('account.personal-lastname-required');
  const emailRequired = t('account.personal-email-required');
  const user = useAppSelector(selectUser);
  const { handleSubmit, control, getValues } = useForm<IEditPersonalInfoForm>({
    defaultValues: {
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      newProfileImageId: null,
    },
  });

  const toggleLabelText = (text, labelText) => {
    if (text && text.length > 0) return labelText;
    return null;
  };

  return (
    <CustomForm sx={{ width: '100%' }} onSubmit={handleSubmit(() => saveUserInfoChanges(getValues()))}>
      <CustomInputBox>
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
              type="text"
              fullWidth
              id="outlined-basic"
              label={toggleLabelText(value, t('account.personal-firstname-placeholder'))}
              placeholder={t('account.personal-firstname-placeholder')}
              inputProps={{ maxLength: 50 }}
              autoComplete="off"
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
      </CustomInputBox>

      <CustomInputBox>
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
              type="text"
              fullWidth
              id="outlined-basic"
              label={toggleLabelText(value, t('account.personal-lastname-placeholder'))}
              placeholder={t('account.personal-lastname-placeholder')}
              inputProps={{ maxLength: 50 }}
              autoComplete="off"
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
      </CustomInputBox>

      <CustomInputBox>
        <Controller
          name="email"
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
              type="email"
              fullWidth
              id="outlined-basic"
              label={toggleLabelText(value, t('account.personal-email-placeholder'))}
              placeholder={t('account.personal-email-placeholder')}
              inputProps={{ maxLength: 50 }}
              autoComplete="off"
            />
          )}
          rules={{
            required: emailRequired,
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: t('account.personal-email-invalid'),
            },
          }}
        />
      </CustomInputBox>

      <SubmitButton
        disabled={submitDisabled}
        type="submit"
      >
        {t('account.personal-save-changes')}
      </SubmitButton>
    </CustomForm>
  );
};

export default AccountInfoForm;
