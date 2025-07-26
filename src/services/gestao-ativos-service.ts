import { EquipamentoResponse } from "../types/equipamentos";
import { SalaResponse } from "../types/salas";
import api from "./api";

export const putAtualizarEquipamento = async (equipamentoId: string, data: EquipamentoResponse) => {
  return api.put(`/v1/admin/ativos/sala/${equipamentoId}`, data);
}

export const putAtualizarSala = async (salaId: string, data: SalaResponse) => {
  return api.put(`/v1/admin/ativos/sala/${salaId}`, data);
}

export const deleteAtivo = async (idAtivo: string) => api.delete(`/v1/admin/ativos/${idAtivo}`)