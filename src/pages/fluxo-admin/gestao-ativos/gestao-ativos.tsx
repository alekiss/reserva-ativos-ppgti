import { useEffect, useState } from "react";
import {
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import { Reserva } from "../../../types/reserva";
import { toast } from "react-toastify";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Loading from "../../../components/loading/loading";
import ListAltIcon from "@mui/icons-material/ListAlt";
import CadastroItem from "../../../components/cadastro-item/cadastro-item";
import { getGestaoAtivos } from "../../../services/cadastro-service";

const GestaoAtivos = () => {
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
      const response = await getGestaoAtivos();
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

  const handleIrParaGestaoAtivos = () => {
    navigate("/cadastrar-ativos");
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="80%"
        mx="auto"
      >
        <Box display="flex" alignItems="center" mb={2}>
          <ListAltIcon sx={{ mr: 1 }} />
          <Typography variant="h5">Gestão de Ativos</Typography>
        </Box>
        {/* {reservas.map((reserva) => (
          <ReservaItem key={reserva.id} reserva={reserva} />
        ))} */}

        <CadastroItem
          nome="Sala 101"
          id="A-123"
          disponibilidade={true}
          localizacao="Bloco A"
          tipo="sala"
          capacidade={20}
        />

        <CadastroItem
          nome="Notebook Dell"
          id="B-456"
          disponibilidade={false}
          localizacao="Laboratório 2"
          tipo="ativo"
          tipoAtivo="notebook"
        />

        <CadastroItem
          nome="Computador HP"
          id="B-61"
          disponibilidade={false}
          localizacao="Laboratório 3"
          tipo="ativo"
          tipoAtivo="computador"
        />

        <CadastroItem
          nome="Projetor Epson"
          id="B-1"
          disponibilidade={false}
          localizacao="Laboratório 2"
          tipo="ativo"
          tipoAtivo="projetor"
        />

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

        <Box mt={2} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            sx={{
              textTransform: "none",
              px: 4,
              py: 1.5,
              minWidth: 200,
            }}
            onClick={handleIrParaGestaoAtivos}
          >
            Novo Cadastro
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GestaoAtivos;
