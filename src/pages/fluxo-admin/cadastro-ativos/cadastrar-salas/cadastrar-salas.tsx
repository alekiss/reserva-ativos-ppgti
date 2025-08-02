import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  MenuItem,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { toast } from "react-toastify";
import ModalConfirmarCadastro from "../../../../components/modals/modal-confirmar-cadastro";
import ConfirmacaoCadastroSalas from "./confirmacao-cadastro-salas";
import { TipoConfirmacao } from "../../../../types/tipo-confirmacao";
import { TipoSalasProps } from "../../../../types/salas";
import {
  getTiposSalas,
  portCadastrarSala,
} from "../../../../services/cadastro-service";
import Loading from "../../../../components/loading/loading";

interface SalaCriada {
  nome: string;
  local: string;
  capacidade: string;
}

const CadastrarSalas = () => {
  const [openModal, setOpenModal] = useState(false);
  const [filtros, setFiltros] = useState({
    nomeSala: "",
    tipoSalasId: "",
    disponivel: "sim",
    bloco: "",
    capacidade: "",
  });
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [sucesso, setSucesso] = useState(false);
  const [salaCriada, setSalaCriada] = useState<SalaCriada | null>(null);
  const [tiposSalasId, setTiposSalasId] = useState<TipoSalasProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    tiposSalasLista();
  }, []);

  const tiposSalasLista = async () => {
    try {
      const response = await getTiposSalas();
      setTiposSalasId(response.data);
    } catch {
      toast.error("Erro ao buscar tipos de salas");
    }
  };

  const handleChange =
    (field: keyof typeof filtros) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setFiltros((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const validar = () => {
    const novos: Record<string, boolean> = {
      nomeSala: !filtros.nomeSala.trim(),
      bloco: !filtros.bloco.trim(),
      tipoSalasId: !filtros.tipoSalasId,
      disponivel: !filtros.disponivel,
      capacidade: !/^[1-9]\d*$/.test(filtros.capacidade),
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

  const handleCadastrarSala = async () => {
    setLoading(true);
    const { nomeSala, disponivel, bloco, capacidade, tipoSalasId } = filtros;

    const cadastro = {
      nome: nomeSala,
      disponivel: disponivel === "sim",
      bloco,
      capacidadePessoas: Number(capacidade),
      tipoAtivoId: tipoSalasId,
    };

    try {
      await portCadastrarSala(cadastro);
      setSucesso(true);
      setOpenModal(false);
      setSalaCriada({
        nome: nomeSala,
        local: bloco,
        capacidade: capacidade,
      });
      setLoading(false);
    } catch {
      setLoading(false);
      toast.error("Erro ao confirmar cadastro.");
    }
  };

  if (sucesso && salaCriada) {
    return <ConfirmacaoCadastroSalas salaReservada={salaCriada} />;
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Box display="flex" alignItems="center" mb={3}>
        <AssignmentIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Cadastro de Salas</Typography>
      </Box>

      <Box sx={{ display: "grid", gap: 2 }}>
        <TextField
          label="Nome da Sala"
          value={filtros.nomeSala}
          onChange={handleChange("nomeSala")}
          error={erros.nomeSala}
          helperText={erros.nomeSala ? "Campo obrigatório" : ""}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          select
          label="Tipo de Sala"
          value={filtros.tipoSalasId}
          onChange={handleChange("tipoSalasId")}
          error={erros.tipoSalasId}
          helperText={erros.tipoSalasId ? "Campo obrigatório" : ""}
          fullWidth
        >
          {tiposSalasId.map((tiposSala) => (
            <MenuItem key={tiposSala.id} value={tiposSala.id}>
              {tiposSala.nome}
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

        <TextField
          label="Bloco"
          value={filtros.bloco}
          onChange={handleChange("bloco")}
          error={erros.bloco}
          helperText={erros.bloco ? "Campo obrigatório" : ""}
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <TextField
          label="Capacidade"
          type="number"
          value={filtros.capacidade}
          onChange={handleChange("capacidade")}
          error={erros.capacidade}
          helperText={erros.capacidade ? "Número válido é obrigatório" : ""}
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          fullWidth
        />

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
        handleConfirmarCancelar={handleCadastrarSala}
        tipoConfirmacao={TipoConfirmacao.sala}
      />
    </Box>
  );
};

export default CadastrarSalas;
