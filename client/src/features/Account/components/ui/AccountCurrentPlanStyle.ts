import { CircularProgress } from '@material-ui/core';
import { styled } from '@mui/material/styles';

export const CurrentPlanWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 'auto',
  width: '100%',
  maxHeight: '65vh',
  overflowX: 'hidden',
  overflowY: 'scroll',
}));

export const NoSubscriptions = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5%',
  width: '100%',
  height: '100%',
  fontWeight: 'bolder',
  fontSize: '1.5em',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));

export const SubscriptionItem = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
}));

export const SubscriptionWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  padding: '1% 0.5% 1% 2%',
  width: '50%',
  border: '1px solid #dddddd',
  marginTop: '20px',
  borderRadius: '15px',
  '@media (max-width:1080px)': {
    width: '70%',
  },
  '@media (max-width:650px)': {
    width: '95%',
  },
}));

export const SubscriptionRow = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  width: '100%',
}));

export const SubscriptionTitle = styled('span')(({ theme }) => ({
  width: '80%',
  fontWeight: 'bolder',
  fontSize: '1.1em',
  fontFamily: theme.typography.fontFamily,
  margin: '0 auto 0 0',
  wordBreak: 'break-word',
  paddingTop: '2%',
  '@media (max-width:500px)': {
    width: '100%',
    margin: '0 auto 0 0',
  },
}));

export const SubscriptionStatus = styled('span')(({ theme }) => ({
  width: '15%',
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: '#2ECC71',
  margin: '0 0 0 auto',
  paddingTop: '10px',
  fontSize: '0.9em',
  '@media (max-width:650px)': {
    margin: '0',
  },
  '@media (max-width:500px)': {
    width: '100%',
    margin: '0 auto 0 0',
  },
}));

export const SubscriptionsTasksLeft = styled('span')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '50%',
  margin: 'suto',
}));

export const TasksLeftText = styled('span')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.primary.main,
  fontSize: '0.8em',
}));

export const SubscriptionType = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '50%',
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.primary.main,
  fontSize: '0.8em',
  margin: 'auto 1% auto auto',
  height: '100%',
  textAlign: 'right',
}));
export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
    opacity: '0.8',
  },
}));

export const CancelSubscription = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  marginTop: '10px',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
}));

export const CancelSubscriptionText = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: '#FF3A4F',
  fontSize: '0.8em',
}));

export const CanceledSubscriptionNote = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: '#FF3A4F',
  fontSize: '0.8em',
}));

export const AddOnTitle = styled('span')(({ theme }) => ({
  width: '100%',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  padding: '4% 0',
}));

const CustomButton = styled('button')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '25%',
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  color: 'white',
  backgroundColor: theme.palette.primary.main,
  padding: '20px 0',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
  marginTop: '20px',
  fontSize: '0.9em',
  borderRadius: '15px',
  '&:disabled': {
    opacity: 0.6,
    cursor: 'not-allowed',
  },
  outline: 'none',
  borderWidth: 0,
  '@media (max-width:650px)': {
    width: '95%',
  },
}));

export const ChangePlanButton = styled(CustomButton)(() => ({
}));

export const ChangePlanDisabledButton = styled(CustomButton)(() => ({
  opacity: 0.6,
  '&:hover': {
    opacity: 0.6,
    cursor: 'initial',
  },
}));

export const RetryPayment = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '50%',
  marginTop: '10px',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
  '@media (max-width:1080px)': {
    width: '70%',
  },
  '@media (max-width:650px)': {
    width: '100%',
  },
}));

export const RetryPaymentInfo = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '60%',
  backgroundColor: '#FFE3E4',
  padding: '4%',
  borderRadius: '15px',
}));

export const RetryPaymentText = styled('span')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.8em',
}));

export const RetryPaymentAction = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  width: '40%',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
  padding: '2%',
}));

export const RetryPaymentButtonText = styled('span')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: '0 0 0 1%',
  fontWeight: 'bolder',
  fontSize: '0.9em',
  fontFamily: theme.typography.fontFamily,
}));

export const RetrySubscriptionSpinner = styled(CircularProgress)(() => ({
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
