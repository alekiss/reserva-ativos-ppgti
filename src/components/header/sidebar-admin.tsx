import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from "@mui/material";
import {
  Home,
  ExitToApp,
  AddCircle,
  ListAlt,
  PersonAddAlt1,
  ManageAccounts,
} from "@mui/icons-material";
import { Link, matchPath, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../../context/auth-context";
import ModalConfirmarLogout from "../modals/modal-confirmar-logout";

type SidebarAdminProps = {
  collapsed: boolean;
};

const SidebarAdmin = ({ collapsed }: SidebarAdminProps) => {
  const { pathname } = useLocation();
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => setConfirmOpen(true);

  const handleLogoutConfirm = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  const navItems = [
    { text: "Home", icon: Home, path: "/home", disabled: true },
    {
      text: "Cadastro de Ativos",
      icon: AddCircle,
      path: "/cadastrar-ativos",
      disabled: false,
    },
    {
      text: "Gestão de Ativos",
      icon: ListAlt,
      path: "/gestao-ativos",
      disabled: false,
    },
    {
      text: "Cadastro de Usuários",
      icon: PersonAddAlt1,
      path: "/cadastro-usuarios",
      disabled: false,
    },
    {
      text: "Gestão de Usuários",
      icon: ManageAccounts,
      path: "/gestao-usuarios",
      disabled: false,
    },
  ];

  const isActive = (itemPath: string) =>
    matchPath({ path: itemPath + "/*", end: false }, pathname) !== null;

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? 90 : 240,
        "& .MuiDrawer-paper": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "90px",
          backgroundColor: "primary.main",
          width: collapsed ? 90 : 240,
          overflowX: "hidden",
        },
      }}
    >
      <Box>
        <List>
          {navItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            const listItem = (
              <ListItemButton
                key={item.text}
                component={item.disabled ? "div" : Link}
                to={item.disabled ? undefined : item.path}
                selected={active}
                disabled={item.disabled}
                sx={{
                  display: "flex",
                  flexDirection: collapsed ? "column" : "row",
                  alignItems: "center",
                  justifyContent: collapsed ? "center" : "flex-start",
                  textAlign: collapsed ? "center" : "left",
                  m: 0.5,
                  py: collapsed ? 0.5 : 1.5,
                  px: collapsed ? 0.5 : 2,
                  borderRadius: 2,
                  color: active ? "primary.main" : "white",
                  bgcolor: active ? "white" : "transparent",
                  opacity: item.disabled ? 0.5 : 1,
                  "&:hover": {
                    bgcolor: active ? "white" : "rgba(255,255,255,0.1)",
                  },
                  "&.Mui-selected": {
                    bgcolor: "white",
                    color: "primary.main",
                    px: collapsed ? 2 : 2,
                    py: collapsed ? 1 : 1.5,
                  },
                  "&.Mui-selected:hover": {
                    bgcolor: "white",
                    color: "primary.main",
                  },
                  "& .MuiListItemIcon-root": {
                    color: active ? "primary.main" : "white",
                    minWidth: "auto",
                    mb: collapsed ? 0.5 : 0,
                    mr: collapsed ? 0 : 2,
                    display: "flex",
                    justifyContent: "center",
                  },
                }}
              >
                <ListItemIcon>
                  <Icon fontSize="medium" />
                </ListItemIcon>

                <ListItemText
                  primary={item.text}
                  slotProps={{
                    primary: {
                      sx: {
                        fontSize: collapsed ? "0.7rem" : "1rem",
                        lineHeight: 1.2,
                        textAlign: collapsed ? "center" : "left",
                        whiteSpace: collapsed ? "normal" : "nowrap",
                        wordBreak: "break-word",
                      },
                    },
                  }}
                  sx={{
                    m: 0,
                    p: 0,
                    mt: collapsed ? 0.3 : 0,
                  }}
                />
              </ListItemButton>
            );

            return item.disabled ? (
              <Tooltip
                key={item.text}
                title="Funcionalidade em breve"
                placement="top"
              >
                <span>{listItem}</span>
              </Tooltip>
            ) : (
              listItem
            );
          })}
        </List>
      </Box>

       <Box sx={{ mb: 2 }}>
        <ModalConfirmarLogout
          open={confirmOpen}
          title="Sair"
          description="Deseja realmente sair da aplicação?"
          onClose={() => setConfirmOpen(false)}
          onConfirm={async () => {
            setConfirmOpen(false);
            await handleLogoutConfirm();
          }}
        />
        <ListItemButton
          onClick={handleLogoutClick}
          disabled={false}
          sx={{
            display: "flex",
            flexDirection: collapsed ? "column" : "row",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "flex-start",
            textAlign: collapsed ? "center" : "left",
            m: 0.5,
            py: collapsed ? 0.5 : 1,
            px: collapsed ? 0.5 : 2,
            borderRadius: 2,
            color: "white",
            "&:hover": {
              backgroundColor: "rgba(255,255,255,0.1)",
            },
            "& .MuiListItemIcon-root": {
              minWidth: "auto",
              mb: collapsed ? 0.5 : 0,
              mr: collapsed ? 0 : 2,
              display: "flex",
              justifyContent: "center",
            },
          }}
        >
          <ListItemIcon sx={{ color: "white" }}>
            <ExitToApp fontSize="medium" />
          </ListItemIcon>
          <ListItemText
            primary="Sair"
            slotProps={{
              primary: {
                sx: {
                  fontSize: collapsed ? "0.7rem" : "1rem",
                  lineHeight: 1.2,
                  textAlign: collapsed ? "center" : "left",
                  whiteSpace: "nowrap",
                },
              },
            }}
            sx={{
              m: 0,
              p: 0,
              mt: collapsed ? 0.3 : 0,
            }}
          />
        </ListItemButton>
      </Box>
    </Drawer>
  );
};

export default SidebarAdmin;
