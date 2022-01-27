import { styled } from '@mui/material/styles';

export const RootStyle = styled('div')(({ theme }) => ({
  boxShadow: 'initial',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  margin: '10px',
  width: 'maxWidth',
  color: 'black',
  backgroundColor: '#fffffff',
  borderRadius: 15,
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-around',
  minHeight: '80vh',
  '& > a': {
    textDecoration: 'none',
  },
}));

export const BackHomeStyle = styled('div')(() => ({
  background: '#221F40',
  color: 'white',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '180px',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  '&:hover': {
    cursor: 'pointer',
    background: '#4e497a',
  },
}));

export const StatusCodeStyle = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '80px',
  fontWeight: 'bold',
}));

export const ErrorStyle = styled('div')(() => ({
  color: '#000',
  fontSize: '40px',
  fontWeight: 'bold',
}));

export const ErrorIconStyle = styled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '40px',
  fontWeight: 'bold',
}));
