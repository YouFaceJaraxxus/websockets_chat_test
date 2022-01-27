import { styled } from '@mui/material/styles';

export const UserHeaderStyle = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '10px auto 30px 0',
  width: '100%',
  '@media (max-width: 900px)': {
    margin: '0 auto 20px 0',
    paddingLeft: '5%',
  },
  '@media (max-width: 400px)': {
    fontSize: '0.6em',
  },
}));

export const HelloStyle = styled('span')(() => ({
  '@media (max-width: 400px)': {
    fontSize: '0.75em',
  },
}));

export const UserNameStyle = styled('b')(() => ({
  '@media (max-width: 400px)': {
    fontSize: '0.75em',
  },
}));

export default {};
