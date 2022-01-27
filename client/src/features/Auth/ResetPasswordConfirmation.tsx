import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import qs from 'qs';
import {
  CardStyle,
  useStyles,
  SubmitButton,
  IconWrapper,
} from './ui/ResetPasswordStyle';
import logo from '../../assets/icons/logo.svg';
import { IResetPassword } from './models/resetPassword';
import { NewPasswordIcon } from '../../assets/icons';
import { useAppDispatch } from '../../store/hooks';
import { resetPasswordAsync } from './slices/authSlice';
import { LOGIN_PATH, PASSWORD_CHANGED_PATH } from '../../routes/path-constants';
import { IResetPasswordResponse } from './models/resetPasswordResponse';
import { openNotification } from '../../components/notifications/model/globalNotificationSlice';

const ResetPasswordConfirmation = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, getValues } = useForm<IResetPassword>();
  const { t } = useTranslation();
  const passwordRequired = t('login.password-required');
  const passwordRepeatRequired = t('login.password-repeat-required');
  const confirmNoMatch = t('login.password-no-match');

  const classes = useStyles();
  const location = useLocation();
  const history = useHistory();
  const parsed = qs.parse(location.search, { ignoreQueryPrefix: true });
  let token = '';
  if (!parsed || !parsed.token) {
    history.push(LOGIN_PATH);
  } else token = parsed.token as string;

  const onSubmit = () => {
    const values = getValues();
    dispatch(resetPasswordAsync({
      ...values,
      token,
    })).then((response) => {
      if (response.payload) {
        const { success } = response.payload as IResetPasswordResponse;
        if (success) {
          dispatch(openNotification({
            isOpen: true,
            messageBody: t('login.password-success-reset'),
            severity: 'success',
          }));
          setTimeout(() => { history.push(PASSWORD_CHANGED_PATH); }, 1500);
        }
      }
    });
  };
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <div className={classes.holder}>
      <img src={logo} alt="ResetPassword" />
      <CardStyle>
        <div>
          <h2 className={classes.h2}>
            <IconWrapper sx={{ paddingTop: '5px' }}>
              <NewPasswordIcon />
            </IconWrapper>
            {t('account.personal-password-placeholder')}
          </h2>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="password"
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
                  label={t('login.password-new')}
                  id="outlined-basic"
                />
              )}
              rules={{
                required: passwordRequired,
                minLength: {
                  value: 8,
                  message: t('login.password-min-length'),
                },
              }}
            />
            <Controller
              name="confirmPassword"
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
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  label={t('login.password-repeat')}
                  id="outlined-basic"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              )}
              rules={{
                required: passwordRepeatRequired,
                minLength: {
                  value: 8,
                  message: t('login.password-min-length'),
                },
                validate: (value) => {
                  const password = getValues('password');
                  if (password !== value) return confirmNoMatch;
                  return null;
                },
              }}
            />
            <SubmitButton
              type="submit"
            >
              {t('login.continue')}
            </SubmitButton>
          </form>
        </div>
      </CardStyle>
    </div>
  );
};

export default ResetPasswordConfirmation;
