import { styled } from '@mui/system';
import { styled as muiStyled } from '@mui/material/styles';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export const TasksTableStyled = styled('div')(() => ({
  gridColumn: '1 / 3',
  gridRow: '2',
  backgroundColor: 'white',
  fontSize: '20px',
  padding: '20px 20px',
  border: 'none',
  borderRadius: '16px',
  overflowX: 'hidden',
  '@media (max-width: 1080px)': {
    gridColumn: '1 / 2',
  },
}));

export const PaginationArrowBack = muiStyled(ArrowBackIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const PaginationArrowForward = muiStyled(ArrowForwardIcon)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
