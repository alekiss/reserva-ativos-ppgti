import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import LayoutHeader from "./components/layout-header/layout-header";
import CheckInOut from "./pages/fluxo-usuario/check-in-out/check-in-out";
import MinhasReservas from "./pages/fluxo-usuario/minhas-reservas/minhas-reservas";
import Login from "./pages/login/login";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./context/auth-context";
import ReservarRotasLayout from "./routes/reservar-rotas-layout";
import CadastrarRotasLayout from "./routes/cadastrar-rotas-layout";
import Cadastrar from "./pages/fluxo-admin/cadastro-ativos/cadastrar";
import CadastrarSalas from "./pages/fluxo-admin/cadastro-ativos/cadastrar-salas/cadastrar-salas";
import Cadastros from "./pages/fluxo-admin/gestao-ativos/gestao-ativos";
import CadastrarEquipamentos from "./pages/fluxo-admin/cadastro-ativos/cadastrar-equipamentos/cadastrar-equipamentos";
import GestaoUsuarios from "./pages/fluxo-admin/gestao-usuarios/gestao-usuarios";
import CadastroUsuarios from "./pages/fluxo-admin/cadastro-usuarios/cadastro-usuarios";
import Reservar from "./pages/fluxo-usuario/reserva-ativos/reservar";
import ReservarSalas from "./pages/fluxo-usuario/reserva-ativos/reservar-salas/reservar-salas";
import ReservaEquipamentos from "./pages/fluxo-usuario/reserva-ativos/reservar-equipamentos/reservar-equipamentos";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route element={<LayoutHeader />}>
              <Route path="/home" element={<Home />} />

              <Route path="/reservar-ativos" element={<ReservarRotasLayout />}>
                <Route index element={<Reservar />} />
                <Route path="equipamentos" element={<ReservaEquipamentos />} />
                <Route path="salas" element={<ReservarSalas />} />
              </Route>

              <Route path="/minhas-reservas" element={<MinhasReservas />} />
              <Route path="/check-in-out" element={<CheckInOut />} />

              <Route path="/cadastrar-ativos" element={<CadastrarRotasLayout />}>
                <Route index element={<Cadastrar />} />
                <Route path="equipamentos" element={<CadastrarEquipamentos />} />
                <Route path="salas" element={<CadastrarSalas />} />
              </Route>

              <Route path="/gestao-ativos" element={<Cadastros />} />
              <Route path="/gestao-usuarios" element={<GestaoUsuarios />} />
              <Route path="/cadastro-usuarios" element={<CadastroUsuarios /> }  />
              
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
