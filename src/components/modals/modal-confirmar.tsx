import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";

interface ModalConfirmarProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  termo: string;
}

const ModalConfirmar = ({ open, onClose, onConfirm, termo }: ModalConfirmarProps) => {

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Termo</DialogTitle>
      <DialogContent dividers sx={{ whiteSpace: "pre-wrap", maxHeight: 500 }}>
        <Typography variant="body2">{termo}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="error" variant="outlined">
          Cancelar
        </Button>
        <Button onClick={onConfirm} variant="contained" color="primary">
          Confirmo que li e estou de acordo
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmar;
