import * as React from 'react';
import Modal from '@mui/material/Modal';
import { Spinner, SpinnerWrapper, Message, ProcessWrapper } from './processModalStyle';

const ProcessModal = ({ open, processMessage }) => (
  <Modal
    open={open}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <ProcessWrapper>
      <SpinnerWrapper>
        <Spinner color="primary" />
      </SpinnerWrapper>
      <Message>
        {processMessage}
      </Message>
    </ProcessWrapper>
  </Modal>
);

export default ProcessModal;
