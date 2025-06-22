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
import CardReserva from "../../../../components/card-reserva/card-reserva";
import ModalConfirmar from "../../../../components/modals/modal-confirmar";
import {
  getEquipamentosDisponiveis,
  getSalas,
  postReserva,
} from "../../../../services/reserva-service";
import { Sala } from "../../../../types/salas";
import { toast } from "react-toastify";
import Loading from "../../../../components/loading/loading";
import { EquipamentosDisponiveis } from "../../../../types/equipamentos";
import { termoEquipamentos } from "../../../../utils/termo";
import ConfirmacaoReservaEquipamentos from "./confirmacao-reserva-equipamentos";

interface EquipamentoCriado {
  equipamentoReservado: {
    nome: string;
    numeroPatrimonio: string;
    tipoAtivoNome: string;
    local?: string;
  };
}

const ReservaEquipamentos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [reservaConfirmada, setReservaConfirmada] = useState(false);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [errosFiltro, setErrosFiltro] = useState({
    dia: false,
    horaInicio: false,
    horaFim: false,
    salaId: false,
  });
  const [equipamentosDisponiveis, setEquipamentosDisponiveis] = useState<
    EquipamentosDisponiveis[]
  >([]);
  const [filtros, setFiltros] = useState({
    dia: "",
    horaInicio: "",
    horaFim: "",
    salaId: "",
  });
  const [equipamentoSelecionadoId, setEquipamentoSelecionadoId] = useState<string | null>(
    null
  );
  const [loading, setLoading] = useState(false);
    const [equipamentoCriado, setEquipamentoCriado] =
      useState<EquipamentoCriado | null>(null);

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

  const fetchEquipamentosDisponiveis = async (
    dia: string,
    salaId: string,
    horaInicio: string,
    horaFim: string
  ) => {
    setLoading(true);
    try {
      const response = await getEquipamentosDisponiveis(
        dia,
        salaId,
        horaInicio,
        horaFim
      );
      setEquipamentosDisponiveis(response.data.conteudo);
      setLoading(false);
    } catch {
      toast.error("Erro ao buscar equipamentos disponíveis");
      setLoading(false);
    }
  };

  const handleSelecionar = (id: string) => {
    setOpenModal(true);
    setEquipamentoSelecionadoId(id);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmarTermo = async () => {
    setLoading(true);
    if (!equipamentoSelecionadoId) {
      toast.error("Nenhum ativo selecionado.");
      return;
    }

    const { dia, horaInicio, horaFim } = filtros;

    const reserva = {
      dia,
      horaInicio,
      horaFim,
      finalidade: "Apresentação de TCC",
      ativoId: equipamentoSelecionadoId,
    };

    try {
      await postReserva(reserva);
      const equipamentoselecionado = equipamentosDisponiveis.find(
        (ativo) => ativo.id === equipamentoSelecionadoId
      );
      setOpenModal(false);
      setReservaConfirmada(true);
      setEquipamentoCriado({
        equipamentoReservado: {
          nome: equipamentoselecionado?.nome || "",
          numeroPatrimonio: equipamentoselecionado?.numeroPatrimonio || "",
          tipoAtivoNome: equipamentoselecionado?.tipoAtivoNome || "",
        },
      });
      setLoading(false);
    } catch {
      toast.error("Erro ao confirmar reserva.");
      setLoading(false);
    }
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
    fetchEquipamentosDisponiveis(dia, salaId, horaInicio, horaFim);
  };

  if (loading) {
    return <Loading />;
  }

  if (reservaConfirmada && equipamentoCriado) {
    return (
      <ConfirmacaoReservaEquipamentos equipamentoReservado={equipamentoCriado.equipamentoReservado} />
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
        <Box display="flex" alignItems="center" mb={3}>
          <CalendarMonthIcon sx={{ mr: 1 }} />
          <Typography variant="h5">Reserva de Equipamentos</Typography>
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
          {equipamentosDisponiveis.map((ativo) => (
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
        termo={termoEquipamentos}
      />
    </Box>
  );
};

export default ReservaEquipamentos;
