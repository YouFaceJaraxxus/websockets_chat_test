import { KeyboardArrowDown } from '@material-ui/icons';
import { styled } from '@mui/system';
import { styled as muiStyled } from '@mui/material/styles';

export const TableHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  width: '100%',
  gap: '10px',
  '@media (min-width: 1081px)': {
    display: 'none',
  },
}));

export const TableHeaderRow = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
}));

export const TablePTitle = styled('div')(() => ({
  color: 'black',
  width: '100%',
  maxWidth: '120px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '1.1em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '@media (max-width: 768px)': {
    maxWidth: '110px',
  },
}));

export const TablePleft = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  maxWidth: '160px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  minWidth: '120px',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
}));

export const TasksLeftText = muiStyled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bolder',
  fontSize: '0.8em',
  '@media (max-width: 450px)': {
    fontSize: '0.7em',
  },
}));

export const CreateTask = styled('div')(({ theme }) => ({
  background: theme.palette.primary.dark,
  color: 'white',
  fontWeight: 'bolder',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '180px',
  padding: '10px',
  textAlign: 'center',
  '&:hover': {
    cursor: 'pointer',
    background: '#4e497a',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 450px)': {
    maxWidth: '110px',
    fontSize: '0.6em',
    padding: '10px 5px',
  },
}));

export const TaskListSelect = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  paddingTop: '1.75%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const TaskListSelectText = muiStyled('div')(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bolder',
  fontSize: '0.85em',
  marginRight: '1%',
  minWidth: '80px',
  '@media (max-width: 768px)': {
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const SelectArrowDown = muiStyled(KeyboardArrowDown)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
