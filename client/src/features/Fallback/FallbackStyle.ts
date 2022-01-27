import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

export const FallbackSpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto',
  width: '100%',
}));

export const FallbackSpinner = styled(CircularProgress)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%',
  height: '100%',
  '& > svg': {
    width: '100%',
    height: '100%',
    minHeight: '15vh',
  },
}));
