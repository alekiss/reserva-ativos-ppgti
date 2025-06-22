import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { WarningAmber } from "@mui/icons-material";
import { TipoConfirmacao } from "../../types/tipo-confirmacao";

interface ModalConfirmarCadastroProps {
  openCancelar: boolean;
  handleFecharCancelar: () => void;
  handleConfirmarCancelar: () => void;
  tipoConfirmacao: TipoConfirmacao;
}

const ModalConfirmarCadastro = ({
  openCancelar,
  handleFecharCancelar,
  handleConfirmarCancelar,
  tipoConfirmacao,
}: ModalConfirmarCadastroProps) => {

  return (
    <Dialog
      open={openCancelar}
      onClose={handleFecharCancelar}
      maxWidth="xs"
      fullWidth
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <WarningAmber color="warning" />
        Confirmar Cadastro
      </DialogTitle>

      <DialogContent>
        <Typography variant="body1">
          Tem certeza que deseja <strong>cadastrar</strong> {tipoConfirmacao}?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          variant="outlined"
          color="inherit"
          onClick={handleFecharCancelar}
        >
          Voltar
        </Button>
        <Button
          onClick={handleConfirmarCancelar}
          variant="contained"
          color="primary"
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalConfirmarCadastro;