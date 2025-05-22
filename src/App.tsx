import { BrowserRouter, Route, Routes } from "react-router-dom";
import RedirectLogin from "./pages/redirect-login/redirect-login";
import Home from "./pages/home/home";
import LayoutHeader from "./components/layout-header/layout-header";
import CheckInOut from "./pages/check-in-out/check-in-out";
import Reserve from "./pages/reserve/reserve";
import MyReservations from "./pages/my-reservations/my-reservations";
import ReserveAssets from "./pages/reserve/reserve-assets/reserve-assets";
import ReserveRooms from "./pages/reserve/reserve-rooms/reserve-rooms";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectLogin />} />
        <Route element={<LayoutHeader />}>
          <Route path="/home" element={<Home />} />
          <Route path="/reservar" element={<Reserve />} /> //organizar as rotas de reserva em um outlet
          <Route path="/reservar/ativos" element={<ReserveAssets />} />
          <Route path="/reservar/salas" element={<ReserveRooms />} />
          <Route path="/minhas-reservas" element={<MyReservations />} />
          <Route path="/check-in-out" element={<CheckInOut />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
