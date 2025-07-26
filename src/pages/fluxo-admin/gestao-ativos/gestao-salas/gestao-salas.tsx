import { Box, Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getSalas } from "../../../../services/reserva-service";
import { SalaResponse, TipoSalasProps } from "../../../../types/salas";
import ModalEdicaoSalas from "./modal-edicao-salas";
import ModalDelete from "../../../../components/modals/modal-delete";
import {
  deleteAtivo,
  putAtualizarSala,
} from "../../../../services/gestao-ativos-service";
import Loading from "../../../../components/loading/loading";
import CadastroItem from "../../../../components/cadastro-item/cadastro-item";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import { toast } from "react-toastify";
import { getTiposSalas } from "../../../../services/cadastro-service";
import { useNavigate } from "react-router-dom";

const GestaoSalas = () => {
  const [salas, setSalas] = useState<SalaResponse[]>([]);
  const [salaSelecionada, setSalaSelecionada] = useState<SalaResponse | null>(
    null
  );
  const [filtros, setFiltros] = useState({
    nomeSala: "",
    tipoSalasId: "",
    disponivel: "",
    bloco: "",
    capacidade: "",
  });
  const [erros, setErros] = useState<Record<string, boolean>>({});
  const [openEdit, setOpenEdit] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [tiposSalas, setTiposSalas] = useState<TipoSalasProps[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchSalas = async () => {
    setLoading(true);
    try {
      const resp = await getSalas();
      setSalas(resp.data.conteudo);
    } catch {
      toast.error("Erro ao buscar salas");
    } finally {
      setLoading(false);
    }
  };

  const tiposSalasLista = async () => {
    setLoading(true);
    try {
      const response = await getTiposSalas();
      setTiposSalas(response.data);
    } catch {
      toast.error("Erro ao buscar tipos de salas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSalas();
    tiposSalasLista();
  }, []);

  const handleEditar = (sala: SalaResponse) => {
    setSalaSelecionada(sala);
    setFiltros({
      nomeSala: sala.nome,
      tipoSalasId: sala.tipoAtivoId,
      disponivel: sala.disponivel ? "sim" : "nao",
      bloco: sala.bloco,
      capacidade: sala.capacidadePessoas?.toString() ?? "",
    });
    setErros({});
    setOpenEdit(true);
  };

  const handleConfirmarEdit = async () => {
    if (!salaSelecionada) return;
    setLoading(true);

    const novosErros = {
      nomeSala: !filtros.nomeSala,
      tipoSalasId: !filtros.tipoSalasId,
      disponivel: !filtros.disponivel,
      bloco: !filtros.bloco,
      capacidade: !/^[1-9]\d*$/.test(filtros.capacidade),
    };
    setErros(novosErros);
    if (Object.values(novosErros).some(Boolean)) return;

    const payload = {
      nome: filtros.nomeSala,
      tipoAtivoId: filtros.tipoSalasId,
      disponivel: filtros.disponivel === "sim",
      bloco: filtros.bloco,
      capacidadePessoas: Number(filtros.capacidade),
    };
    try {
      await putAtualizarSala(salaSelecionada.id ?? "", payload);
      toast.success("Sala atualizada com sucesso!");
      setOpenEdit(false);
      fetchSalas();
    } catch {
      toast.error("Erro ao atualizar sala");
    } finally {
      setLoading(false);
      setSalaSelecionada(null);
    }
  };

  const handleDeleteClick = (sala: SalaResponse) => {
    setSalaSelecionada(sala);
    setModalDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!salaSelecionada) return;
    setLoading(true);
    try {
      await deleteAtivo(salaSelecionada.id ?? "");
      toast.success("Sala excluída com sucesso");
      fetchSalas();
    } catch {
      toast.error("Erro ao excluir sala");
    } finally {
      setModalDeleteOpen(false);
      setSalaSelecionada(null);
      setLoading(false);
    }
  };

  const handleIrParaGestaoSalas = () => {
    navigate("/cadastrar-ativos/salas");
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
          <Typography variant="h5">Gestão de Salas</Typography>
        </Box>

        {salas.map((sala) => (
          <CadastroItem
            nome={sala.nome}
            key={sala.tipoAtivoId}
            id={sala.tipoAtivoId}
            disponibilidade={sala.disponivel}
            localizacao={sala.bloco}
            tipo="sala"
            capacidade={sala.capacidadePessoas}
            onEditar={() => handleEditar(sala)}
            onDelete={() => handleDeleteClick(sala)}
          />
        ))}

        <Box mt={2} display="flex" justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            size="large"
            onClick={handleIrParaGestaoSalas}
          >
            Novo Cadastro
          </Button>
        </Box>
      </Box>

      {salaSelecionada && (
        <ModalEdicaoSalas
          open={openEdit}
          onClose={() => setOpenEdit(false)}
          onConfirm={handleConfirmarEdit}
          sala={salaSelecionada}
          tiposSalas={tiposSalas}
          filtros={filtros}
          erros={erros}
          onChange={(field) => (e) =>
            setFiltros({ ...filtros, [field]: e.target.value })}
        />
      )}

      <ModalDelete
        open={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        type="sala"
        nome={salaSelecionada?.nome}
      />
    </Box>
  );
};

export default GestaoSalas;
