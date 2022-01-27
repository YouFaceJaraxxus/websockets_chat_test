import { styled } from '@mui/material/styles';

export const PasswordChangeSuccessWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '5% auto 5% auto',
  width: '100%',
  height: '100%',
}));

export const PasswordChangeSuccessTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bolder',
  fontSize: '1.8em',
}));

export const PasswordChangeSuccessImageWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '50%',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bolder',
  fontSize: '1.8em',
  marginTop: '30px',
  marginBottom: '45px',
}));

export const PasswordChangeSuccessButton = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '45%',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  color: 'white',
  backgroundColor: theme.palette.primary.dark,
  padding: '1.5%',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
  fontSize: '0.8em',
  borderRadius: '15px',
}));
