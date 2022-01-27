import { CircularProgress } from '@material-ui/core';
import { styled } from '@mui/material/styles';

interface CardBackground {
  bgcolor?: string;
  hasborder?: boolean;
}

export const MyCardsTitle = styled('h2')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: '20px 0px',
  width: '100%',
  fontWeight: 'bolder',
}));

export const MyCardsList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  margin: 'auto auto auto 0',
  height: '50%',
  maxHeight: '22vh',
  overflowX: 'hidden',
  width: '100%',
  scrollbarColor: '#6b6b6b #2b2b2b',
  '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
    backgroundColor: 'none',
    width: 8,
    maxHeight: '50%',
  },
  '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
    borderRadius: 10,
    width: 5,
    backgroundColor: '#948CFC',
    minHeight: 24,
  },
  '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus':
              {
                backgroundColor: '#959595',
              },
  '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active':
              {
                backgroundColor: '#959595',
              },
  '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover':
              {
                backgroundColor: '#959595',
              },
  '&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner': {
    backgroundColor: '#2b2b2b',
  },
}));

export const MyCardsListItem = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  marginBottom: '20px',
}));

export const MyCardLabelBody = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  margin: '0',
  width: '85%',
}));

export const MyCardsListItemBody = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<CardBackground>(({ theme, bgcolor = 'white', hasborder = true }) => ({
  fontFamily: theme.typography.fontFamily,
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0',
  padding: '10px 15px',
  width: '85%',
  borderRadius: '10px',
  backgroundColor: bgcolor,
  border: hasborder ? '1px solid #cecece' : 'none',
  '@media (max-width:500px)': {
    fontSize: '0.8em',
  },
  '@media (max-width:400px)': {
    fontSize: '0.6em',
  },
}));

export const MyCardsListItemNumbers = styled('div')(() => ({
  margin: '0 auto 0 0',
}));
export const MyCardsListItemCardIcon = styled('div')(() => ({
  margin: '0 0 0 auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
    opacity: '0.8',
  },
}));

export const MyCardsSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0',
  width: '50%',
  overflow: 'hidden',
}));

export const MyCardsSpinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '10% auto 10% auto',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));

export const NoPaymentMethods = styled('span')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '3%',
  width: '85%',
  height: '50%',
  fontSize: '1.3em',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));
