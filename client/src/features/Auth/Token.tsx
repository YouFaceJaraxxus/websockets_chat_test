import React from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TextField from '@mui/material/TextField';
import { Controller, useForm } from 'react-hook-form';
import { CardStyle, ButtonStyled, useStyles } from './ui/style';
import { TokenIcon, LogoIcon } from '../../assets/icons/index';
import { resendVerificationCodeAsync, verifyUserAsync } from './slices/authSlice';
import { PERSONALINFORMATION_PATH } from '../../routes/path-constants';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Resend, Spinner, SpinnerWrapper } from './ui/TokenStyle';
import { openNotification } from '../../components/notifications/model/globalNotificationSlice';

const Token = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const { t } = useTranslation();
  const { handleSubmit, control } = useForm();
  const tokenRequired = t('token.token-required');
  const tokenInvalid = t('token.invalid-token');
  const classes = useStyles();
  const { isResendingVerificationCode, isLoading } = useAppSelector((state) => state.auth);
  const tokenRule = t('token.token-cant-negative');
  const toggleNotification = (success: boolean, messageBody: string) => {
    if (success) {
      dispatch(openNotification({
        isOpen: true,
        messageBody,
        severity: 'success',
      }));
    }
  };

  const onSubmit = (code) => {
    dispatch(verifyUserAsync(code))
      .then((response) => {
        if (response.payload != null) {
          history.push(PERSONALINFORMATION_PATH);
        }
      })
      .catch(() => {});
  };

  const handleResendClick = () => {
    dispatch(resendVerificationCodeAsync()).then((response) => {
      if (response.payload) {
        toggleNotification(true, t('login.token-resent'));
      }
    });
  };

  return (
    <div className={classes.holder}>
      <LogoIcon />
      <CardStyle>
        <div>
          <p className={classes.p}>
            {t('token.sent-email')}
            <br />
            {t('token.check-email')}
          </p>
          <h2 className={classes.h2}>
            <TokenIcon />
            {t('token.enter-token')}
          </h2>
          <form
            className={classes.root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Controller
              name="code"
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
                  onChange={(e) => {
                    const input = e.target.value.replace('-', '').replace('e', '');
                    onChange(parseInt(input, 10));
                  }}
                  type="number"
                  fullWidth
                  label={t('token.enter-token')}
                  id="outlined-basic"
                  className={classes.noArrowInput}
                />
              )}
              rules={{
                required: tokenRequired,
                validate: (value) => {
                  if (value == null || value.toString().length !== 6) return tokenInvalid;
                  return null;
                },
                min: {
                  value: 0,
                  message: tokenRule,
                },
              }}
            />
            {
              !isLoading && (
              <>
                {isResendingVerificationCode ? (
                  <SpinnerWrapper>
                    <Spinner color="primary" />
                  </SpinnerWrapper>
                ) : (

                  <Resend onClick={handleResendClick}>
                    {t('login.resend')}
                  </Resend>
                )}
              </>
              )
            }

            {isLoading ? (
              <SpinnerWrapper>
                <Spinner color="primary" />
              </SpinnerWrapper>
            ) : (
              <ButtonStyled
                disabled={isResendingVerificationCode}
                type="submit"
              >
                {t('token.continue')}
              </ButtonStyled>
            )}
          </form>
        </div>
      </CardStyle>
    </div>
  );
};

export default Token;
