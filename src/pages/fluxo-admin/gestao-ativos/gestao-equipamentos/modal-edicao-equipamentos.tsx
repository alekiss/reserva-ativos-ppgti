import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import {
  Equipamentos,
  TipoEquipamentosProps,
} from "../../../../types/equipamentos";
import { Sala } from "../../../../types/salas";

type ModalEdicaoEquipamentosProps = {
  salas: Sala[];
  tipoEquipamentos: TipoEquipamentosProps[];
  filtros: {
    nomeEquipamento: string;
    numeroPatrimonio: string;
    numeroSerie: string;
    tipoEquipamentoId: string;
    salaId: string;
    disponivel: string;
  };
  erros: Record<string, boolean>;
  equipamentos: Equipamentos | null;
  openModal: boolean;
  handleFechar: () => void;
  handleConfirmar: () => void;
  handleChange: (
    field: string
  ) => (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalEdicaoEquipamentos = ({
  salas,
  tipoEquipamentos,
  filtros,
  erros,
  equipamentos,
  openModal,
  handleFechar,
  handleConfirmar,
  handleChange,
}: ModalEdicaoEquipamentosProps) => {
  return (
    <Box display="flex" justifyContent="center">
      <Dialog open={openModal} onClose={handleFechar} fullWidth maxWidth="md">
        <DialogTitle>Editar Equipamento</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            <TextField
              label="Nome do Equipamento"
              value={filtros.nomeEquipamento}
              onChange={handleChange("nomeEquipamento")}
              error={erros.nomeEquipamento}
              helperText={erros.nomeEquipamento ? "Campo obrigatório" : ""}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {equipamentos?.nome}
            </TextField>

            <TextField
              label="Número de Patrimônio"
              value={filtros.numeroPatrimonio}
              onChange={handleChange("numeroPatrimonio")}
              error={erros.numeroPatrimonio}
              helperText={erros.numeroPatrimonio ? "Campo obrigatório" : ""}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {equipamentos?.numeroPatrimonio}
            </TextField>

            <TextField
              label="Número de Série"
              value={filtros.numeroSerie}
              onChange={handleChange("numeroSerie")}
              error={erros.numeroSerie}
              helperText={erros.numeroSerie ? "Campo obrigatório" : ""}
              fullWidth
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            >
              {equipamentos?.numeroSerie}
            </TextField>

            <TextField
              select
              label="Tipo de Equipamento"
              value={filtros.tipoEquipamentoId}
              onChange={handleChange("tipoEquipamentoId")}
              error={erros.tipoEquipamentoId}
              helperText={erros.tipoEquipamentoId ? "Campo obrigatório" : ""}
              fullWidth
            >
              {tipoEquipamentos.map((tipoEquipamento) => (
                <MenuItem key={tipoEquipamento.id} value={tipoEquipamento.id}>
                  {tipoEquipamento.nome}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Sala"
              value={filtros.salaId}
              onChange={handleChange("salaId")}
              error={erros.salaId}
              helperText={erros.salaId ? "Campo obrigatório" : ""}
              fullWidth
            >
              {salas.map((sala) => (
                <MenuItem key={sala.id} value={sala.id}>
                  {sala.nome}
                </MenuItem>
              ))}
            </TextField>

            <FormControl>
              <FormLabel>Disponível?</FormLabel>
              <RadioGroup
                row
                value={filtros.disponivel}
                onChange={handleChange("disponivel")}
              >
                <FormControlLabel value="sim" control={<Radio />} label="Sim" />
                <FormControlLabel value="nao" control={<Radio />} label="Não" />
              </RadioGroup>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button variant="contained" color="error" onClick={handleFechar} sx={{px: 3}}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleConfirmar} sx={{px: 3}}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalEdicaoEquipamentos;
