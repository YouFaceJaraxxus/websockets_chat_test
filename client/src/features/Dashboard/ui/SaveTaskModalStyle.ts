import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';

export const SaveTaskInputTitleWrapper = styled('div')(() => ({
  margin: 'auto auto auto 3%',
}));

export const SaveTaskInputTitle = styled('input')(({ theme }) => ({
  border: 'none',
  margin: 'auto auto auto 3%',
  fontWeight: 'bold',
  fontSize: '1.2em',
  fontFamily: theme.typography.fontFamily,
  '&:focus': {
    border: 'none',
    outline: 'none',
  },
  '&:active': {
    border: 'none',
    outline: 'none',
  },
  '&::placeholder': {
    color: theme.palette.text.secondary,
  },
  '@media (max-width:380px)': {
    width: '155px',
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
  margin: 'auto',
  borderRadius: '15px!important',
  color: 'white!important',
  background: theme.palette.primary.dark,
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  '&:hover': {
    background: '#807bab',
  },
  '&:disabled': {
    background: '#807bab',
  },
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

export const CustomSaveTaskDrawer = styled('div')(() => ({
  position: 'absolute',
  top: '0',
  right: '0',
  width: 400,
  height: '100%',
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  outline: 'none',
  '@media (max-width:600px)': {
    width: '90%',
  },
  '@media (max-width:425px)': {
    width: '100%',
  },
}));

export const CustomSaveTaskWrapper = styled('div')(() => ({
  margin: 'auto 0',
  width: '100%',
  maxHeight: '95%',
  overflowT: 'scroll',
  overflowX: 'hidden',
  bgcolor: 'background.paper',
  p: 4,
  outline: 'none',
  borderRadius: '10px',
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
  backgroundColor: 'white',
  padding: '5%',
  border: 'none !important',
  '@media (max-height:730px)': {
    height: '100%',
  },
  '& > form > div > div > div': {
    borderRadius: '15px!important',
  },
  '& > form > div > div > div > div': {
    borderRadius: '15px!important',
  },
}));

export const InputBox = styled(Box)(() => ({
  marginBottom: '20px',
  '@media (max-height:825px)': {
    marginBottom: '15px',
  },
}));

export const AttachmentsHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '2.1% auto',
  position: 'relative',
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

export const AttachTitle = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 700,
  margin: 'auto auto auto 4%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const InputFileStyle = styled('input')(() => ({
  display: 'none',
}));

export const InputLabelStyle = styled('label')(() => ({
  opacity: '0',
  left: 0,
  top: 0,
  width: '100%',
  position: 'absolute',
  height: '25px',
  zIndex: 10,
  cursor: 'pointer',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const UploadTitle = styled('span')(() => ({
  display: 'flex',
  margin: 'auto 0 auto auto',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const UploadTitleText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  whiteSpace: 'nowrap',
  position: 'relative',
  right: '20%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const AttachmentsList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: 'auto 0 3% 0',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

export const AttachmentsListItem = styled('span')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  overflowX: 'scroll',
  overflowY: 'hidden',
  scrollbarColor: 'white white',
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    backgroundColor: 'none',
    width: 0,
    height: 0,
    opacity: 0,
  },
  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
    backgroundColor: 'white',
    opacity: 0,
  },
  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: 'white',
                opacity: 0,
              },
  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: 'white',
                opacity: 0,
              },
  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: 'white',
                opacity: 0,
              },
  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
    backgroundColor: 'white',
    opacity: 0,
  },
}));

export const AttachmentsListItemText = styled('span')(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontFamily: theme.typography.fontFamily,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  whiteSpace: 'nowrap',
  width: '70%',
  overflowX: 'scroll',
  overflowY: 'hidden',
  margin: '0 0 0 0',
}));

export const useStyles = makeStyles(() => ({
  errorText: {
    color: '#D32F2F !important',
  },
  titleWrapper: {
    border: 'none',
    margin: 'auto auto auto 3%',
    fontWeight: 'bold',
    fontSize: '1.2em',
  },
  select: {
    '& ul': {
      maxHeight: 200,
      overflowY: 'scroll',
      overflowX: 'hidden',
      borderTopRightRadius: '5px',
      borderBottomRightRadius: '5px',
    },
  },
}));

const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  width: '100%',
  overflow: 'hidden',
}));

export const CreatingSpinnerWrapper = styled(SpinnerWrapper)(() => ({
  justifyContent: 'center',
  margin: '0 auto 5% 0',
}));

export const DeletingSpinnerWrapper = styled(SpinnerWrapper)(() => ({
  justifyContent: 'flex-start',
  margin: '0 auto 0 0',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
}));
