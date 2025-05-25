import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import LayoutHeader from "./components/layout-header/layout-header";
import CheckInOut from "./pages/check-in-out/check-in-out";
import Reservar from "./pages/reservar/reservar";
import ReservarAtivos from "./pages/reservar/reservar-ativos/reservar-ativos";
import ReservarSalas from "./pages/reservar/reservar-salas/reservar-salas";
import MinhasReservas from "./pages/minhas-reservas/minhas-reservas";
import Login from "./pages/login/login";
import theme from "./theme/theme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route element={<LayoutHeader />}>
            <Route path="/home" element={<Home />} />
            <Route path="/reservar" element={<Reservar />} /> //organizar as
            rotas de reserva em um outlet
            <Route path="/reservar/ativos" element={<ReservarAtivos />} />
            <Route path="/reservar/salas" element={<ReservarSalas />} />
            <Route path="/minhas-reservas" element={<MinhasReservas />} />
            <Route path="/check-in-out" element={<CheckInOut />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
