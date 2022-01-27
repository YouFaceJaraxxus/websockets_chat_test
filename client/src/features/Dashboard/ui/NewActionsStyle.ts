import { styled } from '@mui/material/styles';

export const NewActionsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  position: 'relative',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const CountBadge = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  borderRadius: '50%',
  width: '24px',
  height: '24px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  bottom: '0',
  right: '0',
  marginRight: 'auto',
  fontSize: '0.95em',
  transform: 'translate(10px, -12px)',
}));
