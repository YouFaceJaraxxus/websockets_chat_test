import { styled } from '@mui/material/styles';

const TransactionsStyled = styled('div')(() => ({
  display: 'flex',
  '@media (max-width: 900px)': {
    display: 'block',
  },
}));

export default TransactionsStyled;
