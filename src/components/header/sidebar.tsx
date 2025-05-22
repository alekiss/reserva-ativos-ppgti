import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  Home,
  Event,
  ExitToApp,
  DomainVerificationSharp,
  CalendarMonth,
} from "@mui/icons-material";
import "./sidebar.scss";
import { colors } from "../../styles/variables";
import { Link } from "react-router-dom";

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const navItems = [
    { text: "Home", icon: <Home sx={{ color: "white" }} />, path: "/home" },
    {
      text: "Reservar",
      icon: <Event sx={{ color: "white" }} />,
      path: "/reservar",
    },
    {
      text: "Minhas Reservas",
      icon: <CalendarMonth sx={{ color: "white" }} />,
      path: "/minhas-reservas",
    },
    {
      text: "Check In/Out",
      icon: <DomainVerificationSharp sx={{ color: "white" }} />,
      path: "/check-in-out",
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 65 : 240,
        "& .MuiDrawer-paper": {
          marginTop: "64px",
          backgroundColor: colors.darkGreen,
          width: collapsed ? 65 : 240,
          overflowX: "hidden",
          cursor: "pointer",
        },
      }}
    >
      <List>
        {navItems.map((item) => (
          <Link to={item.path}>
            <ListItem
              component="button"
              key={item.text}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItem>
          </Link>
        ))}
        <ListItem
          component="button"
          key="logout"
          sx={{
            backgroundColor: "transparent",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          <ListItemIcon>
            <ExitToApp sx={{ color: "white" }} />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Sair" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
