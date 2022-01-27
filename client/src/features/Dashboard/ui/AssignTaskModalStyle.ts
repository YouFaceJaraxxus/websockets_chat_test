import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { CircularProgress } from '@mui/material';

export const CustomAssignTaskWrapper = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: 270,
  overflow: 'auto',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
  backgroundColor: 'white',
  padding: '3%',
  outline: 'none',
  '@media (max-width:600px)': {
    width: '75%',
    height: 'auto',
    padding: '4%',
  },
  '@media (min-width:1024px)': {
    padding: '2%',
  },
  '@media (min-width:1440px)': {
    padding: '2%',
  },
  '@media (min-width:1800px)': {
    padding: '1.5%',
  },
  '@media (min-width:2200px)': {
    padding: '1%',
  },
  '& > form > div > div > div': {
    borderRadius: '15px!important',
  },
  '& > form > div > div > div > div': {
    borderRadius: '15px!important',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

export const TitleWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 0 3% 0',
  width: '100%',
}));

export const TitleText = styled('span')(({ theme }) => ({
  border: 'none',
  margin: 'auto auto auto 3%',
  fontWeight: 'bolder',
  fontSize: '1.3em',
  fontFamily: theme.typography.fontFamily,
}));

export const TitleIconTextWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginRight: 'auto',
  width: '80%',
}));

export const AssignTaskHeader = styled('div')(({ theme }) => ({
  color: theme.palette.primary.dark,
}));

export const AutocompleteWrapper = styled('div')(() => ({
  width: '100%',
  margin: '1% auto 20% auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div > div > ul': {
    maxHeight: '120px',
  },
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  width: '100%',
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

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '20% auto 0 auto',
  width: '100%',
  overflow: 'hidden',
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
