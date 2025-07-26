export type Sala = {
  id: string;
  nome: string;
  disponivel: boolean;
  status: string;
  tipoAtivoNome: string;
  capacidadePessoas: number;
  numeroPatrimonio: string;
  pai: string | null;
};

export type TipoSalasProps = {
  id: string;
  nome: string;
};

export type CadastrarSalaResponse = {
  nome: string;
  disponivel: boolean;
  bloco: string;
  capacidadePessoas: number;
  tipoAtivoId: string;
};

export type SalaResponse = CadastrarSalaResponse & {
  id?: string;
};
