import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ProcessWrapper = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  overflow: 'auto',
  borderRadius: '10px',
  backgroundColor: '#fafafa',
  padding: '3%',
  '@media (max-width:600px)': {
    width: '90%',
    padding: '5%',
  },
  '@media (min-width:1024px)': {
    padding: '2.5%',
  },
  '@media (min-width:1440px)': {
    padding: '2%',
  },
  '@media (min-width:1800px)': {
    padding: '1.5%',
  },
  '@media (min-width:2200px)': {
    padding: '1%',
  },
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '5% auto 5% auto',
  width: '100%',
  overflow: 'hidden',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
}));

export const Message = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
  textAlign: 'center',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  margin: 'auto',
  fontSize: '1.5em',
}));
