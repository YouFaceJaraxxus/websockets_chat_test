import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import { styled } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

interface IRow {
  alignItems?: 'center' | 'flex-start' | 'flex-end';
  marginBottom? : string;
}

interface IconBackground {
  backgroundColor?: string;
  size?: string;
}

interface IStatusBar {
  color: string;
}

export const StatusBar = styled('p', {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IStatusBar>(({ color }) => ({
  color: `${color}`,
  border: `1px solid ${color}`,
  borderRadius: '16px',
  padding: '5px',
  maxWidth: '100px',
  width: '100%',
  textAlign: 'center',
  fontWeight: 'bold',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto auto auto 0',
}));

export const CustomTaskOverviewDrawer = styled('div')(() => ({
  position: 'absolute',
  top: '0',
  right: '0',
  width: 500,
  height: '100%',
  p: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'flex-end',
  outline: 'none',
  '@media (max-width:600px)': {
    width: '90%',
  },
  '@media (max-width:425px)': {
    width: '100%',
  },
}));

export const CustomTaskOverviewWrapper = styled('div')(() => ({
  outline: 'none',
  width: '100%',
  overflowY: 'auto',
  overflowX: 'hidden',
  margin: 'auto 0',
  maxHeight: '95%',
  bgcolor: 'background.paper',
  p: 4,
  borderRadius: '10px',
  borderTopRightRadius: '5px',
  borderBottomRightRadius: '5px',
  backgroundColor: 'white',
  padding: '0 5% 5% 5%',
  '@media (max-height:730px)': {
    height: '100%',
  },
}));

export const Bolder = styled('span')(({ theme }) => ({
  fontWeight: 'bolder',
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));

export const Regular = styled('span')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.secondary,
}));

export const TitleWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: '5%',
  width: '100%',
  margin: '0 auto 1% 0',
  position: 'sticky',
  top: '0',
  paddingTop: '5%',
  paddingBottom: '4%',
  backgroundColor: 'white',
  zIndex: 100,
}));

export const TitleIconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  width: '12%',
  margin: '0.5% auto auto 0',
}));

export const TitleIconTextWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '80%',
}));

export const TitleText = styled('span')(({ theme }) => ({
  border: 'none',
  margin: 'auto auto auto 3%',
  fontWeight: 'bolder',
  fontSize: '1.3em',
  fontFamily: theme.typography.fontFamily,
  position: 'relative',
  width: '80%',
  wordBreak: 'break-word',
}));

export const TitleActionsWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '10%',
  margin: '0 0 0 auto',
}));

export const Row = styled('div')<IRow>(({ alignItems = 'center', marginBottom = '3.5%' }) => ({
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems,
  margin: `auto auto ${marginBottom} auto`,
}));

export const RowHeader = styled(Bolder)(() => ({
  minWidth: '25%',
  '@media (max-width:600px)': {
    minWidth: '30%',
  },
}));

export const RowBody = styled('div')<IRow>(({ theme, alignItems = 'center' }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  display: 'flex',
  alignItems,
}));

export const DescriptionRow = styled('div')(() => ({
  margin: 'auto auto 3.5% auto',
  width: '100%',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'stretch',
  '@media (max-width:400px)': {
    flexDirection: 'column',
  },
}));

export const DescriptionHeader = styled(Bolder)(() => ({
  minWidth: '25%',
  display: 'inline-block',
  '@media (max-width:600px)': {
    minWidth: '30%',
  },
}));

export const DescriptionBody = styled(Regular)(() => ({

}));

export const CompleteTaskButton = styled(Button)(({ theme }) => ({
  color: theme.palette.success.main,
  background: 'white',
  fontFamily: theme.typography.fontFamily,
  '&:hover': {
    background: '#eeeeee!important',
  },
  fontSize: '0.7em',
  fontWeight: 'bold',
  padding: '0.75% 2%',
  border: `${theme.palette.success.main} 1px solid`,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: 'auto 0 auto auto',
}));

export const DatesBody = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  margin: 'auto',
  width: '75%',
}));

