import { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { Reserva } from "../../types/reserva";
import ReservaItem from "../../components/reserva-item/reserva-item";
import { getMinhasReservas } from "../../services/reserva-service";
import { toast } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const MinhasReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  // const [reservaSelecionada, setReservaSelecionada] = useState<Reserva | null>(
  //   null
  // );
  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    try {
      const response = await getMinhasReservas();
      setReservas(response.data.conteudo);
    } catch {
      toast.error("Erro ao buscar salas");
    }
  };

  // const handleCancelar = (reserva: Reserva) => {
  //   setReservaSelecionada(reserva);
  //   setModalCancelarAberto(true);
  // };

  // const confirmarCancelamento = async () => {
  //   if (reservaSelecionada) {
  //     await cancelarReserva(reservaSelecionada.id);
  //     setModalCancelarAberto(false);
  //     await carregarReservas();
  //   }
  // };

  // const handleEditar = (reserva: Reserva) => {
  //   // Exibir painel lateral ou navegação para edição
  //   console.log("Editar reserva:", reserva);
  // };

  const handleIrParaMinhasReservas = () => {
    navigate("/reservar");
  };

  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={4}>
        <CalendarMonth sx={{ mr: 1 }} />
        <Typography variant="h5">Minhas Reservas</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="800px"
        mx="auto"
      >
        {reservas.map((reserva) => (
          <ReservaItem key={reserva.id} reserva={reserva} />
        ))}

        <Dialog
          open={modalCancelarAberto}
          onClose={() => setModalCancelarAberto(false)}
        >
          <DialogTitle>Confirmar cancelamento?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setModalCancelarAberto(false)}>
              Fechar
            </Button>
            <Button color="error" onClick={() => {}}>
              Cancelar Reserva
            </Button>
          </DialogActions>
        </Dialog>

        <Box mt={2}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleIrParaMinhasReservas}
          >
            NOVA RESERVA
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MinhasReservas;
