import { Role } from "./role";

export type UsuarioRequest = {
  nome: string;
  email: string;
  matricula: string;
  senha: string;
  telefone: string;
  nivelCurso: string;
  autorizado: boolean;
  perfis: Role[];
};

export type UsuarioResponse = Omit<UsuarioRequest, "senha"> & {
  id: string;
};

export type UsuarioUpdateRequest = Omit<UsuarioRequest, "senha"> & {
    senha?: string;
};
