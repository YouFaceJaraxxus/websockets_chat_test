import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IStatusBar {
  color: string;
}

export const StatusBar = styled('p', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IStatusBar>(({ color }) => ({
  color: `${color}`,
  border: `1px solid ${color}`,
  borderRadius: '16px',
  padding: '5px',
  margin: '0',
  maxWidth: '100px',
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SortableCell = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bold',
  '& > svg': {
    marginLeft: '2%',
    color: theme.palette.primary.main,
  },
}));

export const TableSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  overflow: 'hidden',
}));

export const TableSpinner = styled(CircularProgress)(() => ({
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

export const NoTask = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5%',
  width: '100%',
  height: '100%',
  fontWeight: 'bolder',
  fontSize: '1.5em',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));

export const PriorityIconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const PriorityIconText = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: 'auto',
}));

export const Regular = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));

export const SortableCellText = styled('span')(() => ({
}));
