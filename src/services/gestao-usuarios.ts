import { UsuarioResponse, UsuarioUpdateRequest } from "../types/gestao-usuarios";
import { PagedResponse } from "../types/paged-response";
import api from "./api";

export const putAtualizarUsuario = async (usuarioId: string, data: UsuarioUpdateRequest) => {
  return api.put(`/v1/usuarios/${usuarioId}`, data);
}

export const deleteUsuario = async (usuarioId: string) => api.delete(`/v1/usuarios/${usuarioId}`)

export const getListaUsuarios = async () => {
  return api.get<PagedResponse<UsuarioResponse>>("/v1/usuarios");
}