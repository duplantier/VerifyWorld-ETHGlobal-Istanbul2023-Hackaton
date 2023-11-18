import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Backdrop, CircularProgress } from '@mui/material';

export default function InputDialog({open, setOpen, title, text, input_label, input_type="text", submitText, onSubmit}) {
  const [inputValue, setInputValue] = React.useState("");
  const [bdOpen, setBdOpen] = React.useState(false);

  const handleClose = () => {
    setInputValue("");
    setOpen(false);
  };

  const handleSubmit = async () => {
    setBdOpen(true);
    await onSubmit(inputValue);
    handleClose();
    setBdOpen(false);
  };


  return (
      <Dialog open={open} onClose={handleClose}>
        <Backdrop open={bdOpen} sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}>
          <CircularProgress color="inherit" />
        </Backdrop>


        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {text}
          </DialogContentText>
          <TextField
            autoFocus
            label={input_label}
            type={input_type}
            fullWidth
            variant="standard"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            sx={{
              mt: "2rem",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>{submitText}</Button>
        </DialogActions>
      </Dialog>
  );
}