import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const CardStyle = styled('div')(() => ({
  boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)',
  maxWidth: '550px',
  width: '95%',
  margin: '50px auto',
  paddingBottom: '20px',
  paddingTop: '20px',
  textAlign: 'center',
  backgroundColor: 'white',
  borderRadius: '15px',
}));

export const useStyles = makeStyles(() => ({
  root: {
    '& > div': {
      margin: '10px auto!important',
      width: '95%',
      maxWidth: '500px',
      textAlign: 'center',
      borderRadius: '15px!important',
    },
    '& > div > div': {
      borderRadius: '15px!important',
    },
  },
  button: {
    width: '95%',
    maxWidth: '500px',
    padding: '12px!important',
    marginTop: '10px!important',
    borderRadius: '15px!important',
  },
  h2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    width: '100%',
    margin: '20px auto',
  },
  p: {
    textAlign: 'left',
    width: '90%',
    margin: '10px auto',
    '& > a': {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  holder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    background: '#E5E5E5',
    padding: '30px 0px',
  },
  backToLogin: {
    width: '90%',
    margin: '20px auto 5px auto',
    '& > a': {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 'bold',
    },
    '&:hover': {
      opacity: '0.5',
      cursor: 'pointer',
    },
  },
}));

export const Resend = styled('p')(({ theme }) => ({
  width: '90%',
  margin: '5px auto 0 auto',
  color: theme.palette.primary.main,
  padding: '2.5%',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  '&:hover': {
    opacity: '0.5',
    cursor: 'pointer',
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  width: '90%',
  margin: 'auto',
  borderRadius: '15px!important',
  color: 'white!important',
  padding: '2.5%',
  marginTop: '2%',
  background: theme.palette.primary.dark,
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  '&:hover': {
    background: '#4e497a',
  },
  '&:disabled': {
    background: '#4e497a',
  },
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10% auto 10% auto',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
