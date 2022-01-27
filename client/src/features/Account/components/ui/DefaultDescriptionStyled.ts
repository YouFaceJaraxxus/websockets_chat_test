import { styled } from '@mui/material/styles';

export const DefaultDescriptionHolderStyled = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  margin: '24px 0',
}));

export const SingleDescriptionHolderStyled = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  maxWidth: '350px',
  textAlign: 'left',
  gap: '10px',
  margin: '0px auto',
}));

export const TractionDescriptionStyled = styled('p')(() => ({
  margin: '24px 0',
}));
