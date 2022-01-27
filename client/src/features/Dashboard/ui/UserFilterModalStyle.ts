import { CircularProgress } from '@material-ui/core';
import { styled } from '@mui/material/styles';

interface IFilterModal {
  type: 'field' | 'list';
}

export const CustomFilterByUserNameWrapper = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IFilterModal>(({ type = 'list' }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  height: type === 'list' || type == null ? 120 : 300,
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
  backgroundColor: 'white',
  padding: '15px',
  outline: 'none',
  '& > form > div > div > div': {
    borderRadius: '15px!important',
  },
  '& > form > div > div > div > div': {
    borderRadius: '15px!important',
  },
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  '@media (max-width: 550px)': {
    width: '70%',
  },
}));

export const TitleText = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  marginright: 'auto',
  fontWeight: 'bolder',
  fontSize: '1.1em',
  fontFamily: theme.typography.fontFamily,
}));

export const FilterInputWrapper = styled('div')(() => ({
  width: '100%',
  margin: '3% auto 10px auto',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '& > div > div > ul': {
    maxHeight: '120px',
  },
}));

export const UserList = styled('div')(() => ({
  width: '100%',
  margin: '10px auto 0 auto',
  maxHeight: '150px',
  overflowX: 'hidden',
  overflowY: 'scroll',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  flexDirection: 'column',
  height: '150px',
}));

export const UserListItem = styled('div')(() => ({
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  '&:hover': {
    cursor: 'pointer',
    opacity: 0.8,
  },
}));

export const UserName = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  maxWidth: '85%',
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
  overflow: 'hidden',
}));

export const Spinner = styled(CircularProgress)(() => ({
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

export const ClearButton = styled('button')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  margin: '3% auto 0 auto',
  borderRadius: '5px',
  padding: '5px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginright: 'auto',
  width: '50%',
  '&:hover': {
    background: '#807bab',
    cursor: 'pointer',
  },
  '&:disabled': {
    background: '#807bab',
    cursor: 'pointer',
  },
  border: 'none',
}));
