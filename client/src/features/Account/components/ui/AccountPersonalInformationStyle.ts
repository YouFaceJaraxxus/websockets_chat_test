import { CircularProgress } from '@mui/material';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

export const PersonalInformationWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  height: '100%',
  marginTop: '20px',
  '@media (max-width: 1080px)': {
    flexDirection: 'column',
  },
  overflowY: 'scroll',
  overflowX: 'hidden',
}));

export const FormWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: '0 5% 0 0',
  width: '45%',
  '@media (max-width: 1080px)': {
    width: '90%',
  },
}));

export const CustomForm = styled('form')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  margin: '10px 0 0 auto',
}));

export const CustomInputBox = styled('div')(() => ({
  marginBottom: '20px',
  width: '100%',
  '&  div': {
    borderRadius: '15px!important',
  },
}));

export const YourPassword = styled('div')(({ theme }) => ({
  marginBottom: '15px',
  marginTop: '40px',
  width: '100%',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
  fontWeight: 'bolder',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  borderRadius: '10px!important',
  color: 'white!important',
  height: '50px',
  background: theme.palette.primary.dark,
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  '&:hover': {
    background: '#4e497a',
  },
  '&:disabled': {
    background: '#4e497a',
  },
}));

export const RightPartWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0',
  width: '50%',
  height: '100%',
  minHeight: '590px',
  '@media (max-width: 1080px)': {
    display: 'none',
  },
}));

export const Picture = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0 auto auto 0',
  paddingTop: '1%',
  paddingLeft: '20%',
  '&:hover': {
    opacity: '0.8',
    cursor: 'pointer',
  },
  '@media (max-width: 1080px)': {
    margin: 'auto',
    paddingTop: '0',
    paddingLeft: '0',
    width: '100%',
    marginTop: '20px',
    justifyContent: 'center',
  },
}));

export const PictureText = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  '@media (max-width: 400px)': {
    fontSize: '0.8em',
  },
}));

export const Delete = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: 'auto auto 0 0',
  paddingBottom: '1%',
  paddingLeft: '25%',
  '&:hover': {
    opacity: '0.8',
    cursor: 'pointer',
  },
  '@media (max-width: 1080px)': {
    margin: 'auto',
    paddingTop: '0',
    paddingLeft: '0',
    width: '100%',
    marginTop: '20px',
    justifyContent: 'center',
  },
}));

export const DeleteText = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.error.main,
  fontWeight: 'bold',
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

export const InputFileStyle = styled('input')(() => ({
  display: 'none',
}));

export const InputLabelStyle = styled('label')(() => ({
  width: '100%',
  position: 'absolute',
  height: '40px',
  maxWidth: '320px',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: 'auto auto 0 auto',
  width: '100%',
  overflow: 'hidden',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: 'auto auto 0 auto',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));

export const ResponsiveDelete = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  '@media (min-width: 1081px)': {
    display: 'none',
  },
}));
