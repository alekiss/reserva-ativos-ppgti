import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { ReservaItemProps } from "../../types/reserva";

const ReservaItem = ({ reserva, onEditar, onCancelar }: ReservaItemProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Card sx={{ display: "flex", mb: 2 }}>
      <CardMedia
        component="img"
        sx={{ width: 180 }}
        image={reserva.imagem}
        alt="Reserva"
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="subtitle1" fontWeight={600}>
          {reserva.tipo}
        </Typography>
        <Typography variant="body2">
          {reserva.data} • {reserva.horaInicio} às {reserva.horaFim}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {reserva.local}
        </Typography>
      </CardContent>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <MoreVertIcon />
      </IconButton>
      <Menu open={open} anchorEl={anchorEl} onClose={() => setAnchorEl(null)}>
        <MenuItem onClick={onEditar}>Editar</MenuItem>
        <MenuItem onClick={onCancelar}>Cancelar Reserva</MenuItem>
      </Menu>
    </Card>
  );
};

export default ReservaItem;
