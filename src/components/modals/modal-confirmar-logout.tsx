import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type ModalConfirmarLogoutProps = {
  open: boolean;
  title?: string;
  description: string;
  onClose: () => void;
  onConfirm: () => void;
};

const ModalConfirmarLogout: React.FC<ModalConfirmarLogoutProps> = ({
  open,
  title = "Confirmação",
  description,
  onClose,
  onConfirm,
}) => (
  <Dialog
    open={open}
    onClose={onClose}
    aria-labelledby="confirm-dialog-title"
    aria-describedby="confirm-dialog-description"
  >
    <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText id="confirm-dialog-description">
        {description}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose}>Cancelar</Button>
      <Button variant="contained" color="error" onClick={onConfirm} autoFocus>
        Confirmar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ModalConfirmarLogout;
