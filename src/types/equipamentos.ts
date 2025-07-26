export type TipoEquipamentosProps = {
  id: string;
  nome: string;
};

export type EquipamentoResponse = {
  nome: string;
  disponivel: boolean;
  numeroSerie: string;
  numeroPatrimonio: string;
  tipoAtivoId: string;
  ativoPaiId: string;
};

export type EquipamentosDisponiveis = {
  id: string;
  nome: string;
  disponivel: boolean;
  status: string;
  tipoAtivoNome: string;
  capacidadePessoas: null | number;
  numeroPatrimonio: string;
  pai: string | null;
};

export type Equipamentos = {
  id: string;
  nome: string;
  disponivel: boolean;
  status: string;
  tipoAtivoNome: string;
  capacidadePessoas: null | number;
  numeroPatrimonio: string;
  pai: string;
  numeroSerie: string;
  tipoAtivoId: string;
};
