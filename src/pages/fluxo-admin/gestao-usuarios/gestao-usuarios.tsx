import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  SelectChangeEvent,
} from "@mui/material";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AddIcon from "@mui/icons-material/Add";
import Loading from "../../../components/loading/loading";
import { toast } from "react-toastify";
import {
  UsuarioResponse,
  UsuarioRequest,
  UsuarioUpdateRequest,
} from "../../../types/gestao-usuarios";
import ModalEdicaoUsuarios from "./modal-edicao-usuarios";
import ModalDelete from "../../../components/modals/modal-delete";
import { deleteUsuario, getListaUsuarios, putAtualizarUsuario } from "../../../services/gestao-usuarios";
import CardUsuarios from "../../../components/card-usuarios/card-usuarios";
import { Role } from "../../../types/role";

const GestaoUsuarios = () => {
  const [usuarios, setUsuarios] = useState<UsuarioResponse[]>([]);
  const [usuarioSelecionado, setUsuarioSelecionado] =
    useState<UsuarioResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [openModalEdicao, setOpenModalEdicao] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteItem, setDeleteItem] = useState<UsuarioResponse | null>(null);
  const [filtros, setFiltros] = useState<UsuarioRequest>({
    nome: "",
    email: "",
    matricula: "",
    senha: "",
    telefone: "",
    nivelCurso: "",
    autorizado: false,
    perfis: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await getListaUsuarios();
      setUsuarios(response.data.conteudo);
    } catch {
      toast.error("Erro ao buscar a lista de usuários");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (usuario: UsuarioResponse) => {
    setUsuarioSelecionado(usuario);
    setFiltros({
      nome: usuario.nome,
      email: usuario.email,
      matricula: usuario.matricula,
      senha: "",
      telefone: usuario.telefone,
      nivelCurso: usuario.nivelCurso,
      autorizado: usuario.autorizado,
      perfis: usuario.perfis,
    });
    setOpenModalEdicao(true);
  };

  const handleConfirmarEdicao = async () => {
    setLoading(true);
    if (!usuarioSelecionado) return;

    const payload: UsuarioUpdateRequest = {
      nome: filtros.nome,
      email: filtros.email,
      matricula: filtros.matricula,
      telefone: filtros.telefone,
      nivelCurso: filtros.nivelCurso,
      autorizado: filtros.autorizado,
      perfis: filtros.perfis,
    };

    if (filtros.senha.trim() !== "") {
      payload.senha = filtros.senha;
    }

    try {
      await putAtualizarUsuario(usuarioSelecionado.id, payload);
      toast.success("Usuário atualizado com sucesso!");
      setOpenModalEdicao(false);
      await fetchUsuarios();
    } catch (error) {
      console.error("Erro na atualização:", error);
      toast.error("Erro ao atualizar usuário");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (item: UsuarioResponse) => {
    setDeleteItem(item);
    setModalDeleteOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (!deleteItem) return;
    setLoading(true);
    try {
      await deleteUsuario(deleteItem.id);
      toast.success("Usuário excluído com sucesso");
      await fetchUsuarios();
    } catch {
      toast.error("Erro ao excluir usuário");
    } finally {
      setModalDeleteOpen(false);
      setDeleteItem(null);
      setLoading(false);
    }
  };

  const handleIrParaCadastro = () => {
    navigate("/cadastro-usuarios");
  };
  
  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    const {
      target: { value },
    } = event;
    setFiltros({ ...filtros, perfis: [value as Role] });
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
          <Typography variant="h5">Gestão de Usuários</Typography>
        </Box>

        <Box mt={2}>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <CardUsuarios
                key={usuario.id}
                id={usuario.id}
                nome={usuario.nome}
                email={usuario.email}
                matricula={usuario.matricula}
                nivelCurso={usuario.nivelCurso}
                autorizado={usuario.autorizado}
                onEditar={() => handleEditar(usuario)}
                onDelete={() => handleDeleteClick(usuario)}
              />
            ))
          ) : (
            <p>Nenhum usuário cadastrado</p>
          )}
        </Box>

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
            onClick={handleIrParaCadastro}
          >
            Novo Cadastro
          </Button>
        </Box>
      </Box>

      {usuarioSelecionado && (
        <ModalEdicaoUsuarios
          openModal={openModalEdicao}
          handleFechar={() => setOpenModalEdicao(false)}
          usuario={usuarioSelecionado}
          filtros={filtros}
          handleConfirmar={handleConfirmarEdicao}
          handleChange={(field) => (event: React.ChangeEvent<HTMLInputElement>) => {
            setFiltros({ ...filtros, [field]: event.target.value });
          }}
          handleSwitchChange={(event) => {
            setFiltros({ ...filtros, autorizado: event.target.checked });
          }}
          handleSelectChange={handleSelectChange}
        />
      )}

      <ModalDelete
        open={modalDeleteOpen}
        onClose={() => setModalDeleteOpen(false)}
        onConfirm={handleDeleteConfirm}
        type="usuario"
        nome={deleteItem?.nome}
      />
    </Box>
  );
};

export default GestaoUsuarios;