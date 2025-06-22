import { EquipamentoResponse } from "../types/equipamentos";
import { CadastrarSalaResponse } from "../types/salas";
import api from "./api";

export const getGestaoAtivos = () =>
  api.get(`/v1/reservas/usuario/historico`); // Adicionar endpoint correto

export const getTiposEquipamentos = () => 
  api.get(`/v1/tipo-ativos/equipamento`);

export const getTiposSalas = () =>
  api.get(`/v1/tipo-ativos/sala`);

export const portCadastrarSala = (sala: CadastrarSalaResponse) =>
  api.post(`/v1/admin/ativos/sala`, sala);

export const portCadastrarEquipamento = (equipamento: EquipamentoResponse) =>
  api.post(`/v1/admin/ativos/equipamento`, equipamento);