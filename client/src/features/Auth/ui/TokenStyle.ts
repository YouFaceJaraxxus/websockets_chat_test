import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Resend = styled('p')(({ theme }) => ({
  width: '90%',
  margin: '0 auto 0 auto',
  color: theme.palette.primary.main,
  padding: '2.5%',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  '&:hover': {
    opacity: '0.5',
    cursor: 'pointer',
  },
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  overflow: 'hidden',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto 0 auto',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));
