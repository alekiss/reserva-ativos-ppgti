import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu, ExitToApp } from "@mui/icons-material";
import { colors } from "../../styles/variables";

type HeaderProps = {
  onToggleSidebar: () => void;
};
const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <AppBar position="static" className="header" sx={{ backgroundColor: colors.darkGreen }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Reserva de Ativos
        </Typography>
        <Typography variant="body1" sx={{ marginRight: 2 }}>
          Olá, User
        </Typography>
        <IconButton color="inherit">
          <ExitToApp />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
