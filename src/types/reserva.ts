export type Reserva = {
  id: number;
  data: string;
  horaInicio: string;
  horaFim: string;
  tipo: string;
  local: string;
  imagem: string;
};

export type ReservaItemProps = {
  reserva: Reserva;
  onEditar: () => void;
  onCancelar: () => void;
};

export type DataReserva = {
  dia: string;
  horaInicio: string;
  horaFim: string;
  finalidade: string;
  ativoId: string;
};
