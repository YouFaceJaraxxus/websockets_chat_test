import { styled } from '@mui/material/styles';

interface IconBackground {
  backgroundColor?: string;
  size?: string;
}

export const ListItemWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  margin: '1% 0 0 0',
  padding: '2% 0 1% 0',
  width: '100%',
  borderTop: '1px solid #edf1f7',
  '&:hover': {
    opacity: 0.9,
    cursor: 'pointer',
  },
}));

export const UserIconWrapper = styled('div')(() => ({
  margin: '0 auto auto 0',
  width: '10%',
}));

export const BackgroundIcons = styled('div', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IconBackground>(({ backgroundColor = 'white', size = null }) => ({
  padding: '5px',
  borderRadius: '100%',
  backgroundColor,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: size,
  minHeight: size,
}));

export const NotificationsAvatar = styled(BackgroundIcons, {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IconBackground>(() => ({
  margin: 'auto',
}));

export const Body = styled('div')(() => ({
  margin: '0 0 0 4%',
  width: '86%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
}));

const Row = styled('div')(() => ({
  margin: '0',
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));

export const AuthorStatusRow = styled(Row)(() => ({
  alignItems: 'flex-start',
  position: 'relative',
}));

export const Author = styled('span')(({ theme }) => ({
  margin: '0 auto 0 0',
  maxWidth: '50%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  color: theme.palette.primary.dark,
  fontWeight: 'bolder',
  fontSize: '0.8em',
  '@media (min-width:768px)': {
    fontSize: '1em',
  },
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  overflow: 'hidden',
}));

export const StatusDate = styled('div')(({ theme }) => ({
  margin: '0 0 auto auto',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  color: theme.palette.primary.dark,
  fontSize: '0.8em',
  '@media (min-width:768px)': {
    fontSize: '1em',
  },
  position: 'absolute',
  width: '100%',
}));

export const SIcon = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0',
}));

export const SDate = styled('div')(({ theme }) => ({
  margin: '0 0 0 1%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  alignItems: 'center',
  color: theme.palette.primary.dark,
  fontSize: '0.8em',
  '@media (min-width:768px)': {
    fontSize: '1em',
  },
}));

export const DescriptionDeleteRow = styled(Row)(() => ({
  alignItems: 'center',
}));

export const DescriptionWrapper = styled('span')(({ theme }) => ({
  color: theme.palette.primary.dark,
  width: '90%',
  wordBreak: 'break-word',
}));

export const DeleteWrapper = styled('div')(() => ({
  margin: '0 0 auto 2%',
  paddingRight: '3%',
  paddingTop: '2%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  '&:hover': {
    opacity: 0.7,
  },
}));

export const Bolder = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
  '@media (min-width:768px)': {
    fontSize: '1em',
  },
}));

export const Regular = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
  '@media (min-width:768px)': {
    fontSize: '1em',
  },
  display: 'inline-block',
}));

export const BolderError = styled(Bolder)(({ theme }) => ({
  color: theme.palette.error.main,
  display: 'inline-block',
}));

export const BolderSuccess = styled(Bolder)(({ theme }) => ({
  color: theme.palette.success.main,
}));

export const BolderPrimary = styled(Bolder)(({ theme }) => ({
  color: theme.palette.primary.main,
}));

export const RegularError = styled(Regular)(({ theme }) => ({
  color: theme.palette.error.main,
}));

export const RegularSuccess = styled(Regular)(({ theme }) => ({
  color: theme.palette.success.main,
}));

export const RegularPrimary = styled(Regular)(({ theme }) => ({
  color: theme.palette.primary.main,
}));
