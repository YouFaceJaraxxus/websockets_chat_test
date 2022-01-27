import { styled } from '@mui/material/styles';

export const PaymentOptionStyled = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  maxWidth: '350px',
  width: '100%',
  justifyContent: 'flex-start',
  paddingBottom: '2%',
  height: '100%',
  boxSizing: 'border-box',
  minHeight: '560px',
  button: {
    maxWidth: '200px',
    width: '100%',
    margin: '0px auto',
    alignSelf: 'bottom',
    borderRadius: '12px',
    textTransform: 'inherit',
    fontWeight: 'bold',
    marginTop: 'auto',
    padding: '14px 0px',
    fontSize: '16px',
  },
  '&:hover': {
    outlineOffset: '-4px',
    outline: '4px solid',
    outlineColor: theme.palette.primary.main,
    cursor: 'pointer',
    borderRadius: '16px',
    transition: '0.2s',
    boxShadow: '0px 0px 12px 2px silver',
  },
}));

export const OptionPriceStyled = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  fontSize: '36px',
  margin: '10px 0px',
  textDecoration: 'underline',
}));

export const OptionNameStyled = styled('p')(() => ({
  fontWeight: 'bold',
  fontSize: '32px',
  margin: '0px auto',
  maxWidth: '90%',
}));

export const OptionImageHolderStyled = styled('p')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

export const OptionValuesHolderStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  maxWidth: '300px',
  textAlign: 'left',
  gap: '10px',
  margin: '5px auto',
  width: '90%',
  p: {
    margin: '0',
  },
}));
