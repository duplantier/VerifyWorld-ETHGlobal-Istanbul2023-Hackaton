import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Backdrop, CircularProgress } from '@mui/material';

export default function AlertDialog({open, setOpen, title, text, submitText, cancelText, onSubmit, onCancel = () => {}}) {
  const [bdOpen, setBdOpen] = React.useState(false);
    const handleSubmit = async () => {
        setBdOpen(true);
        await onSubmit();
        handleClose();
        setBdOpen(false);
      };
    

  const handleClose = async () => {
    setBdOpen(true);
    await onCancel();
    setOpen(false);
    setBdOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <Backdrop open={bdOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
            <CircularProgress color="inherit" />
        </Backdrop>

        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {text}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} >{cancelText}</Button>
          <Button onClick={handleSubmit} autoFocus>
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
  );
}