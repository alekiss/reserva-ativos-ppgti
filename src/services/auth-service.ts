import api from "./api";

export const login = (matricula: string, senha: string) =>
  api.post("/v1/auth/login", { matricula, senha });

export const me = () =>
  api.get("/v1/auth/me");

export const refresh = () =>
  api.post("/v1/auth/refresh");

export const logout = () =>
  api.post("/v1/auth/logout");