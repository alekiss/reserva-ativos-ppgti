import { DataReserva, ReservaRequest } from "../types/reserva";
import api from "./api";

export const getMinhasReservas = () =>
  api.get(`/v1/reservas/usuario/historico`);

export const postReserva = (data: DataReserva) => api.post("/v1/reservas", data);

export const getSalas = () => api.get("/v1/ativos/salas");

export const getSalasDisponiveis = (
  dia: string,
  horaInicio: string,
  horaFim: string
) =>
  api.get(
    `/v1/ativos/salas/disponiveis?dia=${dia}&horaInicio=${horaInicio}&horaFim=${horaFim}`
  );
  
  export const getEquipamentos = (salaId: string) =>
    api.get(`/v1/ativos/equipamentos?salaId=${salaId}`);
  
  export const getEquipamentosDisponiveis = (
    dia: string,
    salaId: string,
    horaInicio: string,
    horaFim: string
  ) =>
    api.get(
      `/v1/ativos/equipamentos/disponiveis?salaId=${salaId}&dia=${dia}&horaInicio=${horaInicio}&horaFim=${horaFim}`
    );
    
  export const getReservasId = (id: string) =>
      api.get(`/v1/reservas/usuario/${id}`);

  export const deleteReserva = (id: string) => api.delete(`/v1/reservas/${id}`);

export const putReserva = (id: string, data: ReservaRequest) =>
  api.put(`/v1/reservas`, data, {
    params: {
      idReserva: id,
    },
  });