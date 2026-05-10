export class UserEntity {
  public readonly id?: number;
  public name: string;
  public login: string;
  public password: string;
  public created_at?: Date;
  public updated_at?: Date;

  constructor(params: {
    id?: number;
    nome: string;
    login: string;
    senha: string;
    criado_em?: Date;
    alterado_em?: Date;
  }) {
    this.id = params.id;
    this.name = params.nome;
    this.login = params.login;
    this.password = params.senha;
    this.created_at = params.criado_em;
    this.updated_at = params.alterado_em;
  }
}
