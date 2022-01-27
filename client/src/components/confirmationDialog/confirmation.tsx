import React, { SyntheticEvent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { TextField } from '@mui/material';
import {
  ButtonCancelStyle,
  ButtonDeleteStyle,
  ButtonGreenStyle,
  ButtonOrangeStyle,
  IconGreenStyle,
  IconOrangeStyle,
  IconRedStyle,
  IconPrimaryStyle,
  InputValidationWrapper,
  ConfirmButtonText,
} from './confirmationStyle';
import './confirmationSpinner.css';

export default function ConfirmationDialog({
  isOpen,
  handleAcceptConfirmation,
  handleCloseConfirmation,
  confirmationTitle,
  icon,
  approveText,
  declineText,
  type = 'red',
  inputValidationLabel = null,
  inputValidationValue = null,
  handleInputValidationChange = null,
  inputHidden = false,
  inputMinLength = 8,
  hasSpinner = false,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('xs'));
  const [isFetching, setIsFetching] = useState(false);

  const hasAdditionalInput = () => inputValidationValue != null &&
  inputValidationLabel != null &&
  handleInputValidationChange != null;

  const toggleLabelText = (text, labelText) => {
    if (text && text.length > 0) return labelText;
    return null;
  };

  const isDisabled = () => isFetching || (hasAdditionalInput()
  && (inputValidationValue == null || inputValidationValue.length < inputMinLength));

  const renderFetchingSpinner = () => isFetching && (
    <div className="lds-spinner">
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
      <div />
    </div>
  );

  const acceptConfirmation = () => {
    if (hasSpinner) setIsFetching(true);
    handleAcceptConfirmation();
  };

  const buttonRender = () => {
    switch (type) {
      case 'red':
        return (
          <ButtonDeleteStyle
            isfetching={isFetching}
            disabled={isDisabled()}
            autoFocus
            onClick={acceptConfirmation}
          >
            {renderFetchingSpinner()}
            <ConfirmButtonText>
              {approveText}
            </ConfirmButtonText>
          </ButtonDeleteStyle>
        );
        break;
      case 'green':
        return (
          <ButtonGreenStyle
            isfetching={isFetching}
            disabled={isDisabled()}
            autoFocus
            onClick={acceptConfirmation}
          >
            {renderFetchingSpinner()}
            <ConfirmButtonText>
              {approveText}
            </ConfirmButtonText>
          </ButtonGreenStyle>
        );
        break;
      case 'orange':
        return (
          <ButtonOrangeStyle
            isfetching={isFetching}
            disabled={isDisabled()}
            autoFocus
            onClick={acceptConfirmation}
          >
            {renderFetchingSpinner()}
            <ConfirmButtonText>
              {approveText}
            </ConfirmButtonText>
          </ButtonOrangeStyle>
        );
        break;
      default:
        return (
          <ButtonDeleteStyle
            isfetching={isFetching}
            disabled={isDisabled()}
            autoFocus
            onClick={acceptConfirmation}
          >
            {renderFetchingSpinner()}
            <ConfirmButtonText>
              {approveText}
            </ConfirmButtonText>
          </ButtonDeleteStyle>
        );
    }
  };

  const backgroundIconRender = () => {
    switch (type) {
      case 'red':
        return <IconRedStyle>{icon}</IconRedStyle>;
        break;
      case 'green':
        return <IconGreenStyle>{icon}</IconGreenStyle>;
        break;
      case 'orange':
        return <IconOrangeStyle>{icon}</IconOrangeStyle>;
        break;
      case 'primary':
        return <IconPrimaryStyle>{icon}</IconPrimaryStyle>;
        break;
      default:
        return <IconRedStyle>{icon}</IconRedStyle>;
    }
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        sx={{ textAlign: 'center', '& > div > div': { borderRadius: '20px' } }}
        open={isOpen}
        onClose={(e: SyntheticEvent) => {
          handleCloseConfirmation();
          e.stopPropagation();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        {backgroundIconRender()}
        <DialogTitle id="responsive-dialog-title" sx={{ padding: '20px', fontWeight: 'bold' }}>
          {confirmationTitle}
        </DialogTitle>
        {
          hasAdditionalInput() && (
            <InputValidationWrapper>
              <TextField
                type={inputHidden ? 'password' : 'text'}
                value={inputValidationValue}
                autoComplete="off"
                onChange={handleInputValidationChange}
                placeholder={inputValidationLabel}
                label={toggleLabelText(inputValidationValue, inputValidationLabel)}
                fullWidth
              />
            </InputValidationWrapper>
          )
        }
        <DialogActions sx={{ justifyContent: 'space-around', padding: '20px' }}>
          {handleAcceptConfirmation && buttonRender()}
          <ButtonCancelStyle
            onClick={(e: SyntheticEvent) => {
              handleCloseConfirmation();
              e.stopPropagation();
            }}
          >
            {declineText}
          </ButtonCancelStyle>
        </DialogActions>
      </Dialog>
    </div>
  );
}
