import { CadastroUsuarioRequest } from "../types/cadastro-usuario";
import api from "./api";

export const postCadastrarUsuario = (usuario: CadastroUsuarioRequest) =>
  api.post(`/v1/usuarios`, usuario);