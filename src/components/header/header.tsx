import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Menu } from "@mui/icons-material";

type HeaderProps = {
  onToggleSidebar: () => void;
};
const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <AppBar position="sticky" className="header" sx={{ zIndex: 1201 }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar}>
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          Reserva de Ativos
        </Typography>
        {/* <Typography variant="body1" sx={{ marginRight: 2 }}>
          Olá, User
        </Typography>
        <IconButton color="inherit">
          <ExitToApp />
        </IconButton> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
