import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

export const CustomNotificationsWrapper = styled('div')(() => ({
  position: 'absolute',
  top: '1%',
  right: '1%',
  width: 500,
  maxHeight: '50vh',
  overflowX: 'hidden',
  overflowY: 'scroll',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
  backgroundColor: 'white',
  outline: 'none',
  padding: '2%',
  '@media (max-width:520px)': {
    width: '90%',
    padding: '4%',
  },
  '@media (min-width:1024px)': {
    padding: '1.2%',
  },
  '@media (min-width:1440px)': {
    padding: '1%',
  },
  '@media (min-width:1800px)': {
    padding: '0.5%',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

export const TitleWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '3% 0 3% 3%',
  width: '100%',
}));

export const TitleText = styled('span')(({ theme }) => ({
  border: 'none',
  margin: 'auto auto auto 6%',
  fontWeight: 'bolder',
  fontSize: '1.3em',
  fontFamily: theme.typography.fontFamily,
  position: 'relative',
}));

export const TitleIconTextWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginRight: 'auto',
}));

export const NotificationsList = styled('div')(() => ({
  width: '100%',
  padding: '1%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20% auto 0 auto',
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

export const NoNotifications = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5%',
  width: '100%',
  height: '100%',
  fontWeight: 'bolder',
  fontSize: '1.2em',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));
