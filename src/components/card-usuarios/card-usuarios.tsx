import {
  Box,
  Typography,
  IconButton,
  Tooltip,
  Card,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { useState } from "react";
import { green, red } from "@mui/material/colors";

type CardUsuariosProps = {
  id: string;
  nome: string;
  email: string;
  matricula: string;
  nivelCurso: string;
  autorizado: boolean;
  onEditar: () => void;
  onDelete: () => void;
};

const CardUsuarios = ({
  nome,
  email,
  matricula,
  nivelCurso,
  autorizado,
  onEditar,
  onDelete,
}: CardUsuariosProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEditar();
    handleMenuClose();
  };

  const handleDelete = () => {
    onDelete();
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
        height: 180, // Altura ajustada para um card de usuário
      }}
    >
      {/* Imagem/Ícone do Usuário */}
      <Box
        sx={{
          width: 180, // Largura do ícone
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "grey.200",
          borderRadius: "8px 0 0 8px", // Borda arredondada apenas no canto esquerdo
        }}
      >
        <AccountCircleIcon sx={{ fontSize: 100, color: "grey.500" }} />
      </Box>

      {/* Menu de Opções */}
      <IconButton
        aria-label="mais opções"
        aria-controls={open ? "menu-card-usuarios" : undefined}
        aria-haspopup="true"
        onClick={handleMenuOpen}
        sx={{ position: "absolute", top: 8, right: 8 }}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu-card-usuarios"
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <MenuItem onClick={handleEdit}>Editar</MenuItem>
        <MenuItem onClick={handleDelete}>Excluir</MenuItem>
      </Menu>

      {/* Conteúdo do Usuário */}
      <Box
        p={2}
        flex="1"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Typography variant="h5" fontWeight="bold">
          {nome}
        </Typography>
        <Typography color="text.secondary" mb={1}>
          {email}
        </Typography>

        {/* Informações adicionais em uma linha */}
        <Box display="flex" alignItems="center" gap={2}>
          <Typography variant="body2" color="text.secondary">
            Matrícula: {matricula}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Nível: {nivelCurso}
          </Typography>
        </Box>

        {/* Status de Autorização */}
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Tooltip
            title={autorizado ? "Usuário autorizado" : "Usuário não autorizado"}
          >
            {autorizado ? (
              <CheckCircleIcon sx={{ color: green[500], mr: 1 }} />
            ) : (
              <CancelIcon sx={{ color: red[500], mr: 1 }} />
            )}
          </Tooltip>
          <Typography color={autorizado ? green[500] : red[500]}>
            {autorizado ? "Autorizado" : "Não Autorizado"}
          </Typography>
        </Box>
      </Box>
    </Card>
  );
};

export default CardUsuarios;
