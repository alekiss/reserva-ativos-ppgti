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
  type: "sala" | "equipamento" | "usuario";
  nome?: string;
};

const ModalDelete = ({
  open,
  onClose,
  onConfirm,
  type,
  nome,
}: ModalDeleteProps) => {
  const titles = {
    sala: "Excluir Sala",
    equipamento: "Excluir Equipamento",
    usuario: "Excluir Usuário",
  };

  const messages = {
    sala: `Tem certeza que deseja excluir a sala "${nome}"? Esta ação não pode ser desfeita.`,
    equipamento: `Tem certeza que deseja excluir o equipamento "${nome}"? Esta ação não pode ser desfeita.`,
    usuario: `Tem certeza que deseja excluir o usuário "${nome}"? Esta ação não pode ser desfeita.`,
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>{titles[type]}</DialogTitle>
      <DialogContent>
        <DialogContentText>{messages[type]}</DialogContentText>
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