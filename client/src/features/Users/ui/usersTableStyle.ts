import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

export const ButtonActionStyle = styled('button')(() => ({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
}));

export const SortableCell = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontWeight: 'bold',
  '& > svg': {
    marginLeft: '2%',
    color: theme.palette.primary.main,
  },
}));

export const SortableCellText = styled('span')(() => ({}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  overflow: 'hidden',
  position: 'absolute',
  textAlign: 'center',
  margin: '0px auto',
  background: '#ffffffc7',
  width: '100%',
  height: '100%',
}));

export const Spinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
  },
}));
