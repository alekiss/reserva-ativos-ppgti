import { Role } from "./role"

export type CadastroUsuarioRequest = {
  nome: string,
  email: string,
  matricula: string,
  senha: string,
  telefone: string,
  nivelCurso: string,
  autorizado: boolean,
  perfis: Role[],
}

export type CadastroUsuarioResponse = Omit<CadastroUsuarioRequest, "senha"> & {
  id: string;
};