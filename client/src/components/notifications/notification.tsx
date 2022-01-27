import React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => (
  <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
));

const Notification = ({
  isOpen = false,
  handleClose,
  severity,
  messageBody,
}) => {
  const vertical = 'bottom';
  const horizontal = 'right';
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar
        open={isOpen}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert
          onClose={handleClose}
          severity={severity}
          sx={{ width: '100%',
            '@media (max-width: 499px)': {
              borderRadius: '75px',
            } }}
        >
          {messageBody}
        </Alert>
      </Snackbar>
    </Stack>
  );
};

export default Notification;
