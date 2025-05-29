import { DataReserva } from "../types/reserva";
import api from "./api";

export const getReservasID = () =>
  api.get(`/v1/reservas/4d22ecff-a879-4144-b866-1bf3d34cde3e`); //Deixar o ID dinâmico.

export const postReserva = (data: DataReserva) => api.post("/reservas", data);

export const deleteReserva = (id: string) => api.delete(`/reservas/${id}`);

export const getSalas = () => api.get("/v1/ativos/salas");

export const getSalasDisponiveis = (
  dia: string,
  horaInicio: string,
  horaFim: string
) =>
  api.get(
    `/v1/ativos/salas/disponiveis?dia=${dia}&horaInicio=${horaInicio}&horaFim=${horaFim}`
  );

export const getAtivos = (salaId: string) =>
  api.get(`/v1/ativos/equipamentos?salaId=${salaId}page=0&size=20`);

export const getAtivosDisponiveis = (
  dia: string,
  salaId: string,
  horaInicio: string,
  horaFim: string
) =>
  api.get(
    `/v1/ativos/equipamentos/disponiveis?salaId=${salaId}&dia=${dia}&horaInicio=${horaInicio}&horaFim=${horaFim}`
  );
