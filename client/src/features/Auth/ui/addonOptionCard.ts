import { styled } from '@mui/material/styles';

export const AddonOptionHolderStyled = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: '100%',
  boxSizing: 'border-box',
  backgroundColor: '#F4F6F6',
  borderRadius: '15px',
  marginTop: '2%',
  '@media (max-width:1000px)': {
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '600px',
    margin: '20px auto',
  },
  '@media (max-width:850px)': {
    flexDirection: 'column',
    alignItems: 'center',
    maxWidth: '350px',
    margin: '20px auto',
  },
}));

export const AddonTitleStyled = styled('p')(() => ({
  fontWeight: 'bold',
  fontSize: '24px',
  maxWidth: '200px',
  width: '100%',
  borderRight: '1px solid grey',
  padding: '2%',
  '@media (max-width:1000px)': {
    borderRight: 'none',
    borderBottom: '1px solid grey',
    padding: '1%',
  },
}));

export const AddonPriceStyled = styled('p')(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 'bold',
  marginLeft: '-10px',
  '@media (max-width:850px)': {
    fontSize: '14px',
  },
}));

export const LabelPriceHolderStyled = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  flexBasis: 'content',
  justifyContent: 'center',
  '@media (max-width:1200px)': {
    span: {
      fontSize: '16px',
    },
  },
  '@media (max-width:850px)': {
    span: {
      fontSize: '14px',
    },
  },
}));

export const AddonsCheckboxesHolderStyled = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'center',
  '@media (max-width:850px)': {
    margin: '-10px auto',
    paddingLeft: '10px',
    justifyContent: 'flex-start',
  },
}));
