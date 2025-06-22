import { Box, Card, CardMedia, Typography } from "@mui/material";
import { imagens } from "../../assets/imagens";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";

interface CadastroItemProps {
  nome: string;
  id: string;
  disponibilidade: boolean;
  localizacao: string;
  tipo: "sala" | "equipamento";
  tipoAtivo?: "projetor" | "computador" | "notebook";
  capacidade?: number;
}

const CadastroItem = ({
  nome,
  id,
  disponibilidade,
  localizacao,
  tipo,
  tipoAtivo,
  capacidade,
}: CadastroItemProps) => {
  const key = tipo === "sala" ? "sala" : tipoAtivo ?? "computador";
  const imageSrc = imagens[key];

  return (
    <Card
      sx={{
        display: "flex",
        mb: 2,
        borderRadius: 2,
        boxShadow: 3,
        alignItems: "stretch",
        height: 220,
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: 290 }}
        image={imageSrc}
        alt={nome}
      />
      <Box
        p={2}
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          px={2}
          py={0.5}
          mb={1}
          sx={{
            alignSelf: "flex-start",
            bgcolor: tipo === "sala" ? "primary.light" : "#0A91D1",
            color: "white",
            borderRadius: 2,
            fontSize: "0.80rem",
            fontWeight: 500,
          }}
        >
          {tipo === "sala" ? "Sala" : "Equipamento"}
        </Box>
        <Typography variant="h5">{nome}</Typography>
        <Typography color="text.secondary">Identificador: {id}</Typography>
        <Typography color="text.secondary">Local: {localizacao}</Typography>
        {tipo === "sala" && capacidade != null && (
          <Typography color="text.secondary">
            Capacidade: {capacidade}
          </Typography>
        )}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          {disponibilidade ? (
            <>
              <CheckCircleRoundedIcon color="success" />
              <Typography color="success" ml={1}>
                Disponível
              </Typography>
            </>
          ) : (
            <>
              <DoDisturbRoundedIcon color="error" />
              <Typography color="error" ml={1}>
                Indisponível
              </Typography>
            </>
          )}
        </Box>
      </Box>
    </Card>
  );
};

export default CadastroItem;
