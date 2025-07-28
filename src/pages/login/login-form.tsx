import { useForm } from "react-hook-form";
import { Box, Typography, TextField, Button, Paper } from "@mui/material";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type LoginFormFields = {
  matricula: string;
  senha: string;
};

const LoginForm = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm<LoginFormFields>();

  const onSubmit = async (data: LoginFormFields) => {
    try {
      await login(data.matricula, data.senha);
      navigate("/home");
    } catch {
      toast.error("Usuário ou senha inválidos. Tente novamente!");
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ backgroundColor: "#f8fafb", px: 2 }}
    >
      <Paper elevation={3} sx={{ p: 5, maxWidth: 450, width: "100%", borderRadius: 3 }}>
        <Box display="flex" alignItems="center" justifyContent="center" mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            Login
          </Typography>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <TextField
            label="Matrícula"
            {...register("matricula", { required: true })}
            error={!!errors.matricula}
            helperText={errors.matricula && "Campo obrigatório"}
            fullWidth
            variant="outlined"
          />

          <TextField
            label="Senha"
            type="password"
            {...register("senha", { required: true })}
            error={!!errors.senha}
            helperText={errors.senha && "Campo obrigatório"}
            fullWidth
            variant="outlined"
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
            disabled={isSubmitting}
            sx={{ mt: 2, textTransform: "none", fontWeight: "bold", py: 1.5 }}
          >
            {isSubmitting ? "Entrando..." : "Entrar"}
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default LoginForm;
