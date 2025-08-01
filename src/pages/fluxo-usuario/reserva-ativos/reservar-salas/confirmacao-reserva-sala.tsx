import { Box, Typography, Button, Paper, Divider, Stack } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import { Sala } from "../../../../types/salas";

interface Props {
  salaReservada: Sala;
}

const ConfirmacaoReservaSalas = ({ salaReservada }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      p={4}
      minHeight="70vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      bgcolor="background.default"
    >
      <Stack
        spacing={2}
        alignItems="center"
        sx={{ mb: 4, textAlign: "center" }}
      >
        <CheckCircleIcon color="success" sx={{ fontSize: 64 }} />
        <Typography variant="h4" color="success.main">
          Sucesso!
        </Typography>
        <Typography color="text.secondary">
          Sua sala foi reservada com sucesso.
        </Typography>
      </Stack>

      <Paper
        elevation={2}
        sx={{ width: 1, maxWidth: 480, borderRadius: 2, overflow: "hidden" }}
      >
        <Box p={3}>
          <Typography variant="h6" gutterBottom>
            {salaReservada.nome}
          </Typography>
          <Divider sx={{ my: 1 }} />
          <Typography variant="body2">
            <strong>Número de Patrimônio:</strong> {salaReservada.numeroPatrimonio}
          </Typography>
          <Typography variant="body2">
            <strong>Localização:</strong> {salaReservada.pai || "Não informada"}
          </Typography>
          <Typography variant="body2">
            <strong>Capacidade:</strong> {salaReservada.capacidadePessoas || "Não informada"}
          </Typography>
        </Box>
      </Paper>

      <Box
        mt={4}
        display="flex"
        gap={2}
        justifyContent="center"
        flexWrap="wrap"
      >
        <Button
          variant="contained"
          color="primary"
          startIcon={<ArrowBackIcon />}
          size="large"
          sx={{
            textTransform: "none",
            px: 4,
            py: 1.5,
            minWidth: 200,
          }}
          onClick={() => navigate("/minhas-reservas")}
        >
          Minhas Reservas
        </Button>

        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          size="large"
          sx={{
            textTransform: "none",
            px: 4,
            py: 1.5,
            minWidth: 200,
          }}
          onClick={() => navigate("/reservar-ativos")}
        >
          Nova Reserva
        </Button>
      </Box>
    </Box>
  );
};

export default ConfirmacaoReservaSalas;