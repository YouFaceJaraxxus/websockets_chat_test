import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

interface IStatusBar {
  color: string;
}

const StatusBar = styled('p', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IStatusBar>(({ color }) => ({
  color: `${color}`,
  border: `1px solid ${color}`,
  borderRadius: '16px',
  padding: '5px',
  margin: '0',
  maxWidth: '100px',
  width: '100%',
}));

export const SortableCell = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  '& > svg': {
    marginLeft: '2%',
    color: theme.palette.primary.main,
  },
}));

export const SortableCellText = styled('span')(() => ({
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
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

export default StatusBar;
