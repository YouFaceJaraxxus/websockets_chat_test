import React from 'react';
import { useTranslation } from 'react-i18next';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import {
  InputWrapper,
  CustomDiscountModalWrapper,
  SubmitButton,
  TitleWrapper,
  TitleIconTextWrapper,
  IconWrapper,
  TitleText,
  IconWrapperPointer,
} from './ui/DiscountModalStyle';
import { CloseIcon, DiscountCodeModalIcon } from '../../../assets/icons';

const DiscountModal = ({ open, handleClose, discountCode, setDiscountCode, handleSubmit }) => {
  const closeModal = () => {
    handleClose();
  };
  const { t } = useTranslation();

  return (
    <Modal
      open={open}
      onClose={closeModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <CustomDiscountModalWrapper>
        <TitleWrapper>
          <TitleIconTextWrapper>
            <IconWrapper>
              <DiscountCodeModalIcon />
            </IconWrapper>
            <TitleText>
              {t('account.enter-a-discount-code')}
            </TitleText>
          </TitleIconTextWrapper>
          <IconWrapperPointer sx={{ marginLeft: 'auto' }} onClick={closeModal}>
            <CloseIcon />
          </IconWrapperPointer>
        </TitleWrapper>
        <InputWrapper>
          <TextField
            fullWidth
            label={t('account.discount-code')}
            placeholder={t('account.your-discount-code')}
            value={discountCode || ''}
            onChange={(e) => setDiscountCode(e.target.value)}
          />
        </InputWrapper>
        <SubmitButton
          onClick={handleSubmit}
          disabled={discountCode == null || discountCode.length === 0}
        >
          {t('account.apply-code')}
        </SubmitButton>
      </CustomDiscountModalWrapper>
    </Modal>
  );
};

export default DiscountModal;
