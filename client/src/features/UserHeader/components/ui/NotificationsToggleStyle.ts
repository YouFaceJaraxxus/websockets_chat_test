import { styled } from '@mui/material/styles';

export const NotificationsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  margin: '0 1% 0 auto',
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
  transform: 'translate(45%, -60%)',
}));
