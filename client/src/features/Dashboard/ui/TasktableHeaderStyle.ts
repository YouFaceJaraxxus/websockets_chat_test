import { styled } from '@mui/system';
import { styled as muiStyled } from '@mui/material/styles';

interface ITableTabsP {
  selected: boolean;
  isAdmin: boolean;
}

export const TableHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  '@media (max-width: 1080px)': {
    display: 'none',
  },
}));

export const TablePTitle = styled('div')(() => ({
  color: 'black',
  width: '100%',
  maxWidth: '200px',
  textAlign: 'left',
  fontWeight: 'bold',
  fontSize: '23px',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  '@media (max-width: 1280px)': {
    maxWidth: '140px',
  },
}));

export const TablePleft = styled('div')(({ theme }) => ({
  color: theme.palette.text.primary,
  width: '100%',
  maxWidth: '150px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '&:hover': {
    opacity: 0.8,
    cursor: 'pointer',
  },
  '@media (max-width: 1280px)': {
    fontSize: '0.65em',
    maxWidth: '120px',
  },
}));

export const TableTabs = styled('div')(() => ({
  display: 'flex',
  alignItems: 'stretch',
  borderTop: '1px solid #948CFC',
  borderBottom: '2px solid #948CFC',
  borderRadius: '6px',
}));

export const TableTabsP = styled('p', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<ITableTabsP>(({ theme, selected, isAdmin }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  color: selected ? 'white' : theme.palette.primary.main,
  backgroundColor: selected ? theme.palette.primary.main : 'white',
  padding: '15px',
  fontSize: '0.7em',
  fontWeight: 'bolder',
  margin: '0',
  borderRight: '1px solid #948CFC',
  textAlign: 'center',
  marginBottom: '-1px',
  '&:active': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
  },
  '&:hover': {
    background: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    cursor: 'pointer',
  },
  '&: first-child': {
    borderTopLeftRadius: '5px',
    borderBottomLeftRadius: '5px',
    borderLeft: '1px solid #948CFC',
  },
  '&: last-child': {
    borderTopRightRadius: '5px',
    borderBottomRightRadius: '5px',
    borderRight: '1px solid #948CFC',
  },
  ...(!isAdmin && { '@media (max-width: 1280px)': {
    padding: '10px 7.5px',
    fontSize: '0.6em',
  } }),
}));

export const TasksLeftText = muiStyled('div')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bolder',
}));

export const CreateTask = styled('div')(({ theme }) => ({
  background: theme.palette.primary.dark,
  fontWeight: 'bolder',
  fontSize: '0.8em',
  color: 'white',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '200px',
  padding: '15px 20px',
  textAlign: 'center',
  '&:hover': {
    cursor: 'pointer',
    background: '#4e497a',
  },
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '@media (max-width: 1280px)': {
    padding: '12px 18px',
    fontSize: '0.7em',
    maxWidth: '180px',
  },
}));
