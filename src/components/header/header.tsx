import { AppBar, Toolbar, IconButton, Box } from "@mui/material";
import { Menu } from "@mui/icons-material";
import logo from "./../../assets/logo-reserva-ativo.png";
import { Link } from "react-router-dom";

type HeaderProps = {
  onToggleSidebar: () => void;
};
const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <AppBar position="sticky" className="header" sx={{ zIndex: 1201, py: 2 }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <IconButton
          edge="start"
          color="inherit"
          onClick={onToggleSidebar}
          sx={{ ml: 0 }}
        >
          <Menu />
        </IconButton>
        <Box component={Link} to={"/home"}>
          <img src={logo} alt="Logo" width={150} />
        </Box>
        <Box />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
