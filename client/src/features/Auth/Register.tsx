import React, { FC } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { ButtonStyled, CardStyle, LinkStyle, useStyles } from './ui/style';
import { AcceptBox, AcceptTermsError, AcceptWrapper, Spinner, SpinnerWrapper } from './ui/RegisterStyle';
import login from '../../assets/icons/login.svg';
import logo from '../../assets/icons/logo.svg';
import { IUserRegister } from './models/forms/model';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { registerUserAsync } from './slices/authSlice';
import { IUser } from './models/user/user';
import { DASHBOARD_PATH, TOKEN_PATH } from '../../routes/path-constants';
import { emailRegex } from '../../common/util';
import { openNotification } from '../../components/notifications/model/globalNotificationSlice';

const Register: FC = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { t } = useTranslation();
  const { handleSubmit, control, getValues } = useForm<IUserRegister>();

  const emailRequired = t('login.email-required');
  const passwordRequired = t('login.password-required');
  const confirmNoMatch = t('login.password-no-match');
  const acceptTermsRequired = t('login.accept-terms-required');
  const { root, h2, holder, p } = useStyles();

  const onSubmit = (userData) => {
    const registerBody = { ...userData } as IUserRegister;
    delete registerBody.checkbox;
    dispatch(registerUserAsync(registerBody)).then((response) => {
      if (response.payload != null) {
        const user = response.payload as IUser;
        if (!user.verified) {
          dispatch(openNotification({
            isOpen: true,
            messageBody: t('login.registration-successful'),
            severity: 'success',
          }));
          history.push(TOKEN_PATH);
        } else {
          history.push(DASHBOARD_PATH);
        }
      }
    });
  };

  return (
    <div className={holder}>
      <img src={logo} alt="Register" />
      <CardStyle>
        <div>
          <form
            className={root}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h2 className={h2}>
              <img src={login} alt="Register" />
              {t('login.register')}
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
                  type="password"
                  fullWidth
                  label={t('login.password')}
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
                  label={t('login.confirm-password')}
                  id="outlined-basic"
                />
              )}
              rules={{
                required: passwordRequired,
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

            <Controller
              name="checkbox"
              control={control}
              defaultValue={false}
              render={({
                field: { onChange, value },
                fieldState: { error },
              }) => (
                <AcceptWrapper>
                  <AcceptBox>
                    <Checkbox
                      value={value}
                      onChange={onChange}
                    />
                    <Typography component="p">
                      {t('login.accept')}
                      &nbsp;
                      <a
                        href="https://stackbites.com/terms-of-service/"
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <LinkStyle>
                          {t('login.terms-of-service')}
                          &nbsp;
                        </LinkStyle>
                      </a>
                      {t('login.and')}
                      &nbsp;
                      <a
                        href="https://stackbites.com/privacy-policy/"
                        target="_blank"
                        rel="noreferrer"
                        style={{ textDecoration: 'none' }}
                      >
                        <LinkStyle>{t('login.privacy-policy')}</LinkStyle>
                      </a>
                    </Typography>
                  </AcceptBox>
                  {error && (
                    <AcceptTermsError>{error.message}</AcceptTermsError>
                  )}
                </AcceptWrapper>
              )}
              rules={{
                required: acceptTermsRequired,
              }}
            />
            {
              isLoading ?
                (
                  <SpinnerWrapper>
                    <Spinner color="primary" />
                  </SpinnerWrapper>
                )
                : (
                  <ButtonStyled type="submit">
                    {t('login.register')}
                  </ButtonStyled>
                )
          }
          </form>
          <p className={p}>
            {t('login.already-have-account')}
            &nbsp;
            <Link to="/login">{t('login.log-in')}</Link>
          </p>
        </div>
      </CardStyle>
    </div>
  );
};

export default Register;
