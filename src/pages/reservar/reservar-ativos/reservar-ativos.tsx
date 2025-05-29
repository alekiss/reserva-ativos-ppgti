import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import CardReserva from "../../../components/card-reserva/card-reserva";
import ModalConfirmar from "../../../components/modals/modal-confirmar";
import { termoAtivos } from "../../../utils/termo";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import {
  getAtivosDisponiveis,
  getSalas,
  postReserva,
} from "../../../services/reserva-service";
import { Sala } from "../../../types/salas";
import { AtivosDisponiveis } from "../../../types/ativos";
import { toast } from "react-toastify";

const ReservarAtivos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [errosFiltro, setErrosFiltro] = useState({
    dia: false,
    horaInicio: false,
    horaFim: false,
    salaId: false,
  });
  const [ativosDisponiveis, setAtivosDisponiveis] = useState<
    AtivosDisponiveis[]
  >([]);
  const [filtros, setFiltros] = useState({
    dia: "",
    horaInicio: "",
    horaFim: "",
    salaId: "",
  });
  const [ativoSelecionadoId, setAtivoSelecionadoId] = useState<string | null>(
    null
  );
  const [ativoReservado, setAtivoReservado] =
    useState<AtivosDisponiveis | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalas();
  }, []);

  const fetchSalas = async () => {
    try {
      const response = await getSalas();
      setSalas(response.data.conteudo);
    } catch {
      toast.error("Erro ao buscar salas");
    }
  };

  const fetchAtivosDisponiveis = async (
    dia: string,
    salaId: string,
    horaInicio: string,
    horaFim: string
  ) => {
    try {
      const response = await getAtivosDisponiveis(
        dia,
        salaId,
        horaInicio,
        horaFim
      );
      setAtivosDisponiveis(response.data.conteudo);
    } catch {
      toast.error("Erro ao buscar ativos disponíveis");
    }
  };

  const handleSelecionar = (id: string) => {
    setOpenModal(true);
    setAtivoSelecionadoId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmarTermo = async () => {
    if (!ativoSelecionadoId) {
      toast.error("Nenhum ativo selecionado.");
      return;
    }

    const { dia, horaInicio, horaFim } = filtros;

    const reserva = {
      dia,
      horaInicio,
      horaFim,
      finalidade: "Apresentação de TCC",
      ativoId: ativoSelecionadoId,
    };

    try {
      await postReserva(reserva);
      const ativoSelecionado = ativosDisponiveis.find(
        (ativo) => ativo.id === ativoSelecionadoId
      );
      setAtivoReservado(ativoSelecionado || null);
      setOpenModal(false);
      setReservaConfirmada(true);
    } catch {
      toast.error("Erro ao confirmar reserva.");
    }
  };

  const handleIrParaMinhasReservas = () => {
    navigate("/minhas-reservas");
  };

  const handlePesquisar = () => {
    const { dia, horaInicio, horaFim, salaId } = filtros;

    const novosErros = {
      dia: dia === "",
      horaInicio: horaInicio === "",
      horaFim: horaFim === "",
      salaId: salaId === "",
    };

    setErrosFiltro(novosErros);

    const algumErro = Object.values(novosErros).some((v) => v);
    if (algumErro) {
      toast.error("Preencha todos os campos obrigatórios.");
      return;
    }

    toast.error(null);
    fetchAtivosDisponiveis(dia, salaId, horaInicio, horaFim);
  };

  if (reservaConfirmada) {
    return (
      <Box p={4} display="flex" flexDirection="column" gap={2} maxWidth="600px">
        <Box display="flex" alignItems="center" mb={2} gap={1}>
          <CheckCircleIcon color="success" />
          <Typography variant="h6" color="success.main">
            Reserva feita com sucesso!
          </Typography>
        </Box>

        {ativoReservado && (
          <CardReserva
            imagem="https://www.iq.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_xlarge/public/harvard-iqss/files/k301_01.png?m=1714725215&itok=IGS1ojuR"
            titulo={ativoReservado.nome}
            subtitulo={`Código: ${ativoReservado.numeroPatrimonio}`}
            localizacao="Laboratório de Redes Convergentes"
          />
        )}

        <Box mt={2}>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleIrParaMinhasReservas}
          >
            Ir para minhas reservas
          </Button>
        </Box>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={4}>
        <CalendarMonthIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Reserva de Ativos</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="800px"
        mx="auto"
      >
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

        <TextField
          select
          label="Salas"
          fullWidth
          value={filtros.salaId}
          onChange={(e) => setFiltros({ ...filtros, salaId: e.target.value })}
          error={errosFiltro.salaId}
          helperText={errosFiltro.salaId ? "Campo obrigatório" : ""}
        >
          {salas.map((sala) => (
            <MenuItem key={sala.id} value={sala.id}>
              {sala.nome}
            </MenuItem>
          ))}
        </TextField>

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

        <Box mt={5}>
          {ativosDisponiveis.map((ativo) => (
            <Box mt={3} key={ativo.id}>
              <CardReserva
                imagem="https://www.iq.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_xlarge/public/harvard-iqss/files/k301_01.png?m=1714725215&itok=IGS1ojuR"
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
        termo={termoAtivos}
      />
    </Box>
  );
};

export default ReservarAtivos;
