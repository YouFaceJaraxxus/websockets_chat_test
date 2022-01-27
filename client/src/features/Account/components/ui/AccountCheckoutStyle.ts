import { styled } from '@mui/material/styles';

export const AccountCheckoutWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 'auto',
  width: '100%',
}));

export const AccountPlanTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bolder',
  fontSize: '1.2em',
}));
