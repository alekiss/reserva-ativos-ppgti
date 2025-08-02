import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Button,
  Switch,
  FormControlLabel,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { toast } from "react-toastify";
import { CadastroUsuarioRequest } from "../../../types/cadastro-usuario";
import { postCadastrarUsuario } from "../../../services/cadastro-usuarios";
import Loading from "../../../components/loading/loading";
import ConfirmacaoCadastroUsuario from "./confirmacao-cadastro-usuarios";
import ModalConfirmarCadastro from "../../../components/modals/modal-confirmar-cadastro";
import { TipoConfirmacao } from "../../../types/tipo-confirmacao";

const perfisPossiveis = ["ADMIN", "ALUNO"] as const;
type FormValues = keyof CadastroUsuarioRequest;

const CadastroUsuarios = () => {
  const [openModal, setOpenModal] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [usuarioCriado, setUsuarioCriado] =
    useState<CadastroUsuarioRequest | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CadastroUsuarioRequest>({
    defaultValues: {
      nome: "",
      email: "",
      matricula: "",
      senha: "",
      telefone: "",
      nivelCurso: "",
      autorizado: false,
      perfis: [],
    },
  });

  const onSubmit = (data: CadastroUsuarioRequest) => {
    const usuarioParaCriar = {
      ...data,
      perfis: Array.isArray(data.perfis) ? data.perfis : [data.perfis],
    };
    setUsuarioCriado(usuarioParaCriar);
    setOpenModal(true);
  };

  const confirmarCadastro = async () => {
    if (!usuarioCriado) return;
    setLoading(true);
    try {
      await postCadastrarUsuario(usuarioCriado);
      toast.success("Usuário cadastrado com sucesso!");
      setSucesso(true);
    } catch {
      toast.error("Erro ao cadastrar usuário");
    } finally {
      setLoading(false);
      setOpenModal(false);
    }
  };

  if (loading) return <Loading />;
  if (sucesso && usuarioCriado)
    return <ConfirmacaoCadastroUsuario usuario={usuarioCriado} />;

  const formFields = [
    { name: "nome", label: "Nome completo", type: "text" },
    {
      name: "email",
      label: "E‑mail",
      type: "email",
      rules: {
        required: "E-mail é obrigatório",
        pattern: {
          value: /^\S+@\S+\.\S+$/,
          message: "Formato de e-mail inválido. Ex: usuario@dominio.com",
        },
      },
    },
    { name: "matricula", label: "Matrícula", type: "text" },
    { name: "senha", label: "Senha", type: "password" },
    { name: "telefone", label: "Telefone", type: "text" },
    { name: "nivelCurso", label: "Nível / Curso", type: "text" },
  ];

  return (
    <Box p={4} maxWidth="800px" mx="auto">
      <Box display="flex" alignItems="center" mb={3}>
        <AssignmentIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Cadastro de Usuário</Typography>
      </Box>

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: "grid", gap: 2 }}>
        {formFields.map((fld) => (
          <Controller
            key={fld.name}
            name={fld.name as FormValues}
            control={control}
            rules={fld.rules || { required: `${fld.label} é obrigatório` }}
            render={({ field }) => (
              <TextField
                {...field}
                type={fld.type}
                label={fld.label}
                error={!!errors[fld.name as FormValues]}
                helperText={(errors[fld.name as FormValues]?.message as string) || ""}
                fullWidth
              />
            )}
          />
        ))}

        <Controller
          name="autorizado"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Switch {...field} checked={field.value} />}
              label="Usuário autorizado"
            />
          )}
        />

        <Controller
          name="perfis"
          control={control}
          rules={{ required: "Selecione um perfil" }}
          render={({ field }) => (
            <TextField
              {...field}
              select
              label="Perfis"
              error={!!errors.perfis}
              helperText={(errors.perfis?.message as string) || ""}
              fullWidth
              value={field.value[0] || ""}
              onChange={(e) => field.onChange([e.target.value])}
            >
              {perfisPossiveis.map((r) => (
                <MenuItem key={r} value={r}>
                  {r.toUpperCase()}
                </MenuItem>
              ))}
            </TextField>
          )}
        />

        <Box textAlign="center" mt={2}>
          <Button variant="contained" color="primary" size="large" type="submit">
            Cadastrar
          </Button>
        </Box>
      </Box>

      <ModalConfirmarCadastro
        openCancelar={openModal}
        handleFecharCancelar={() => setOpenModal(false)}
        handleConfirmarCancelar={confirmarCadastro}
        tipoConfirmacao={TipoConfirmacao.usuario}
      />
    </Box>
  );
};

export default CadastroUsuarios;