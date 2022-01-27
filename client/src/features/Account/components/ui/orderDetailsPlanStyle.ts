import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

export const OrderDetailsHolder = styled('div')(() => ({
  maxWidth: '650px',
  width: '70%',
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: '15px',
  position: 'relative',
  margin: '0',
  '@media (max-width:950px)': {
    width: '100%',
    margin: '10px auto',
  },
}));

export const DiscountCodeHolderStyled = styled('div')(() => ({
  fontWeight: 'bold',
  fontSize: '16px',
  margin: '20px auto',
  width: '90%',
  '.MuiOutlinedInput-root': {
    borderRadius: '15px',
  },
}));

export const ButtonApplyCodeStyled = styled('button')(({ theme }) => ({
  background: theme.palette.primary.dark,
  padding: '1.5% 2%',
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
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ButtonBackSolutionsStyled = styled('button')(({ theme }) => ({
  background: 'white',
  padding: '1.5% 2%',
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
  fontWeight: 'bold',
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
  width: '90%',
}));

export const TotalMoneyStyled = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

export const ButtonRemoveStyled = styled('button')(() => ({
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
  top: '10%',
  borderRadius: '15px',
  zIndex: 111,
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
