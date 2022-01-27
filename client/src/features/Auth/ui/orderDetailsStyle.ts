import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

interface IOrderDetailsHolder {
  type?: string;
}

export const OrderDetailsHolder = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IOrderDetailsHolder>(({ type = 'account' }) => ({
  maxWidth: '650px',
  width: '100%',
  margin: type === 'account' ? '50px auto' : '0',
  padding: type === 'account' ? '20px' : '0',
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: '15px',
  '@media (max-width:850px)': {
    maxWidth: '90%',
    marginTop: '10px',
  },
}));

export const DiscountCodeHolderStyled = styled('div')(() => ({
  fontWeight: 'bold',
  fontSize: '16px',
  margin: '20px auto',
  marginRight: '0',
  width: '90%',
  input: {
    borderRadius: '15px',
  },
  '@media (max-width:850px)': {
    margin: '0px',
    width: '100%',
  },
}));

export const ButtonApplyCodeStyled = styled('button')(({ theme }) => ({
  background: theme.palette.primary.dark,
  padding: '1.5% 2%',
  fontWeight: 'bold',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  fontSize: '18px',
  height: '56px',
  maxWidth: '200px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ButtonBackSolutionsStyled = styled('button')(({ theme }) => ({
  background: 'white',
  padding: '1.5% 2%',
  fontWeight: 'bold',
  color: theme.palette.primary.dark,
  border: '1px solid',
  borderColor: theme.palette.primary.dark,
  borderRadius: '15px',
  fontSize: '18px',
  height: '56px',
  maxWidth: '200px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
    background: theme.palette.primary.dark,
    color: 'white',
  },
  '&:hover a': {
    color: 'white',
  },
  a: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: theme.palette.primary.dark,
  },
}));

export const ButtonsOrderHolderStyled = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '20px',
  marginTop: '40px',
}));

export const OrderDetailsHolderStyled = styled('div')(() => ({
  margin: '20px auto',
  marginRight: '0',
  width: '90%',
  '@media (max-width:850px)': {
    margin: '0px',
    width: '100%',
  },
}));

export const TotalMoneyStyled = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  display: 'inline-flex',
  justifyContent: 'right',
  alignItems: 'center',
}));

export const ButtonRemoveStyled = styled('div')(() => ({
  color: 'black',
  fontWeight: 'bold',
  border: '1px solid black',
  borderRadius: '50%',
  width: '20px',
  height: '20px',
  background: 'none',
  position: 'relative',
  right: '-15px',
  textAlign: 'center',
  padding: '0',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const TableFormCardSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  position: 'absolute',
  height: '100%',
  background: '#ffffff94',
  top: '0',
  left: '0',
  borderRadius: '15px',
  zIndex: 111,
  overflow: 'hidden',
}));

export const TableFormCardSpinner = styled(CircularProgress)(() => ({
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

export const IconHolderStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'end',
  gap: '10px',
  svg: {
    width: '24px',
    height: '24px',
  },
}));
