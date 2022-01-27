import { styled } from '@mui/material/styles';

interface IconBackground {
  backColor?: any;
}

export const BoxStyle = styled('div')(() => ({
  width: '100%',
  padding: '20px',
  height: 'auto',
  minHeight: '100vh',
  background: '#ededed',
}));

export const UserCardStyle = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  width: '100%',
  flexBasis: '48%',
  padding: '10px 20px',
  borderRadius: '16px',
  backgroundColor: 'white',
  '@media (max-width: 768px)': {
    padding: '10px 15px',
  },
  td: {
    padding: '10px!important',
  },
}));

export const CardHeader = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: '100%',
  margin: '10px auto',
}));

export const BackgroundIcons = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IconBackground>(({ backColor }) => ({
  padding: '5px',
  borderRadius: '100%',
  backgroundColor: backColor,
  width: '50px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '@media (max-width: 768px)': {
    width: '40px',
    height: '40px',
  },
}));

export const ComponentsHolder = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  justifyContent: 'space-between',
  gap: '20px',
  '@media (max-width: 1080px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));
