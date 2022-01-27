import { styled } from '@mui/material/styles';

export const BoxStyle = styled('div')(() => ({
  width: '100%',
  padding: '20px',
  height: '100%',
  minHeight: '100vh',
  background: '#E5E5E5',
}));

export const ComponentsHolder = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  justifyContent: 'space-between',
  gap: '20px',
  backgroundColor: 'white',
  fontSize: '20px',
  padding: '10px 10px',
  border: 'none',
  borderRadius: '16px',
  height: 'auto',
  '@media (max-width: 1080px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

export const UsersHeaderStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '180px',
  width: '100%',
  justifyContent: 'space-between',
  padding: '20px',
  paddingBottom: '0',
  fontWeight: 'bold',
}));

export const UsersHeaderPStyled = styled('p')(() => ({
  margin: '0',
  fontSize: '23px',
}));

export const IconBackground = styled('div')(() => ({
  backgroundColor: '#e9e7ff',
  borderRadius: '50%',
  width: '100%',
  maxWidth: '44px',
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));
