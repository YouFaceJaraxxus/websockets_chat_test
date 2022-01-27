import { styled } from '@mui/material/styles';

export const KnowledgeFormHolder = styled('div')(() => ({
  maxWidth: '500px',
  width: '100%',
  display: 'flex',
  padding: '20px',
  gap: '10px',
  flexDirection: 'column',
  h2: {
    fontSize: '16px',
  },
  '.MuiFormControl-root': {
    marginTop: '15px',
    borderRadius: '16px',
  },
  label: {
    color: '#8f8f8f',
  },
  '.MuiOutlinedInput-root': {
    borderRadius: '16px',
  },
}));

export const KnowledgeSpanStyled = styled('div')(() => ({
  fontSize: '16px',
  display: 'block',
  marginLeft: '20px',
  width: '100%',
  color: 'black',
}));

export const ButtonUploadStyle = styled('div')(() => ({
  width: '100%',
  maxWidth: '500px',
  height: '40px',
  cursor: 'pointer!important',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '2%',
  position: 'relative',
  '&:hover': {
    background: 'none',
    cursor: 'pointer',
  },
  '&:focus': {
    background: 'none',
    cursor: 'pointer',
  },
}));

export const InputFileStyle = styled('input')(() => ({
  display: 'none',
}));

export const InputLabelStyle = styled('label')(() => ({
  opacity: '0',
  width: '100%',
  position: 'absolute',
  height: '55px',
  top: '-15px',
  maxWidth: '460px',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const UploadedFilesStyle = styled('div')(() => ({
  display: 'flex',
  maxWidth: '460px',
  width: '100%',
  margin: 'auto',
  justifyContent: 'flex-start',
  p: {
    fontSize: '14px',
  },
}));

export const DeleteButtonHolderStyled = styled('button')(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '0',
  background: 'none',
  border: 'none',
  margin: '0 0 0 3%',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const UploadTextStyled = styled('div')(() => ({
  maxWidth: '180px',
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  '&:hover': {
    cursor: 'pointer',
  },
}));

export const ButtonSaveKnowledgeStyled = styled('button')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: 'white',
  display: 'block',
  fontSize: '16px',
  marginTop: '4%',
  textTransform: 'inherit',
  fontWeight: 'bold',
  borderRadius: '16px',
  padding: '4%',
  maxWidth: '200px',
  width: '100%',
  border: 'none',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
    cursor: 'pointer',
  },
  '@media (max-width:600px)': {
    margin: '15px auto 15px auto',
    maxWidth: '100%',
  },
}));

export const MissingFileOrAttachWrapper = styled('span')(({ theme }) => ({
  color: theme.palette.error.main,
  fontFamily: theme.typography.fontFamily,
  fontSize: '0.8em',
  padding: '4%',
  width: '100%',
}));

export const FileName = styled('p')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  maxWidth: '40%',
  overflowX: 'scroll',
  overflowY: 'hidden',
}));

export const AttachmentIconText = styled('p')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  '@media (max-width:600px)': {
    fontSize: '0.7em',
    marginLeft: '3%',
  },
  '@media (max-width:400px)': {
    fontSize: '0.5em',
  },
}));

export const ClickToUploadText = styled('p')(({ theme }) => ({
  fontFamily: theme.typography.fontFamily,
  '@media (max-width:600px)': {
    fontSize: '0.7em',
    marginRight: '3%',
  },
  '@media (max-width:400px)': {
    fontSize: '0.5em',
  },
}));
