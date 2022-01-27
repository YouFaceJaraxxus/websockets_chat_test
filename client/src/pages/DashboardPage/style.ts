import { styled } from '@mui/material/styles';

const DashbordStyled = styled('div')(() => ({
  display: 'flex',
  '@media (max-width: 899px)': {
    display: 'block',
  },
}));

export default DashbordStyled;
