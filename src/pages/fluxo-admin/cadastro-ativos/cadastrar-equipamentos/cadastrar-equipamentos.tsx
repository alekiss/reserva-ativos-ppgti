import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { getSalas } from "../../../../services/reserva-service";
import { Sala } from "../../../../types/salas";
import { toast } from "react-toastify";
import ModalConfirmarCadastro from "../../../../components/modals/modal-confirmar-cadastro";
import { TipoConfirmacao } from "../../../../types/tipo-confirmacao";
import ConfirmacaoCadastroEquipamentos from "./confirmacao-cadastro-equipamentos";
import {
  getTiposEquipamentos,
  portCadastrarEquipamento,
} from "../../../../services/cadastro-service";
import { TipoEquipamentosProps } from "../../../../types/equipamentos";
import Loading from "../../../../components/loading/loading";

interface EquipamentoCriado {
  nome: string;
  numeroPatrimonio: string;
  numeroSerie: string;
  local?: string;
}

const CadastrarEquipamentos = () => {
  const [openModal, setOpenModal] = useState(false);
  const [salas, setSalas] = useState<Sala[]>([]);
  const [tipoEquipamentos, setTipoEquipamentos] = useState<
    TipoEquipamentosProps[]
  >([]);
  const [filtros, setFiltros] = useState({
    nomeEquipamento: "",
    numeroPatrimonio: "",
    numeroSerie: "",
    tipoEquipamentoId: "",
    salaId: "",
    disponivel: "sim",
  });
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [sucesso, setSucesso] = useState(false);
  const [equipamentoCriado, setEquipamentoCriado] =
    useState<EquipamentoCriado | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    listaSalas();
    tiposEquipamentosLista();
  }, []);

  const listaSalas = async () => {
    setLoading(true);
    try {
      const response = await getSalas();
      setSalas(response.data.conteudo);
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Erro ao buscar salas");
    }
  };

  const tiposEquipamentosLista = async () => {
    try {
      const response = await getTiposEquipamentos();
      setTipoEquipamentos(response.data);
    } catch {
      toast.error("Erro ao buscar tipos de equipamentos");
    }
  };

  const handleChange =
    (field: keyof typeof filtros) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFiltros((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validar = () => {
    const novos: Record<string, boolean> = {
      nomeEquipamento: !filtros.nomeEquipamento.trim(),
      numeroPatrimonio: !filtros.numeroPatrimonio.trim(),
      numeroSerie: !filtros.numeroSerie.trim(),
      disponivel: !filtros.disponivel,
      tipoEquipamentoId: !filtros.tipoEquipamentoId,
      salaId: !filtros.salaId,
    };
    setErros(novos);
    return !Object.values(novos).includes(true);
  };

  const handleClick = () => {
    if (!validar()) {
      toast.error("Preencha corretamente todos os campos.");
      return;
    }
    setOpenModal(true);
  };

  const handleCadastrarEquipamento = async () => {
    setLoading(true);

    const {
      disponivel,
      nomeEquipamento,
      numeroPatrimonio,
      numeroSerie,
      salaId,
      tipoEquipamentoId,
    } = filtros;

    const cadastro = {
      nome: nomeEquipamento,
      disponivel: disponivel === "sim",
      numeroSerie,
      numeroPatrimonio,
      tipoAtivoId: tipoEquipamentoId,
      ativoPaiId: salaId,
    };

    try {
      await portCadastrarEquipamento(cadastro);
      setSucesso(true);
      setOpenModal(false);
      setEquipamentoCriado({
        nome: nomeEquipamento,
        numeroPatrimonio,
        numeroSerie,
        local: salas.find((s) => s.id === salaId)?.nome,
      });
      setLoading(false);
    } catch {
      toast.error("Erro ao confirmar cadastro.");
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (sucesso && equipamentoCriado) {
    return (
      <ConfirmacaoCadastroEquipamentos
        equipamentoReservado={equipamentoCriado}
      />
    );
  }

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Box display="flex" alignItems="center" mb={3}>
        <AssignmentIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Cadastro de Equipamentos</Typography>
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Nome do Equipamento"
          value={filtros.nomeEquipamento}
          onChange={handleChange("nomeEquipamento")}
          error={erros.nomeEquipamento}
          helperText={erros.nomeEquipamento ? "Campo obrigatório" : ""}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Número de Patrimônio"
          value={filtros.numeroPatrimonio}
          onChange={handleChange("numeroPatrimonio")}
          error={erros.numeroPatrimonio}
          helperText={erros.numeroPatrimonio ? "Campo obrigatório" : ""}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Número de Série"
          value={filtros.numeroSerie}
          onChange={handleChange("numeroSerie")}
          error={erros.numeroSerie}
          helperText={erros.numeroSerie ? "Campo obrigatório" : ""}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          select
          label="Tipo de Equipamento"
          value={filtros.tipoEquipamentoId}
          onChange={handleChange("tipoEquipamentoId")}
          error={erros.tipoEquipamentoId}
          helperText={erros.tipoEquipamentoId ? "Campo obrigatório" : ""}
          fullWidth
        >
          {tipoEquipamentos.map((tipoEquipamento) => (
            <MenuItem key={tipoEquipamento.id} value={tipoEquipamento.id}>
              {tipoEquipamento.nome}
            </MenuItem>
          ))}
        </TextField>

        <TextField
          select
          label="Sala"
          value={filtros.salaId}
          onChange={handleChange("salaId")}
          error={erros.salaId}
          helperText={erros.salaId ? "Campo obrigatório" : ""}
          fullWidth
        >
          {salas.map((sala) => (
            <MenuItem key={sala.id} value={sala.id}>
              {sala.nome}
            </MenuItem>
          ))}
        </TextField>

        <FormControl>
          <FormLabel>Disponível?</FormLabel>
          <RadioGroup
            row
            value={filtros.disponivel}
            onChange={handleChange("disponivel")}
          >
            <FormControlLabel value="sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>

        <Box textAlign="center" mt={2}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={handleClick}
          >
            CADASTRAR
          </Button>
        </Box>
      </Box>

      <ModalConfirmarCadastro
        openCancelar={openModal}
        handleFecharCancelar={() => setOpenModal(false)}
        handleConfirmarCancelar={handleCadastrarEquipamento}
        tipoConfirmacao={TipoConfirmacao.equipamento}
      />
    </Box>
  );
};

export default CadastrarEquipamentos;
