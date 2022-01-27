import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TextField } from '@mui/material';
import {
  CustomForm,
  CustomInputBox,
  SubmitButton,
} from './ui/AccountPersonalInformationStyle';
import { IEditPasswordForm } from '../models/userForm/editUserForm';

const AccountPasswordForm = ({ submitDisabled, saveUserInfoChanges }) => {
  const { t } = useTranslation();
  const passwordRequired = t('account.personal-password-required');
  const confirmRequired = t('account.personal-confirm-required');
  const confirmNoMatch = t('account.personal-confirm-no-match');
  const oldpassRequired = t('account.personal-old-pass-required');
  const { handleSubmit, control, getValues } = useForm<IEditPasswordForm>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmedPassword: '',
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
          name="newPassword"
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
              type="password"
              fullWidth
              id="outlined-basic"
              label={toggleLabelText(value, t('account.personal-password-placeholder'))}
              placeholder={t('account.personal-password-placeholder')}
              inputProps={{ maxLength: 50 }}
              autoComplete="off"
            />
          )}
          rules={{
            required: passwordRequired,
            minLength: { value: 8, message: passwordRequired },
          }}
        />
      </CustomInputBox>

      <CustomInputBox>
        <Controller
          name="confirmedPassword"
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
              type="password"
              fullWidth
              id="outlined-basic"
              label={toggleLabelText(value, t('account.personal-confirm-placeholder'))}
              placeholder={t('account.personal-confirm-placeholder')}
              inputProps={{ maxLength: 50 }}
              autoComplete="off"
            />
          )}
          rules={{
            required: confirmRequired,
            minLength: { value: 8, message: passwordRequired },
            validate: (value) => {
              const newPassword = getValues('newPassword');
              if (newPassword !== value) return confirmNoMatch;
              return null;
            },
          }}
        />
      </CustomInputBox>

      <CustomInputBox>
        <Controller
          name="oldPassword"
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
              type="password"
              fullWidth
              id="outlined-basic"
              label={toggleLabelText(value, t('account.personal-old-pass-placeholder'))}
              placeholder={t('account.personal-old-pass-placeholder')}
              inputProps={{ maxLength: 50 }}
              autoComplete="off"
            />
          )}
          rules={{
            minLength: { value: 8, message: passwordRequired },
            required: oldpassRequired,
          }}
        />
      </CustomInputBox>

      <SubmitButton
        disabled={submitDisabled}
        type="submit"
      >
        {t('account.personal-change-password')}
      </SubmitButton>
    </CustomForm>
  );
};

export default AccountPasswordForm;
