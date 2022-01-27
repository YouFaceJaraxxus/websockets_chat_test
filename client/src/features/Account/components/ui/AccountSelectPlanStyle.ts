import { styled } from '@mui/material/styles';

export const AccountSelectPlanWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 'auto',
  width: '100%',
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
