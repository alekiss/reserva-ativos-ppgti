import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CadastroItem from "../../../../components/cadastro-item/cadastro-item";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Loading from "../../../../components/loading/loading";
import {
  getEquipamentos,
  getSalas,
} from "../../../../services/reserva-service";
import { Sala } from "../../../../types/salas";
import { toast } from "react-toastify";
import {
  Equipamentos,
  TipoEquipamentosProps,
} from "../../../../types/equipamentos";
import ModalEdicaoEquipamentos from "./modal-edicao-equipamentos";
import { getTiposEquipamentos } from "../../../../services/cadastro-service";
import {
  deleteAtivo,
  putAtualizarEquipamento,
} from "../../../../services/gestao-ativos-service";
import ModalDelete from "../../../../components/modals/modal-delete";

const GestaoEquipamentos = () => {
  const [salas, setSalas] = useState<Sala[]>([]);
  const [equipamentos, setEquipamentos] = useState<Equipamentos[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [equipamentoSelecionado, setEquipamentoSelecionado] =
    useState<Equipamentos | null>(null);
  const [errosFiltro, setErrosFiltro] = useState({
    salaId: false,
    nomeEquipamento: false,
    numeroPatrimonio: false,
    numeroSerie: false,
    tipoEquipamentoId: false,
    disponivel: false,
  });
  const [erroSala, setErroSala] = useState({
    salaId: false,
  });
  const [filtros, setFiltros] = useState({
    salaId: "",
    nomeEquipamento: "",
    numeroPatrimonio: "",
    numeroSerie: "",
    tipoEquipamentoId: "",
    disponivel: "",
  });
  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(true);
  const [tipoEquipamentos, setTipoEquipamentos] = useState<
    TipoEquipamentosProps[]
  >([]);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteType, setDeleteType] = useState<"sala" | "equipamento">(
    "equipamento"
  );
  const [deleteItem, setDeleteItem] = useState<(typeof equipamentos)[0] | null>(
    null
  );
  const navigate = useNavigate();

  useEffect(() => {
    fetchSalas();
    tiposEquipamentosLista();
  }, []);

  const handleEditar = (equipamento: Equipamentos) => {
    setEquipamentoSelecionado(equipamento);
    setFiltros({
      nomeEquipamento: equipamento.nome,
      numeroPatrimonio: equipamento.numeroPatrimonio,
      numeroSerie: equipamento.numeroSerie,
      tipoEquipamentoId: equipamento.tipoAtivoId,
      salaId: equipamento.pai,
      disponivel: equipamento.disponivel ? "sim" : "nao",
    });
    setOpenModal(true);
  };

  const tiposEquipamentosLista = async () => {
    try {
      const response = await getTiposEquipamentos();
      setTipoEquipamentos(response.data);
    } catch {
      toast.error("Erro ao buscar tipos de equipamentos");
    }
  };

  const fetchSalas = async () => {
    setLoading(true);
    try {
      const response = await getSalas();
      setSalas(response.data.conteudo);
      setLoading(false);
    } catch {
      toast.error("Erro ao buscar salas");
      setLoading(false);
    }
  };

  const fetchEquipamentos = async (salaId: string) => {
    setLoading(true);
    try {
      const response = await getEquipamentos(salaId);
      setEquipamentos(response.data.conteudo);
      setLoading(false);
    } catch {
      toast.error("Erro ao buscar equipamentos disponíveis");
      setLoading(false);
    }
  };

  const handleConfirmar = async () => {
    setLoading(true);
    if (!equipamentoSelecionado) return;

    const novosErros = {
      nomeEquipamento: filtros.nomeEquipamento === "",
      numeroPatrimonio: filtros.numeroPatrimonio === "",
      numeroSerie: filtros.numeroSerie === "",
      tipoEquipamentoId: filtros.tipoEquipamentoId === "",
      salaId: filtros.salaId === "",
      disponivel: filtros.disponivel === "",
    };

    setErrosFiltro(novosErros);

    const payload = {
      nome: filtros.nomeEquipamento,
      disponivel: filtros.disponivel === "sim",
      numeroSerie: filtros.numeroSerie,
      numeroPatrimonio: filtros.numeroPatrimonio,
      tipoAtivoId: filtros.tipoEquipamentoId,
      ativoPaiId: filtros.salaId,
    };

    try {
      await putAtualizarEquipamento(equipamentoSelecionado.id, payload);
      toast.success("Equipamento atualizado com sucesso!");
      setOpenModal(false);
      await fetchEquipamentos(filtros.salaId);
      setLoading(false);
    } catch (error) {
      console.error("Erro na atualização:", error);
      toast.error("Erro ao atualizar equipamento");
      setLoading(false);
    }
  };

  const handleIrParaGestaoAtivos = () => {
    navigate("/cadastrar-ativos");
  };

  const handlePesquisar = () => {
    const { salaId } = filtros;

    const novosErros = {
      salaId: salaId === "",
    };

    setErroSala(novosErros);

    const algumErro = Object.values(novosErros).some((v) => v);
    if (algumErro) {
      toast.error("Preencha todos o campo obrigatório.");
      return;
    }

    toast.error(null);
    fetchEquipamentos(salaId);
    setHasSearched(true);
  };

  const handleDeleteClick = (
    item: (typeof equipamentos)[0],
    type: "equipamento"
  ) => {
    setDeleteType(type);
    setDeleteItem(item);
    setModalDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setLoading(true);

    try {
      await deleteAtivo(deleteItem.id);
      toast.success("Equipamento excluído com sucesso");
      await fetchEquipamentos(filtros.salaId);
    } catch {
      toast.error("Erro ao excluir");
    } finally {
      setModalDeleteOpen(false);
      setDeleteItem(null);
      setLoading(false);
    }
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
          <Typography variant="h5">Gestão de Equipamentos</Typography>
        </Box>

        <TextField
          select
          label="Salas"
          fullWidth
          value={filtros.salaId}
          onChange={(e) => setFiltros({ ...filtros, salaId: e.target.value })}
          error={erroSala.salaId}
          helperText={erroSala.salaId ? "Campo obrigatório" : ""}
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

        <Box mt={8}>
          {equipamentos.length > 0
            ? equipamentos.map((equipamento) => (
                <CadastroItem
                  nome={equipamento.nome}
                  key={equipamento.id}
                  id={equipamento.id}
                  disponibilidade={equipamento.disponivel}
                  localizacao={equipamento.tipoAtivoNome}
                  tipo="equipamento"
                  tipoAtivo={
                    ["projetor", "computador", "notebook"].includes(
                      equipamento.tipoAtivoNome.toLowerCase()
                    )
                      ? (equipamento.tipoAtivoNome.toLowerCase() as
                          | "projetor"
                          | "computador"
                          | "notebook")
                      : undefined
                  }
                  onEditar={() => handleEditar(equipamento)}
                  onDelete={() => handleDeleteClick(equipamento, "equipamento")}
                />
              ))
            : hasSearched && <p>Sala sem equipamentos cadastrados</p>}
        </Box>

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

      {equipamentoSelecionado && (
        <ModalEdicaoEquipamentos
          openModal={openModal}
          handleFechar={() => setOpenModal(false)}
          equipamentos={equipamentoSelecionado}
          tipoEquipamentos={tipoEquipamentos}
          salas={salas}
          filtros={filtros}
          erros={errosFiltro}
          handleConfirmar={handleConfirmar}
          handleChange={(field) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {
              setFiltros({ ...filtros, [field]: event.target.value });
            }}
        />
      )}

      <ModalDelete
        open={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        type={deleteType}
        nome={deleteItem?.nome}
      />
    </Box>
  );
};

export default GestaoEquipamentos;
