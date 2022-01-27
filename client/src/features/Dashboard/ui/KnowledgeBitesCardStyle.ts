import { styled } from '@mui/material/styles';

const KnowledgeBitesCardHolder = styled('div')(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  width: '100%',
  maxHeight: '120px',
  overflowY: 'scroll',
  overflowX: 'hidden',
  '@media (max-width: 768px)': {
    gridTemplateColumns: 'repeat(1, 1fr)',
  },
}));

export default KnowledgeBitesCardHolder;
