import React from 'react';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import {
  CardStyle,
  useStyles,
  Resend,
  SpinnerWrapper,
  Spinner,
} from './ui/ResetPasswordStyle';
import reset from '../../assets/icons/reset.svg';
import logo from '../../assets/icons/logo.svg';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { requestPasswordResetAsync } from './slices/authSlice';
import { IRequestPasswordResetResponse } from './models/requestPasswordResetResponse';
import { ButtonStyled } from './ui/style';
import { openNotification } from '../../components/notifications/model/globalNotificationSlice';
import { emailRegex } from '../../common/util';

interface IResetPassword {
  email: string;
}

const ResetPassword = () => {
  const dispatch = useAppDispatch();
  const { handleSubmit, control, getValues } = useForm<IResetPassword>();
  const { t } = useTranslation();
  const emailRequired = t('login.email-required');

  const classes = useStyles();
  const { isResendingVerificationCode } = useAppSelector((state) => state.auth);

  const handleResendClick = () => {
    const email = getValues('email');
    dispatch(requestPasswordResetAsync(email)).then((response) => {
      if (response.payload) {
        const { success } = response.payload as IRequestPasswordResetResponse;
        if (success) {
          dispatch(openNotification({
            isOpen: true,
            messageBody: t('login.link-sent'),
            severity: 'success',
          }));
        }
      }
    });
  };

  return (
    <div className={classes.holder}>
      <img src={logo} alt="ResetPassword" />
      <CardStyle>
        <div>
          <h2 className={classes.h2}>
            <img src={reset} alt="ResetPassword" />
            {t('login.reset-password')}
          </h2>
          <p className={classes.p}>{t('login.order-to-reset')}</p>

          <Controller
            name="email"
            control={control}
            defaultValue=""
            render={({ field: { onChange, value }, fieldState: { error } }) => (
              <TextField
                value={value}
                error={!!error}
                helperText={error ? error.message : null}
                onChange={onChange}
                type="email"
                label={t('login.email')}
                id="outlined-basic"
                sx={{ width: '90%', '&> div': { borderRadius: '15px !important' }, marginTop: '15px' }}
                autoComplete="off"
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
          <Resend onClick={handleSubmit(handleResendClick)}>
            {t('login.resend')}
          </Resend>
          {isResendingVerificationCode ? (
            <SpinnerWrapper>
              <Spinner color="primary" />
            </SpinnerWrapper>
          ) : (
            <ButtonStyled onClick={handleSubmit(handleResendClick)}>
              {t('login.send-link')}
            </ButtonStyled>
          )}
          <p className={classes.backToLogin}>
            <a href="/login">{t('login.back-to-login')}</a>
          </p>
        </div>
      </CardStyle>
    </div>
  );
};

export default ResetPassword;
