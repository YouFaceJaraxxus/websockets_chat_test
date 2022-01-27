import { styled } from '@mui/material/styles';

interface ICard {
  myColor: string;
}

export const KnowledgeBitesHolder = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',
  '@media (max-width:600px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

export const SingleKnowledgeStyle = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<ICard>(({ myColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
  flexDirection: 'column',
  flex: '1',
  backgroundColor: myColor,
  color: 'white',
  fontSize: '20px',
  padding: '7px 10px',
  border: 'none',
  borderRadius: '16px',
  svg: {
    width: '13px',
  },
}));

export const KnowledgeSpanStyled = styled('div')(() => ({
  fontSize: '16px',
  display: 'block',
  marginLeft: '20px',
  width: '100%',
  color: 'black',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const KnowledgeItemStyled = styled('div')(() => ({
  width: '100%',
  margin: '0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
}));
