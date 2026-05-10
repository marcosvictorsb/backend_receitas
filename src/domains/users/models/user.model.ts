import { sequelize } from '../../../infra/database/models';
import { DataTypes, Model } from 'sequelize';

class UserModel extends Model {
  declare id?: number;
  declare name: string;
  declare login: string;
  declare password: string;
  declare created_at?: Date;
  declare updated_at?: Date;
}

UserModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true,
      comment: '\n'
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      field: 'nome'
    },
    login: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: 'login_UNIQUE'
    },
    password: {
      type: DataTypes.STRING(100),
      allowNull: false,
      field: 'senha'
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'criado_em'
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'alterado_em'
    }
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: true,
    underscored: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }]
      },
      {
        name: 'login_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'login' }]
      }
    ]
  }
);

export default UserModel;
