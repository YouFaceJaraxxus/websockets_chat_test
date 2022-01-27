import { styled } from '@mui/material/styles';

export const StatsCardStyled = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  gap: '10px',
  '@media (max-width: 550px)': {
    flexDirection: 'column',
  },
}));

export const TasksOverviewIconStatus = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  width: '100%',
  '@media (max-width: 550px)': {
    justifyContent: 'flex-start',
    minWidth: '30%',
  },
}));

export const StatusSpan = styled('div')(() => ({
  fontSize: '16px',
  display: 'block',
  margin: '0',
  width: '50%',
  '@media (max-width: 550px)': {
    fontSize: '0.7em',
    flexDirection: 'column',
    marginLeft: '5%',
  },
}));

export const NumberSpan = styled('div')(() => ({
  fontSize: '40px',
  fontWeight: 'bold',
  width: '78%',
  marginLeft: '20px',
  textAlign: 'right',
  display: 'block',
  lineHeight: '40px',
  '@media (max-width:550px)': {
    textAlign: 'left',
    width: '70%',
    margin: 'auto auto auto 15%',
  },
}));
