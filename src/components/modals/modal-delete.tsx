import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

type ModalDeleteProps = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  type: "sala" | "equipamento";
  nome?: string;
};

const ModalDelete = ({
  open,
  onClose,
  onConfirm,
  type,
  nome,
}: ModalDeleteProps) => {
  const title = `Excluir ${type === "sala" ? "Sala" : "Equipamento"}`;
  const message = `Tem certeza que deseja excluir ${
    type === "sala" ? "a sala" : "o equipamento"
  }${nome ? ` "${nome}"` : ""}? Esta ação não pode ser desfeita.`;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions sx={{ px: 2, pb: 2 }}>
        <Button onClick={onClose}>Cancelar</Button>
        <Button color="error" variant="contained" onClick={onConfirm}>
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalDelete;
