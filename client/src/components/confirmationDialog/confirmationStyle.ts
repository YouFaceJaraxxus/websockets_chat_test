import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IButton {
  isfetching: boolean;
}

const ConfirmButton = styled('button')<IButton>(({ isfetching = false }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'space-between',
  color: 'white',
  maxWidth: '180px',
  width: '100%',
  borderRadius: '16px',
  fontSize: '19px',
  padding: isfetching ? '0px' : '10px',
  cursor: 'pointer',
  '&:disabled': {
    opacity: 0.8,
    cursor: 'not-allowed',
  },
  '&:hover': {
    opacity: 0.8,
  },
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

export const ButtonDeleteStyle = styled(ConfirmButton)(() => ({
  backgroundColor: '#FF3A4F',
  border: '1px solid #FF3A4F',
}));

export const ButtonGreenStyle = styled(ConfirmButton)(() => ({
  backgroundColor: '#2ECC71',
  border: '1px solid #2ECC71',
}));

export const ButtonOrangeStyle = styled(ConfirmButton)(() => ({
  backgroundColor: '#FF6A00',
  border: '1px solid #FF6A00',
}));

export const ButtonCancelStyle = styled('button')(() => ({
  backgroundColor: 'white',
  color: 'black',
  maxWidth: '160px',
  width: '100%',
  borderRadius: '16px',
  fontSize: '19px',
  padding: '10px',
  border: '1px solid black',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  },
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

const IconStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '12px',
  height: '60px',
  width: '60px',
  borderRadius: '50%',
  margin: '5% auto',
}));

export const IconRedStyle = styled(IconStyle)(() => ({
  backgroundColor: '#ffe0e0',
}));

export const IconGreenStyle = styled(IconStyle)(() => ({
  backgroundColor: '#c5f7da',
}));

export const IconOrangeStyle = styled(IconStyle)(() => ({
  backgroundColor: '#ffdec6',
}));

export const IconPrimaryStyle = styled(IconStyle)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.contrastText,
}));

export const InputValidationWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '90%',
  margin: 'auto',
  '&> div > div': {
    borderRadius: '15px !important',
  },
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const ConfirmButtonText = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '80%',
}));

export const FetchingSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  margin: '0 0 0 10%',
  width: '20%',
  overflow: 'hidden',
}));

export const FetchingSpinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  '& > svg': {
    maxHeight: '3vh',
  },
}));