export const StatusPriorityBody = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: '0 auto 0 0',
  width: '65%',
  '@media (max-width: 600px)': {
    width: '75%',
  },
}));

export const PriorityIconText = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  margin: 'auto 0 auto auto',
}));

export const PriorityText = styled(Regular)(() => ({
  display: 'flex',
  alignItems: 'center',
  marginLeft: '5%',
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

export const AttachmentsList = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  margin: '0 0 0 auto',
  width: '75%',
  '@media (max-width: 600px)': {
    width: '70%',
    paddingLeft: '0px',
  },
}));

export const AttachmentsListItem = styled('div')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  color: theme.palette.text.primary,
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  marginBottom: '3%',
  '&:hover': {
    cursor: 'pointer',
    opacity: '0.8',
  },
}));

export const SpinnerWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '5% auto 5% auto',
  width: '100%',
  overflow: 'hidden',
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

export const SubmitButtonWrapper = styled('div')(() => ({
  display: 'flex',
  width: '100%',
  justifyContent: 'flex-end',
  alignItems: 'flex-end',
  margin: 'auto',
}));

export const SubmitButton = styled(Button)(({ theme }) => ({
  borderRadius: '15px!important',
  pointerEvents: 'auto',
  color: 'white!important',
  background: theme.palette.primary.dark,
  textTransform: 'none',
  fontFamily: theme.typography.fontFamily,
  fontWeight: 'bold',
  maxWidth: '35%',
  padding: '2.5%',
  '&:hover': {
    background: '#807bab',
  },
  '&:disabled': {
    background: '#807bab',
  },
  outline: 'none',
  '&:focus': {
    outline: 'none',
  },
}));

export const AddCommentWrapper = styled('div')(() => ({
  margin: 'auto auto 4% auto',
  '& > div > div': {
    borderRadius: '15px!important',
  },
}));

export const CommentWrapper = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: 'auto auto 5% auto',
  minHeight: '10%',
}));

export const CommentHeader = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '100%',
  margin: 'auto',
}));

export const CommentBody = styled(Regular)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  margin: '0 0 0 20%',
  fontSize: '0.7em',
  padding: '2.5%',
  wordBreak: 'break-word',
}));

export const CommentHeaderAvatar = styled(BackgroundIcons, {
  shouldForwardProp: (prop) => prop !== '#cdcdcd',
})<IconBackground>(() => ({
  margin: 'auto 0 auto 0',
}));

export const CommentHeaderText = styled('div')(() => ({
  margin: 'auto auto auto 10px',
  display: 'inline',
  fontSize: '0.9em',
  paddingRight: '5%',
}));

export const BolderError = styled(Bolder)(({ theme }) => ({
  color: theme.palette.error.main,
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

export const CommentDeleteActions = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  alignItems: 'center',
  width: '80%',
  margin: '0 0 0 20%',
}));

const ActionButton = styled(Button)(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.7em',
  padding: '1% 2%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  border: `${theme.palette.primary.dark} 1px solid`,
}));

export const ApproveDeleteButton = styled(ActionButton)(({ theme }) => ({
  color: 'white!important',
  background: theme.palette.primary.dark,
  '&:hover': {
    background: '#4e497a',
  },
}));

export const DeclineDeleteButton = styled(ActionButton)(({ theme }) => ({
  color: theme.palette.primary.dark,
  background: 'white',
  '&:hover': {
    background: '#eeeeee!important',
  },
}));

export const IconWrapper = styled('div')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

export const IconWrapperPointer = styled(IconWrapper)(() => ({
  '&:hover': {
    cursor: 'pointer',
    opacity: '0.5',
  },
}));

export const CommentDate = styled(RegularPrimary)(() => ({
  textAlign: 'right',
  fontSize: '0.9em',
}));

export const useStyles = makeStyles(() => ({
  errorText: {
    color: '#D32F2F !important',
  },
  titleWrapper: {
    border: 'none',
    margin: 'auto auto auto 3%',
    fontWeight: 'bolder',
    fontSize: '1.2em',
  },
}));
