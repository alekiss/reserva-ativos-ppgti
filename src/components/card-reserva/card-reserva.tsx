import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardMedia,
  CardActions,
} from "@mui/material";

interface CardReservaProps {
  imagem: string;
  titulo: string;
  subtitulo: string;
  localizacao: string;
  onSelecionar?: () => void;
}

const CardReserva = ({
  imagem,
  titulo,
  subtitulo,
  localizacao,
  onSelecionar,
}: CardReservaProps) => {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: { xs: "column", sm: "row" },
        boxShadow: 3,
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <CardMedia
        component="img"
        sx={{ width: { xs: "100%", sm: 180 }, height: "auto" }}
        image={imagem}
        alt={titulo}
      />

      <Box display="flex" flexDirection="column" flexGrow={1}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {titulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitulo}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {localizacao}
          </Typography>
        </CardContent>

        <CardActions sx={{ justifyContent: "flex-end", pr: 2, pb: 2 }}>
          <Button
            variant="contained"
            onClick={onSelecionar}
          >
            SELECIONAR
          </Button>
        </CardActions>
      </Box>
    </Card>
  );
};

export default CardReserva;
