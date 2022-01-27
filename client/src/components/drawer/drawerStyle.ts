import { styled } from '@mui/material/styles';

export const LogoHolderStyled = styled('div')(() => ({
  padding: '10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  svg: {
    width: '100%',
    maxWidth: '170px',
  },
}));

export const FetchingSpinner = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
  '& > svg': {
    maxHeight: '3vh',
  },
}));
