import { Box, Typography, Paper, Divider, Stack, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { CadastroUsuarioRequest } from "../../../types/cadastro-usuario";

interface Props {
  usuario: CadastroUsuarioRequest;
}

const ConfirmacaoCadastroUsuario: React.FC<Props> = ({ usuario }) => {
  const navigate = useNavigate();
  return (
    <Box p={4} minHeight="70vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Stack spacing={2} alignItems="center" sx={{ mb: 4, textAlign: "center" }}>
        <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
        <Typography variant="h4" color="success.main">Sucesso!</Typography>
        <Typography color="text.secondary">Usuário cadastrado com sucesso.</Typography>
      </Stack>

      <Paper elevation={2} sx={{ width: 1, maxWidth: 480, borderRadius: 2 }}>
        <Box p={3}>
          <Typography variant="h6">{usuario.nome}</Typography>
          <Divider sx={{ my: 1 }} />
          <Typography><strong>E‑mail:</strong> {usuario.email}</Typography>
          <Typography><strong>Matrícula:</strong> {usuario.matricula}</Typography>
          <Typography><strong>Telefone:</strong> {usuario.telefone}</Typography>
          <Typography><strong>Curso:</strong> {usuario.nivelCurso}</Typography>
          <Typography><strong>Autorizado:</strong> {usuario.autorizado ? "Sim" : "Não"}</Typography>
          <Typography><strong>Perfis:</strong> {usuario.perfis.join(", ")}</Typography>
        </Box>
      </Paper>

      <Box mt={4} display="flex" gap={2} justifyContent="center" flexWrap="wrap">
        <Button variant="contained" color="primary" startIcon={<ArrowBackIcon />} size="large"
          sx={{ textTransform: "none", px:4, py:1.5 }} onClick={() => navigate("/gestao-usuarios")}>
          Voltar para Usuários
        </Button>
        <Button variant="outlined" color="primary" startIcon={<AddIcon />} size="large"
          sx={{ textTransform: "none", px:4, py:1.5 }} onClick={() => navigate("/cadastro-usuarios")}>
          Novo Cadastro
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmacaoCadastroUsuario;
