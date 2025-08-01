import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Box,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { Reserva } from "../../types/reserva";

interface ReservaItemProps {
  reserva: Reserva;
  onEditar: (reserva: Reserva) => void;
  onCancelar: (reserva: Reserva) => void;
}

const ReservaItem = ({ reserva, onEditar, onCancelar }: ReservaItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 180 }}
        image={"https://blog.woba.com.br/wp-content/uploads/2021/11/creative-space-coworking-1024x768.jpeg"}
        alt="Reserva"
      />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography variant="subtitle1" fontWeight={600}>
            {reserva.ativoNome}
          </Typography>
          <Typography variant="body2">
            {reserva.dia} • {reserva.inicio} às {reserva.fim}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {reserva.finalidade}
          </Typography>
        </CardContent>
      </Box>
      <Box sx={{ display: "flex", alignItems: "start", pr: 2, pt: 2 }}>
        <IconButton onClick={handleMenuOpen}>
          <MoreVertIcon />
        </IconButton>
        <Menu
          open={open}
          anchorEl={anchorEl}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          <MenuItem onClick={() => { handleMenuClose(); onEditar(reserva); }}>Editar</MenuItem>
          <MenuItem onClick={() => { handleMenuClose(); onCancelar(reserva); }} sx={{ color: 'error.main' }}>Cancelar Reserva</MenuItem>
        </Menu>
      </Box>
    </Card>
  );
};

export default ReservaItem;