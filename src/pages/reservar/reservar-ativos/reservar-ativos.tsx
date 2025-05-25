import {
  Box,
  Typography,
  TextField,
  MenuItem,
  InputAdornment,
  Button,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CardReserva from "../../../components/card-reserva/card-reserva";
import { useState } from "react";
import ModalConfirmar from "../../../components/modal-confirmar/modal-confirmar";
import { termoAtivos } from "../../../utils/termo";
import SearchIcon from "@mui/icons-material/Search";

const ReservarAtivos = () => {
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
      <Box display="flex" alignItems="center" mb={4}>
        <CalendarMonthIcon sx={{ mr: 1 }} />
        <Typography variant="h5">Reserva de Ativos</Typography>
      </Box>

      <Box
        display="flex"
        flexDirection="column"
        gap={2}
        maxWidth="800px"
        mx="auto"
      >
        <TextField
          label="Dia"
          type="date"
          fullWidth
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
        />

        <Box display="flex" gap={2}>
          <TextField
            label="Início"
            type="time"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
          <TextField
            label="Fim"
            type="time"
            fullWidth
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AccessTimeIcon />
                  </InputAdornment>
                ),
              },
              inputLabel: {
                shrink: true,
              },
            }}
          />
        </Box>

        <TextField select label="Laboratório" fullWidth defaultValue="">
          <MenuItem value="matriz">LAB. 1</MenuItem>
          <MenuItem value="filial">LAB. 2</MenuItem>
          <MenuItem value="filial">LAB. 3</MenuItem>
        </TextField>

        <Box display="flex" justifyContent="flex-end">
          <Button
            color="primary"
            variant="contained"
            fullWidth
            sx={{ padding: 1 }}
            startIcon={<SearchIcon />}
          >
            PESQUISAR
          </Button>
        </Box>
        <Box mt={10}>
          <CardReserva
            imagem="https://www.iq.harvard.edu/sites/projects.iq.harvard.edu/files/styles/os_files_xlarge/public/harvard-iqss/files/k301_01.png?m=1714725215&itok=IGS1ojuR"
            titulo="Máquina 1"
            subtitulo="Código: 123456"
            localizacao="Laboratório de Redes Convergentes"
            onSelecionar={handleSelecionar}
          />
        </Box>
      </Box>

      <ModalConfirmar
        open={openModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmarTermo}
        termo={termoAtivos}
      />
    </Box>
  );
};

export default ReservarAtivos;
