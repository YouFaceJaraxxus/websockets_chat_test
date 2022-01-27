import { styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';

export const CardStyle = styled('div')(() => ({
  boxShadow: '0 0 15px 0 rgba(0, 0, 0, 0.2)',
  maxWidth: '550px',
  width: '95%',
  margin: '50px auto',
  paddingBottom: '20px',
  paddingTop: '20px',
  textAlign: 'center',
  backgroundColor: 'white',
  borderRadius: '15px',
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

export const useStyles = makeStyles(() => ({
  root: {
    color: 'black',
    '& > div': {
      margin: '10px auto!important',
      width: '95%',
      maxWidth: '500px',
      textAlign: 'center',
      borderRadius: '15px!important',
    },
    '& > div > div': {
      borderRadius: '15px!important',
    },
  },
  h2: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    maxWidth: 'max-content',
    margin: '20px auto',
    gap: '12px',
  },
  holder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100vh',
    height: '100%',
    background: '#E5E5E5',
    padding: '30px 0px',
  },
  p: {
    width: '90%',
    margin: '10px auto',
    '& > a': {
      textDecoration: 'none',
      color: 'black',
      fontWeight: 'bold',
    },
  },
  noArrowInput: {
    '&>div>input': {
      '&[type=number]': {
        '-moz-appearance': 'textfield',
      },
      '&::-webkit-outer-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
      '&::-webkit-inner-spin-button': {
        '-webkit-appearance': 'none',
        margin: 0,
      },
    },
  },
}));

export const LinkStyle = styled('span')(({ theme }) => ({
  color: theme.palette.primary.main,
  textDecoration: 'none',
}));
