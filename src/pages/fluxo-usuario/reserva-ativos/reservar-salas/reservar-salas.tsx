import {
  Box,
  Button,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardReserva from "../../../../components/card-reserva/card-reserva";
import { useState } from "react";
import ModalConfirmar from "../../../../components/modals/modal-confirmar";
import { termoSalas } from "../../../../utils/termo";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import { toast } from "react-toastify";
import {
  getSalasDisponiveis,
  postReserva,
} from "../../../../services/reserva-service";
import { Sala } from "../../../../types/salas";
import ConfirmacaoReservaSalas from "./confirmacao-reserva-sala";

const ReservarSalas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filtros, setFiltros] = useState({
    dia: "",
    horaInicio: "",
    horaFim: "",
  });
  const [errosFiltro, setErrosFiltro] = useState({
    dia: false,
    horaInicio: false,
    horaFim: false,
  });
  const [salasDisponiveis, setSalasDisponiveis] = useState<Sala[]>([]);
  const [salaSelecionadoId, setSalaSelecionadoId] = useState<string | null>(
    null
  );
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [salaReservada, setSalaReservada] = useState<Sala | null>(null);

  const handleSelecionar = (id: string) => {
    setOpenModal(true);
    setSalaSelecionadoId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmarTermo = async () => {
    if (!salaSelecionadoId) {
      toast.error("Nenhum ativo selecionado.");
      return;
    }

    const { dia, horaInicio, horaFim } = filtros;

    const reserva = {
      dia,
      horaInicio,
      horaFim,
      finalidade: "Reunião de Pesquisa",
      ativoId: salaSelecionadoId,
    };

    try {
      await postReserva(reserva);
      const salaSelecionada = salasDisponiveis.find(
        (sala) => sala.id === salaSelecionadoId
      );
      setSalaReservada(salaSelecionada || null);
      setOpenModal(false);
      setReservaConfirmada(true);
    } catch {
      toast.error("Erro ao confirmar reserva.");
    }
  };

  const fetchSalasDisponiveis = async (
    dia: string,
    horaInicio: string,
    horaFim: string
  ) => {
    try {
      const response = await getSalasDisponiveis(dia, horaInicio, horaFim);
      setSalasDisponiveis(response.data.conteudo);
    } catch {
      toast.error("Erro ao buscar ativos disponíveis");
    }
  };

  const handlePesquisar = () => {
    const { dia, horaInicio, horaFim } = filtros;

    const novosErros = {
      dia: dia === "",
      horaInicio: horaInicio === "",
      horaFim: horaFim === "",
    };

    setErrosFiltro(novosErros);

    const algumErro = Object.values(novosErros).some((v) => v);
    if (algumErro) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    toast.error(null);
    fetchSalasDisponiveis(dia, horaInicio, horaFim);
  };

  if (reservaConfirmada && salaReservada) {
    return <ConfirmacaoReservaSalas salaReservada={salaReservada} />;
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
        <Box display="flex" alignItems="center" mb={3}>
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <Typography variant="h5">Reserva de Salas</Typography>
        </Box>
        <TextField
          label="Dia"
          type="date"
          value={filtros.dia}
          onChange={(e) => setFiltros({ ...filtros, dia: e.target.value })}
          fullWidth
          error={errosFiltro.dia}
          helperText={errosFiltro.dia ? "Campo obrigatório" : ""}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            input: {
              inputProps: {
                min: new Date().toISOString().split("T")[0],
              },
            },
          }}
        />

        <Box display="flex" gap={2}>
          <TextField
            label="Início"
            type="time"
            value={filtros.horaInicio}
            onChange={(e) =>
              setFiltros({ ...filtros, horaInicio: e.target.value })
            }
            fullWidth
            error={errosFiltro.horaInicio}
            helperText={errosFiltro.horaInicio ? "Campo obrigatório" : ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Fim"
            type="time"
            value={filtros.horaFim}
            onChange={(e) =>
              setFiltros({ ...filtros, horaFim: e.target.value })
            }
            fullWidth
            error={errosFiltro.horaFim}
            helperText={errosFiltro.horaFim ? "Campo obrigatório" : ""}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ padding: 1 }}
          startIcon={<SearchIcon />}
          onClick={handlePesquisar}
        >
          PESQUISAR
        </Button>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="800px"
        mx="auto"
      >
        <Box mt={5}>
          {salasDisponiveis.map((ativo) => (
            <Box mt={3} key={ativo.id}>
              <CardReserva
                imagem="https://delriomoveisparaescritorio.com.br/wp-content/uploads/2019/04/mesa-de-reuniao-7.jpg"
                titulo={ativo.nome}
                subtitulo={`Código: ${ativo.numeroPatrimonio}`}
                localizacao="Laboratório de Redes Convergentes"
                onSelecionar={() => handleSelecionar(ativo.id)}
              />
            </Box>
          ))}
        </Box>
      </Box>

      <ModalConfirmar
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmarTermo}
        termo={termoSalas}
      />
    </Box>
  );
};

export default ReservarSalas;