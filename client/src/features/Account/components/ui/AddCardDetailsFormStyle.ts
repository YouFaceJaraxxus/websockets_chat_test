import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

export const FormHolderStyled = styled('div')(() => ({
  width: '85%',
  textAlign: 'left',
  backgroundColor: 'white',
  borderRadius: '15px',
  position: 'relative',
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    gap: '20px',
  },
  h2: {
    marginBottom: '0',
  },
  '@media (max-width:950px)': {
    width: '100%',
    margin: '0px auto',
  },
}));

export const ExpirationCvvHolderStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '20px',
}));

export const AddNewCardButtonStyled = styled('button')(({ theme }) => ({
  background: theme.palette.primary.main,
  padding: '1.5% 2%',
  color: 'white',
  border: 'none',
  borderRadius: '15px',
  fontSize: '18px',
  height: '56px',
  maxWidth: '200px',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  fontWeight: 'bold',
  '&:hover': {
    cursor: 'pointer',
    background: theme.palette.primary.dark,
  },
}));

export const CardInputWrapperStyled = styled('div')(({ theme }) => ({
  borderColor: theme.palette.primary.main,
  border: '1px solid grey',
  borderRadius: '15px',
  padding: '15px',
}));

export const InputCardHolderStyled = styled('input')(() => ({
  borderColor: 'grey',
  border: '1px solid grey',
  borderRadius: '15px',
  padding: '15px',
  fontSize: '20px',
  '::placeholder': {
    color: '#bdc3c7',
  },
  ':focus': {
    outline: 'none!important',
    border: '1px inset grey',
  },
}));

export const CardExpiryWrapperStyled = styled('div')(({ theme }) => ({
  width: '50%',
  borderColor: theme.palette.primary.main,
  border: '1px solid grey',
  borderRadius: '15px',
  padding: '15px',
}));

export const CardCvvWrapperStyled = styled('div')(({ theme }) => ({
  width: '50%',
  borderColor: theme.palette.primary.main,
  border: '1px solid grey',
  borderRadius: '15px',
  padding: '15px',
}));

export const TableFormCardSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  position: 'absolute',
  height: '100%',
  background: '#ffffff94',
  borderRadius: '15px',
  zIndex: 1,
}));

export const TableFormCardSpinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10% auto 10% auto',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));

export const NoteHolderStyled = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  margin: '2px 0px',
  fontSize: '16px',
}));
