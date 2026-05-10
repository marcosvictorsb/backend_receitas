export class UserEntity {
  public readonly id?: number;
  public readonly name: string;
  public readonly login: string;
  public readonly password: string;
  public readonly created_at?: Date;
  public readonly updated_at?: Date;

  constructor(params: {
    id?: number;
    name: string;
    login: string;
    password: string;
    created_at?: Date;
    updated_at?: Date;
  }) {
    this.id = params?.id;
    this.name = params.name;
    this.login = params.login;
    this.password = params.password;
    this.created_at = params?.created_at;
    this.updated_at = params?.updated_at;
  }
}
