import {
  Box,
  Card,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { imagens } from "../../assets/imagens";
import DoDisturbRoundedIcon from "@mui/icons-material/DoDisturbRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
interface CadastroItemProps {
  nome: string;
  id: string;
  disponibilidade: boolean;
  localizacao: string;
  tipo: "sala" | "equipamento";
  tipoAtivo?: "projetor" | "computador" | "notebook";
  capacidade?: number;
  onEditar?: () => void
  onDelete?: () => void;
}

const CadastroItem = ({
  nome,
  id,
  disponibilidade,
  localizacao,
  tipo,
  tipoAtivo,
  capacidade,
  onEditar,
  onDelete,
}: CadastroItemProps) => {
  const key = tipo === "sala" ? "sala" : tipoAtivo ?? "computador";
  const imageSrc = imagens[key];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    if (onEditar) onEditar();
    handleMenuClose();
  };
  const handleDelete = () => {
    onDelete?.();
    handleMenuClose();
  };

  return (
    <Card
      sx={{
        position: "relative",
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
        sx={{ width: 290, objectFit: "cover" }}
        image={imageSrc}
        alt={nome}
      />

      <IconButton
        aria-label="mais opções"
        aria-controls={open ? "menu-cadastro-item" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-cadastro-item"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Deletar</MenuItem>
      </Menu>

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
