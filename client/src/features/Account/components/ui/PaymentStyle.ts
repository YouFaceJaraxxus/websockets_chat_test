import { styled } from '@mui/material/styles';

export const PaymentHolderStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  background: 'white',
}));

export const CardStylePaymentStyled = styled('div')(() => ({
  width: '100%',
  margin: '0px auto',
  textAlign: 'center',
  borderRadius: '15px',
}));

export const AddonsWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

export const PaymentTabsHolderStyled = styled('p')(() => ({
  '.MuiTabs-flexContainer': {
    justifyContent: 'flex-start',
  },
  '.MuiTab-root': {
    borderBottom: '3px solid #948CFC',
  },
  '.Mui-selected': {
    background: '#948CFC',
    color: 'white!important',
    borderTopRightRadius: '16px',
    borderTopLeftRadius: '16px',
    fontWeight: 'bold',
    textTransform: 'inherit',
    fontSize: '20px',
    '&:hover': {
      cursor: 'auto',
    },
  },
  '.MuiTouchRipple-root': {
    display: 'none',
  },
}));

export const PaymentOptionsHolderStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-around',
  gap: '15px',
  '.active': {
    outlineOffset: '-4px',
    outline: '5px solid',
    outlineColor: theme.palette.primary.main,
    cursor: 'pointer',
    borderRadius: '16px',
    transition: '0.2s',
    boxShadow: '0px 0px 12px 2px silver',
  },
}));

export const ButtonCheckoutStyled = styled('button')(({ theme }) => ({
  background: theme.palette.primary.dark,
  padding: '1.5% 2%',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  fontSize: '18px',
  margin: '5% auto',
  maxWidth: '250px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '60px',
  '&:hover': {
    cursor: 'pointer',
  },
  '&:disabled': {
    background: 'grey',
    cursor: 'not-allowed',
  },
}));

export const ButtonCheckoutDisabledStyled = styled('button')(() => ({
  background: 'grey',
  padding: '1.5% 2%',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  fontSize: '18px',
  margin: '5% auto',
  maxWidth: '250px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: '60px',
  '&:hover': {
    cursor: 'pointer',
  },
}));
