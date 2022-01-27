import { styled } from '@mui/material/styles';

interface WrapperStyle {
  type?: string;
}

export const CompletePaymentDetailsHolderStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 'auto',
  width: '100%',
  '@media (max-width:950px)': {
    flexDirection: 'column',
  },
}));

export const AccountPaymentDetailsWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<WrapperStyle>(({ type = 'multi' }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: '0',
  maxWidth: type === 'multi' ? '600px' : '700px',
  width: type === 'multi' ? '50%' : '60%',
  marginRight: '5%',
  ...(type === 'single' && { '@media (max-width:800px)': {
    width: '100%',
    maxWidth: '100%',
  } }),
  '@media (max-width:950px)': {
    width: '90%',
    margin: '0px auto',
  },
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
