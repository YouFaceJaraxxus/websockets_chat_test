import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const TaskListUserWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  margin: 'auto auto auto 0',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  margin: 'auto 5% auto 0',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
}));
