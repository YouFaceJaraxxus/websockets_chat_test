import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const AddProfilePicture = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ButtonStyled = styled('button')(() => ({
  width: '95%',
  maxWidth: '500px',
  padding: '12px',
  marginTop: '10px',
  borderRadius: '15px',
  color: 'white',
  background: '#221F40',
  fontSize: '16px',
  fontWeight: 'bold',
  textTransform: 'inherit',
  border: 'none',
  '&:hover': {
    cursor: 'pointer',
  },
  '&:disabled': {
    background: 'grey',
    cursor: 'not-allowed',
  },
}));

export const InputFileStyle = styled('input')(() => ({
  display: 'none',
}));

export const InputLabelStyle = styled('label')(() => ({
  opacity: '0',
  width: '100%',
  position: 'absolute',
  height: '40px',
  maxWidth: '320px',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const PictureText = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  overflow: 'hidden',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0 auto 0 auto',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));
