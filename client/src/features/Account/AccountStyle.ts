import { styled } from '@mui/material/styles';

export const BoxStyle = styled('div')(() => ({
  width: '100%',
  padding: '20px',
  height: '100%',
  minHeight: '100vh',
  background: '#E5E5E5',
  '.Mui-selected': {
    fontWeight: 'bold',
  },
}));

export const ComponentsHolder = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  justifyContent: 'space-between',
  gap: '20px',
  backgroundColor: 'white',
  fontSize: '20px',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '16px',
  height: 'auto',
  '@media (max-width: 1080px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
  '.MuiTabPanel-root': {
    padding: '10px 0px',
  },
}));

export const AccountHeaderStyled = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  maxWidth: '250px',
  width: '100%',
  justifyContent: 'flex-start',
  paddingTop: '10px',
  fontWeight: 'bold',
}));

export const AccountHeaderPStyled = styled('p')(() => ({
  margin: '0',
  marginLeft: '20px',
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
