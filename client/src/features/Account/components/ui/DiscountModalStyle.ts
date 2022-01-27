import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const CustomDiscountModalWrapper = styled('div')(() => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height: 250,
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
    fontSize: '0.7em',
  },
  '@media (max-width:400px)': {
    fontSize: '0.6em',
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

export const TitleIconTextWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
}));

export const InputWrapper = styled('div')(() => ({
  width: '100%',
  margin: '1% auto 6% auto',
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
    background: '#4e497a',
  },
  '&:disabled': {
    background: '#4e497a',
  },
}));

export const TitleText = styled('div')(({ theme }) => ({
  border: 'none',
  fontWeight: 'bolder',
  fontSize: '1.3em',
  fontFamily: theme.typography.fontFamily,
  position: 'relative',
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  maxWidth: '100px',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
    opacity: '0.8',
  },
}));
