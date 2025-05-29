import { useEffect, useState } from "react";
import { Container, Typography, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Reserva } from "../../types/reserva";
import ReservaItem from "../../components/reserva-item/reserva-item";

const reservasMock: Reserva[] = [
  {
    id: 1,
    data: "2023-10-01",
    horaInicio: "10:00",
    horaFim: "12:00",
    tipo: "Sala de Reunião",
    local: "Sala A",
    imagem: "https://www.iq.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_xlarge/public/harvard-iqss/files/k301_01.png?m=1714725215&itok=IGS1ojuR"
  },
  {
    id: 2,
    data: "2023-10-02",
    horaInicio: "14:00",
    horaFim: "16:00",
    tipo: "Auditório",
    local: "Auditório Principal",
    imagem: "https://www.iq.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_xlarge/public/harvard-iqss/files/k301_01.png?m=1714725215&itok=IGS1ojuR"
  }
];

const MinhasReservas = () => {
  const [reservas, setReservas] = useState<Reserva[]>(reservasMock);
  const [reservaSelecionada, setReservaSelecionada] = useState<Reserva | null>(null);
  const [modalCancelarAberto, setModalCancelarAberto] = useState(false);

  const carregarReservas = async () => {
    // const data = await getReservas();
    // setReservas(data);
  };

  const handleCancelar = (reserva: Reserva) => {
    setReservaSelecionada(reserva);
    setModalCancelarAberto(true);
  };

  const confirmarCancelamento = async () => {
    if (reservaSelecionada) {
      // await cancelarReserva(reservaSelecionada.id);
      // setModalCancelarAberto(false);
      // await carregarReservas();
    }
  };

  const handleEditar = (reserva: Reserva) => {
    // Exibir painel lateral ou navegação para edição
    console.log("Editar reserva:", reserva);
  };

  useEffect(() => {
    carregarReservas();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h5" gutterBottom>Minhas Reservas</Typography>
      {reservas.map((reserva) => (
        <ReservaItem
          key={reserva.id}
          reserva={reserva}
          onCancelar={handleCancelar}
          onEditar={handleEditar}
        />
      ))}

      <Dialog open={modalCancelarAberto} onClose={() => setModalCancelarAberto(false)}>
        <DialogTitle>Confirmar cancelamento?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setModalCancelarAberto(false)}>Fechar</Button>
          <Button color="error" onClick={confirmarCancelamento}>Cancelar Reserva</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default MinhasReservas;
