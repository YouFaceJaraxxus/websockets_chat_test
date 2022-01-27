import { styled } from '@mui/system';
import { styled as muiStyled } from '@mui/material/styles';
import { TableCell } from '@mui/material';
import { ChevronRight } from '@material-ui/icons';

export const DateCell = styled(TableCell)(({ theme }) => ({
  maxWidth: '45px',
  color: theme.palette.primary.dark,
  '@media (max-width: 1080px)': {
    maxWidth: '70px',
  },
  fontWeight: 'lighter',
}));

export const NameCell = styled(TableCell)(() => ({
  maxWidth: '200px',
  whiteSpace: 'nowrap',
  overflow: 'hidden!important',
  textOverflow: 'ellipsis',
  '@media (max-width: 1080px)': {
    maxWidth: '120px',
  },
  fontWeight: 'bolder',
}));

export const AmountCell = muiStyled(TableCell)(({ theme }) => ({
  color: theme.palette.success.main,
  fontWeight: 'bold',
  maxWidth: '70px',
}));

export const TransactionsHeader = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  margin: '10px auto auto auto',
}));

export const TransactionsTitleIcon = muiStyled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 'auto auto auto 0',
}));

export const TransactionsTitle = muiStyled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& > :last-child': {
    display: 'none',
  },
  '@media (max-width: 600px)': {
    '& > :first-child': {
      display: 'none',
    },
    '& > :last-child': {
      display: 'block',
    },
  },
  '@media (max-width: 500px)': {
    '& > h5': {
      fontSize: '1.2em',
      minWidth: '120px',
    },
  },
  '@media (max-width: 400px)': {
    '& > h5': {
      fontSize: '1.1em',
      minWidth: '110px',
    },
  },
}));

export const ViewAll = muiStyled('div')(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  margin: 'auto 0 auto auto',
  '&:hover': {
    cursor: 'pointer',
  },
  '@media (min-width: 425px)': {
    minWidth: '120px',
  },
  '@media (min-width: 1081px)': {
    minWidth: '200px',
  },
}));

export const ViewAllText = muiStyled('div')(({ theme }) => ({
  fontWeight: 'bold',
  fontFamily: theme.typography.fontFamily,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
}));

export const ViewAllArrow = muiStyled(ChevronRight)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const NoTransactions = muiStyled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '5%',
  width: '100%',
  height: '100%',
  fontWeight: 'bolder',
  fontSize: '1.2em',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));
