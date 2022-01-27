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
  padding: '30px 0px',
}));

export const CardStylePaymentStyled = styled('div')(() => ({
  maxWidth: '1200px',
  width: '95%',
  margin: '20px auto',
  paddingBottom: '20px',
  textAlign: 'center',
  borderRadius: '15px',
}));

export const PaymentHeaderStyled = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '5% auto',
}));

export const PaymentTitleStyled = styled('h2')(() => ({
  fontSize: '42px',
  marginTop: '0',
}));

export const PaymentTextStyled = styled('p')(() => ({
  fontSize: '16px',
  maxWidth: '900px',
  margin: '0px auto',
}));

export const PaymentTabsHolderStyled = styled('div')(() => ({
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
  maxWidth: '1200px',
  justifyContent: 'space-around',
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

export const TableStyled = styled('table')(({ theme }) => ({
  borderCollapse: 'collapse',
  width: '100%',
  'td + td': {
    borderLeft: '1px solid silver',
    padding: '2%',
    '@media (max-width:850px)': {
      svg: {
        width: '20px',
      },
    },
  },
  'th + th': {
    borderLeft: '1px solid silver',
    color: theme.palette.primary.main,
    padding: '2%',
    width: '20%',
    fontSize: '24px',
    '@media (max-width:850px)': {
      fontSize: '18px',
    },
  },
  'tr + tr': {
    borderTop: '1px solid silver',
    padding: '2%',
    width: '20%',
  },
  '@media (max-width:850px)': {
    fontSize: '16px',
  },
}));

export const TableTdStyled = styled('td')(() => ({
  textAlign: 'left',
  width: '20%',
  fontSize: '20px',
  '@media (max-width:850px)': {
    fontSize: '14px',
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
  maxWidth: '270px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontWeight: 'bold',
  height: '60px',
  '&:hover': {
    cursor: 'pointer',
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
  maxWidth: '270px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontWeight: 'bold',
  height: '60px',
  '&:hover': {
    cursor: 'pointer',
  },
}));
