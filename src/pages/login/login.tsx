import {
  Box,
  Button,
  Container,
  Typography,
  Stack,
  Alert,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import logoIFPB from "../../assets/logo-ifpb.png";
import logoPPGTI from "../../assets/logo-ppgti.png";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/auth-context";

const Login = () => {
  const { role, setRole } = useAuth();

  const rota = role === "user" ? "/reservar-ativos" : "/cadastrar-ativos";

  return (
    <>
      <Box display="flex" justifyContent="flex-end" pt={2} mr={2} mt={1}>
        <FormControl variant="outlined" size="small">
          <InputLabel id="role-label">Perfil</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Perfil"
            onChange={(e) => setRole(e.target.value as "user" | "admin")}
          >
            <MenuItem value="user">Usuário</MenuItem>
            <MenuItem value="admin">Admin</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Container maxWidth="sm">
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          minHeight="100vh"
          textAlign="center"
          gap={4}
        >
          <Box>
            <Typography variant="h4" fontWeight="bold" color="text.primary">
              Reserva de Ativos
            </Typography>
            <Typography variant="h5" fontWeight="bold" color="text.primary">
              do PPGTI João Pessoa
            </Typography>
          </Box>

          <Typography variant="body1" color="text.secondary">
            Sistema para reserva de salas e computadores do PPGTI. <br />
            Organize seu uso de forma simples e rápida.
          </Typography>

          <Link to={rota}>
            <Button
              variant="contained"
              size="large"
              sx={{
                textTransform: "none",
                ":hover": { backgroundColor: "#162419" },
              }}
            >
              Entrar com SUAP
            </Button>
          </Link>

          <Alert
            icon={<InfoOutlinedIcon fontSize="inherit" />}
            severity="info"
            sx={{
              backgroundColor: "#f9f9f9",
              color: "#555",
              borderRadius: 2,
              px: 2,
              my: 6,
            }}
          >
            Exclusivo para alunos com acesso autorizado pela coordenação
          </Alert>

          <Box mt={4} width="100%">
            <Typography variant="caption" color="text.secondary" gutterBottom>
              ADMINISTRADO POR
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              spacing={4}
            >
              <img src={logoIFPB} alt="IFPB" style={{ height: 60 }} />
              <img src={logoPPGTI} alt="PPGTI" style={{ height: 60 }} />
            </Stack>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default Login;
