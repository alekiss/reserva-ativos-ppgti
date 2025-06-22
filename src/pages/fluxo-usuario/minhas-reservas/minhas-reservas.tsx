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
import { Reserva } from "../../../types/reserva";
import ReservaItem from "../../../components/reserva-item/reserva-item";
import { getMinhasReservas } from "../../../services/reserva-service";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/loading";

const MinhasReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  // const [reservaSelecionada, setReservaSelecionada] = useState<Reserva | null>(
  //   null
  // );
  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = async () => {
    setLoading(true);
    try {
      const response = await getMinhasReservas();
      setReservas(response.data.conteudo);
      setLoading(false);
    } catch {
      toast.error("Erro ao buscar salas");
      setLoading(false);
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
    navigate("/reservar-ativos");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box p={4}>
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="800px"
        mx="auto"
      >
        <Box display="flex" alignItems="center" mb={4}>
          <CalendarMonth sx={{ mr: 1 }} />
          <Typography variant="h5">Minhas Reservas</Typography>
        </Box>
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
