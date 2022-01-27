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
  justifyContent: 'flex-start',
  alignItems: 'center',
  fontWeight: 'bold',
  '& > svg': {
    marginLeft: '2%',
    color: theme.palette.primary.main,
  },
}));

export const SortableCellText = styled('span')(() => ({
}));

export default StatusBar;
