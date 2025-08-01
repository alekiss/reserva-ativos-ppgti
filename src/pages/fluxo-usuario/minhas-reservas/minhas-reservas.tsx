import { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";
import { CalendarMonth } from "@mui/icons-material";
import { Reserva, DataReserva, ReservaRequest } from "../../../types/reserva";
import ReservaItem from "../../../components/reserva-item/reserva-item";
import { deleteReserva, getMinhasReservas, putReserva } from "../../../services/reserva-service"; // Adicione a função de atualização aqui
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import ModalEdicaoReservas from "./modal-edicao-reservas";

const MinhasReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>([]);
  const [reservaParaExcluir, setReservaParaExcluir] = useState<Reserva | null>(null);
  const [reservaParaEditar, setReservaParaEditar] = useState<Reserva | null>(null);
  const [dadosEdicao, setDadosEdicao] = useState<DataReserva>({
    ativoId: "",
    dia: "",
    horaInicio: "",
    horaFim: "",
    finalidade: ""
  });
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
    } catch {
      toast.error("Erro ao buscar reservas.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelar = (reserva: Reserva) => {
    setReservaParaExcluir(reserva);
  };

  const confirmarCancelamento = async () => {
    if (reservaParaExcluir) {
      try {
        await deleteReserva(reservaParaExcluir.id);
        toast.success("Reserva cancelada com sucesso!");
        setReservaParaExcluir(null);
        await fetchReservas();
      } catch {
        toast.error("Erro ao cancelar reserva. Tente novamente.");
      }
    }
  };

  const handleEditar = (reserva: Reserva) => {
    setReservaParaEditar(reserva);
    setDadosEdicao({
      ativoId: reserva.ativoId,
      dia: reserva.dia,
      horaInicio: reserva.inicio,
      horaFim: reserva.fim,
      finalidade: reserva.finalidade,
    });
  };

  const handleSalvarEdicao = async () => {
    if (reservaParaEditar) {
      try {
        const dadosCompletos: ReservaRequest = {
          ...dadosEdicao,
        };
        await putReserva(reservaParaEditar.id, dadosCompletos);
        toast.success("Reserva atualizada com sucesso!");
        setReservaParaEditar(null);
        await fetchReservas();
      } catch {
        toast.error("Erro ao salvar a reserva. Verifique os dados.");
      }
    }
  };

  const handleIrParaNovaReserva = () => {
    navigate("/reservar-ativos");
  };

  const handleChangeDadosEdicao = (field: keyof DataReserva) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setDadosEdicao({
      ...dadosEdicao,
      [field]: event.target.value,
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
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
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <ReservaItem 
              key={reserva.id} 
              reserva={reserva}
              onEditar={handleEditar}
              onCancelar={handleCancelar}
            />
          ))
        ) : (
          <Typography variant="body1" color="text.secondary">
            Você não possui reservas.
          </Typography>
        )}

        <Dialog
          open={!!reservaParaExcluir}
          onClose={() => setReservaParaExcluir(null)}
        >
          <DialogTitle>Confirmar cancelamento?</DialogTitle>
          <DialogActions>
            <Button onClick={() => setReservaParaExcluir(null)}>
              Fechar
            </Button>
            <Button color="error" onClick={confirmarCancelamento}>
              Cancelar Reserva
            </Button>
          </DialogActions>
        </Dialog>
        
        <ModalEdicaoReservas
          openModal={!!reservaParaEditar}
          reserva={reservaParaEditar}
          dadosFormulario={dadosEdicao}
          handleFechar={() => setReservaParaEditar(null)}
          handleConfirmar={handleSalvarEdicao}
          handleChange={handleChangeDadosEdicao}
        />

        <Box mt={2}>
          <Button
            variant="outlined"
            startIcon={<AddIcon />}
            onClick={handleIrParaNovaReserva}
          >
            NOVA RESERVA
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default MinhasReservas;