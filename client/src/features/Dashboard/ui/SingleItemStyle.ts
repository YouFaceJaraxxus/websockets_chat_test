import { styled } from '@mui/material/styles';

interface ICard {
  myColor: string;
}

const SingleItemStyle = styled('div', {
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
  padding: '10px 10px',
  border: 'none',
  borderRadius: '16px',
  '@media (max-width: 550px)': {
    minWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: '10px 10px',
  },
}));

export default SingleItemStyle;
