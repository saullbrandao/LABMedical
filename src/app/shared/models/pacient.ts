export type Pacient = {
  id?: string;
  nome: string;
  genero: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  orgaoExpedidor: string;
  estadoCivil: string;
  telefone: string;
  contatoEmergencia: string;
  email?: string;
  alergias?: string;
  cuidadosEspecificos?: string;
  naturalidade: string;
  convenio?: {
    nome: string;
    numero: string;
    validade: string;
  };
  endereco: {
    cep: string;
    cidade: string;
    estado: string;
    logradouro: string;
    numero: string;
    complemento?: string;
    bairro: string;
    referencia?: string;
  };
};
