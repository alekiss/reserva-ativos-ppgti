import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  FormControl,
  FormControlLabel,
  Switch,
  SelectChangeEvent,
} from "@mui/material";
import { UsuarioRequest, UsuarioResponse } from "../../../types/gestao-usuarios";
import { Role } from "../../../types/role";

type ModalEdicaoUsuariosProps = {
  usuario: UsuarioResponse | null;
  filtros: UsuarioRequest;
  openModal: boolean;
  handleFechar: () => void;
  handleConfirmar: () => void;
  handleChange: (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSwitchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (event: SelectChangeEvent<string>) => void;
};

const perfisPossiveis: Role[] = ["ADMIN", "ALUNO"];

const ModalEdicaoUsuarios = ({
  usuario,
  filtros,
  openModal,
  handleFechar,
  handleConfirmar,
  handleChange,
  handleSwitchChange,
  handleSelectChange,
}: ModalEdicaoUsuariosProps) => {
  if (!usuario) return null;

  return (
    <Box display="flex" justifyContent="center">
      <Dialog open={openModal} onClose={handleFechar} fullWidth maxWidth="sm">
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={2} p={2}>
            <TextField
              label="Nome Completo"
              value={filtros.nome}
              onChange={handleChange("nome")}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="E-mail"
              value={filtros.email}
              onChange={handleChange("email")}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Matrícula"
              value={filtros.matricula}
              onChange={handleChange("matricula")}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Telefone"
              value={filtros.telefone}
              onChange={handleChange("telefone")}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              label="Nível / Curso"
              value={filtros.nivelCurso}
              onChange={handleChange("nivelCurso")}
              fullWidth
              slotProps={{ inputLabel: { shrink: true } }}
            />
            <TextField
              select
              label="Perfis"
              value={filtros.perfis[0] || ""}
              onChange={handleSelectChange as React.ChangeEventHandler<HTMLInputElement>}
              fullWidth
            >
              {perfisPossiveis.map((perfil) => (
                <MenuItem key={perfil} value={perfil}>
                  {perfil}
                </MenuItem>
              ))}
            </TextField>
            <FormControl>
              <FormControlLabel
                control={
                  <Switch
                    checked={filtros.autorizado}
                    onChange={handleSwitchChange}
                    color="primary"
                  />
                }
                label="Usuário Autorizado"
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions sx={{ padding: 2 }}>
          <Button variant="contained" color="error" onClick={handleFechar} sx={{ px: 3 }}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleConfirmar} sx={{ px: 3 }}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ModalEdicaoUsuarios;