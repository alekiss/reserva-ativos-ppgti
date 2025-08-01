export type Reserva = {
  id: string;
  ativoId: string;
  ativoNome: string;
  dia: string;
  inicio: string;
  fim: string;
  status: string;
  finalidade: string;
  usuarioNome: string;
  criadoEm: string | null;
  atualizadoEm: string | null;
};

export type ReservaItemProps = {
  reserva: Reserva;
  onEditar?: () => void; //Adicionar a obrigatoriedade depois
  onCancelar?: () => void; //Adicionar a obrigatoriedade depois
};

export type DataReserva = {
  dia: string;
  horaInicio: string;
  horaFim: string;
  finalidade: string;
  ativoId: string;
};

export type ReservaRequest = DataReserva;
