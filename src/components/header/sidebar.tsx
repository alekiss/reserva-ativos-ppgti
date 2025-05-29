import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Event,
  ExitToApp,
  DomainVerificationSharp,
  CalendarMonth,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const navItems = [
    {
      text: "Home",
      icon: <Home sx={{ color: "white" }} />,
      path: "/home",
      disabled: true,
    },
    {
      text: "Reservar",
      icon: <Event sx={{ color: "white" }} />,
      path: "/reservar",
      disabled: false,
    },
    {
      text: "Minhas Reservas",
      icon: <CalendarMonth sx={{ color: "white" }} />,
      path: "/minhas-reservas",
      disabled: false,
    },
    {
      text: "Check In/Out",
      icon: <DomainVerificationSharp sx={{ color: "white" }} />,
      path: "/check-in-out",
      disabled: true,
    },
  ];

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 65 : 240,
        "& .MuiDrawer-paper": {
          paddingTop: "64px",
          backgroundColor: "primary.main",
          width: collapsed ? 65 : 240,
          overflowX: "hidden",
        },
      }}
    >
      <List>
        {navItems.map((item) => {
          const content = (
            <ListItem
              key={item.text}
              sx={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                cursor: item.disabled ? "not-allowed" : "pointer",
                opacity: item.disabled ? 0.5 : 1,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!collapsed && <ListItemText primary={item.text} />}
            </ListItem>
          );

          return item.disabled ? (
            <Tooltip title="Funcionalidade em breve" key={item.text}>
              <span>{content}</span>
            </Tooltip>
          ) : (
            <Link
              to={item.path}
              key={item.text}
              style={{ textDecoration: "none" }}
            >
              {content}
            </Link>
          );
        })}

        <Tooltip title="Funcionalidade em breve">
          <span>
            <ListItem
              sx={{
                backgroundColor: "transparent",
                color: "white",
                border: "none",
                cursor: "not-allowed",
                opacity: 0.5,
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <ListItemIcon>
                <ExitToApp sx={{ color: "white" }} />
              </ListItemIcon>
              {!collapsed && <ListItemText primary="Sair" />}
            </ListItem>
          </span>
        </Tooltip>
      </List>
    </Drawer>
  );
};

export default Sidebar;
