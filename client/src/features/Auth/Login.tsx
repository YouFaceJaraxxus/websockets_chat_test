import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useTranslation } from 'react-i18next';
import { ButtonStyled, CardStyle, useStyles } from './ui/style';
import { LogoIcon, LoginIcon } from '../../assets/icons';
import { IUserLogin } from './models/forms/model';
import { useAppDispatch } from '../../store/hooks';
import { loginUserAsync } from './slices/authSlice';
import { openNotification } from '../../components/notifications/model/globalNotificationSlice';
import { emailRegex } from '../../common/util';

const Login = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);
  const dispatch = useAppDispatch();

  const emailRequired = t('login.email-required');
  const passwordRequired = t('login.password-required');

  const { handleSubmit, control, getValues } = useForm<IUserLogin>();
  const { root, h2, holder, p } = useStyles();

  const onSubmit = () => {
    const values = getValues();
    dispatch(loginUserAsync({ ...values })).then((response) => {
      if (response.payload != null) {
        dispatch(openNotification({
          isOpen: true,
          severity: 'success',
          messageBody: t('login.login-success'),
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
              <LoginIcon />
              {t('login.log-in')}
            </h2>

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
                  label={t('login.email')}
                  id="outlined-basic"
                />
              )}
              rules={{
                required: emailRequired,
                pattern: {
                  value: emailRegex,
                  message: t('login.email-error'),
                },
              }}
            />

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
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  label={t('login.password')}
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
                required: passwordRequired,
                minLength: {
                  value: 8,
                  message: t('login.password-min-length'),
                },
              }}
            />
            <p className={p}>
              <Link to="/resetPassword">{t('login.forgot-password')}</Link>
            </p>
            <ButtonStyled type="submit">{t('login.log-in')}</ButtonStyled>
          </form>

          <p className={p}>
            {t('login.dont-have-account')}
            &nbsp;
            <Link to="/register">{t('login.sign-up')}</Link>
          </p>
        </div>
      </CardStyle>
    </div>
  );
};

export default Login;
