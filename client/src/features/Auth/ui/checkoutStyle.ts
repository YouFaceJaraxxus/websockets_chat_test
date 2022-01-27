import { styled } from '@mui/material/styles';

export const CheckoutTitleStyled = styled('h2')(() => ({
  fontWeight: 'bold',
  fontSize: '40px',
  marginBottom: '0',
}));

export const CheckoutHolderStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  minHeight: '100vh',
  height: '100%',
  background: 'white',
  padding: '30px 0px',
  position: 'relative',
  '.MuiOutlinedInput-root': {
    borderRadius: '15px',
  },
}));

export const CardOrderHolderStyled = styled('div')(() => ({
  maxWidth: '1440px',
  width: '95%',
  margin: '20px auto',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'flex-start',
  '@media (max-width:850px)': {
    flexDirection: 'column',
  },
}));

export const CardInfoRegisterCheckoutCol = styled('div')(() => ({
  margin: '50px auto',
  padding: '20px',
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  '@media (max-width:850px)': {
    width: '90%',
    marginBottom: '0px',
  },
}));
