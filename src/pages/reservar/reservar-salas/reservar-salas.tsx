import {
  Box,
  Typography,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import CardReserva from "../../../components/card-reserva/card-reserva";
import { useState } from "react";
import ModalConfirmar from "../../../components/modal-confirmar/modal-confirmar";
import { termoAtivos } from "../../../utils/termo";

const ReservarSalas = () => {
const [openModal, setOpenModal] = useState(false);

  const handleSelecionar = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleConfirmarTermo = () => {
    setOpenModal(false);
    console.log("Usuário aceitou o termo");
    // Adicionar lógica para reservar o ativo
  };

  return (
    <Box p={4}>
      <Box display="flex" alignItems="center" mb={5}>
        <CalendarMonthIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Reserva de Salas</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="800px"
        mx="auto"
      >
        <CardReserva
          imagem="https://www.iq.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_xlarge/public/harvard-iqss/files/k301_01.png?m=1714725215&itok=IGS1ojuR"
          titulo="Sala 1"
          subtitulo="Código: 123456"
          localizacao="Laboratório de Redes Convergentes"
          onSelecionar={handleSelecionar}
        />
      </Box>

      <ModalConfirmar
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmarTermo}
        termo={termoAtivos}
      />
    </Box>
  );
}

export default ReservarSalas