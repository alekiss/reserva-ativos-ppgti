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