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
import { SalaResponse, TipoSalasProps } from "../../../../types/salas";

type FiltrosSalas = {
  nomeSala: string;
  bloco: string;
  capacidade: string;
  tipoSalasId: string;
  disponivel: string;
};

type ModalEdicaoSalasProps = {
  tiposSalas: TipoSalasProps[];
  filtros: FiltrosSalas;
  erros: Partial<Record<keyof FiltrosSalas, boolean>>;
  open: boolean;
  sala: SalaResponse | null;
  onClose: () => void;
  onConfirm: () => void;
  onChange: (
    field: keyof FiltrosSalas
  ) => (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const ModalEdicaoSalas = ({
  tiposSalas,
  filtros,
  erros,
  open,
  onClose,
  onConfirm,
  onChange,
  sala,
}: ModalEdicaoSalasProps) => (
  <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
    <DialogTitle>Editar Sala</DialogTitle>
    <DialogContent>
      <Box display="flex" flexDirection="column" gap={2} p={2}>
        <TextField
          label="Nome da Sala"
          value={filtros.nomeSala}
          onChange={onChange("nomeSala")}
          error={!!erros.nomeSala}
          helperText={erros.nomeSala ? "Obrigatório" : ""}
          fullWidth
        >
          {sala?.nome}
        </TextField>
        <TextField
          select
          label="Tipo de Sala"
          value={filtros.tipoSalasId}
          onChange={onChange("tipoSalasId")}
          error={!!erros.tipoSalasId}
          helperText={erros.tipoSalasId ? "Obrigatório" : ""}
          fullWidth
        >
          {tiposSalas.map((t) => (
            <MenuItem key={t.id} value={t.id}>
              {t.nome}
            </MenuItem>
          ))}
        </TextField>
        <FormControl>
          <FormLabel>Disponível?</FormLabel>
          <RadioGroup
            row
            value={filtros.disponivel}
            onChange={onChange("disponivel")}
          >
            <FormControlLabel value="sim" control={<Radio />} label="Sim" />
            <FormControlLabel value="nao" control={<Radio />} label="Não" />
          </RadioGroup>
        </FormControl>
        <TextField
          label="Bloco"
          value={filtros.bloco}
          onChange={onChange("bloco")}
          error={!!erros.bloco}
          helperText={erros.bloco ? "Obrigatório" : ""}
          fullWidth
        >
          {sala?.bloco}
        </TextField>
        <TextField
          label="Capacidade"
          type="number"
          value={filtros.capacidade}
          onChange={onChange("capacidade")}
          error={!!erros.capacidade}
          helperText={erros.capacidade ? "Número válido é obrigatório" : ""}
          fullWidth
        >
          {sala?.capacidadePessoas}
        </TextField>
      </Box>
    </DialogContent>
    <DialogActions sx={{ p: 2 }}>
      <Button variant="outlined" onClick={onClose}>
        Cancelar
      </Button>
      <Button variant="contained" color="primary" onClick={onConfirm}>
        Salvar
      </Button>
    </DialogActions>
  </Dialog>
);

export default ModalEdicaoSalas;
