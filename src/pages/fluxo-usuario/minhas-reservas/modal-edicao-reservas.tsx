import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { Reserva, ReservaRequest } from "../../../types/reserva";

type ModalEdicaoReservasProps = {
  reserva: Reserva | null;
  dadosFormulario: ReservaRequest;
  openModal: boolean;
  handleFechar: () => void;
  handleConfirmar: () => void;
  handleChange: (field: keyof ReservaRequest) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalEdicaoReservas = ({
  reserva,
  dadosFormulario,
  openModal,
  handleFechar,
  handleConfirmar,
  handleChange,
}: ModalEdicaoReservasProps) => {
  if (!reserva) return null;

  return (
    <Dialog open={openModal} onClose={handleFechar} fullWidth maxWidth="sm">
      <DialogTitle>Editar Reserva de {reserva.ativoNome}</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={2} p={2}>
          <TextField
            label="Ativo"
            value={reserva.ativoNome}
            fullWidth
            disabled
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Data da Reserva"
            type="date"
            value={dadosFormulario.dia}
            onChange={handleChange("dia")}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora de Início"
            type="time"
            value={dadosFormulario.horaInicio}
            onChange={handleChange("horaInicio")}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Hora de Fim"
            type="time"
            value={dadosFormulario.horaFim}
            onChange={handleChange("horaFim")}
            fullWidth
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Finalidade"
            multiline
            rows={4}
            value={dadosFormulario.finalidade}
            onChange={handleChange("finalidade")}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ padding: 2 }}>
        <Button variant="contained" color="error" onClick={handleFechar} sx={{ px: 3 }}>
          Cancelar
        </Button>
        <Button variant="contained" onClick={handleConfirmar} sx={{ px: 3 }}>
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ModalEdicaoReservas;