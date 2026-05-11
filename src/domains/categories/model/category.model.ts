import { sequelize } from '../../../infra/database/models';
import { DataTypes, Model } from 'sequelize';

class CategoryModel extends Model {
  declare id?: number;
  declare name?: string;
}

CategoryModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
      unique: 'nome_UNIQUE',
      field: 'nome'
    }
  },
  {
    sequelize,
    tableName: 'categorias',
    timestamps: false,
    indexes: [
      {
        name: 'PRIMARY',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'id' }]
      },
      {
        name: 'nome_UNIQUE',
        unique: true,
        using: 'BTREE',
        fields: [{ name: 'nome' }]
      }
    ]
  }
);

export default CategoryModel;
