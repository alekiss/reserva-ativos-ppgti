import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

interface ModalCancelarProps {
  openCancelar: boolean;
  handleFecharCancelar: () => void;
  handleConfirmarCancelar: () => void;
}

const ModalCancelar = ({
  openCancelar,
  handleFecharCancelar,
  handleConfirmarCancelar,
}: ModalCancelarProps) => {
  return (
    <Dialog open={openCancelar} onClose={handleFecharCancelar}>
      <DialogTitle>Confirmar Cancelamento</DialogTitle>
      <DialogContent>
        <Typography>Tem certeza que deseja cancelar esta reserva?</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleFecharCancelar}>Não</Button>
        <Button color="error" onClick={handleConfirmarCancelar}>
          Sim, Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalCancelar;
