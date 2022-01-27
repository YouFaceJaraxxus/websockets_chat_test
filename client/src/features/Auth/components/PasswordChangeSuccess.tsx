import React from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import {
  PasswordChangeSuccessWrapper,
  PasswordChangeSuccessTitle,
  PasswordChangeSuccessImageWrapper,
  PasswordChangeSuccessButton,
} from '../ui/PasswordChangeSuccessStyle';
import passwordChanged from '../../../assets/icons/passwordChangedSuccessfullyImage.png';
import { LOGIN_PATH } from '../../../routes/path-constants';
import { LogoIcon } from '../../../assets/icons';
import { useStyles } from '../ui/style';

const PasswordChangeSuccess = () => {
  const { t } = useTranslation();
  const history = useHistory();
  const { holder } = useStyles();
  return (
    <div className={holder}>
      <LogoIcon />
      <PasswordChangeSuccessWrapper>
        <PasswordChangeSuccessTitle>
          {t('password.password-successfully')}
        </PasswordChangeSuccessTitle>
        <PasswordChangeSuccessImageWrapper>
          <img src={passwordChanged} alt="Password changed" />
        </PasswordChangeSuccessImageWrapper>
        <PasswordChangeSuccessButton onClick={() => { history.push(LOGIN_PATH); }}>
          {t('password.log-in')}
        </PasswordChangeSuccessButton>
      </PasswordChangeSuccessWrapper>
    </div>

  );
};

export default PasswordChangeSuccess;
