import { sequelize } from '../../../infra/database/models';
import { DataTypes, Model } from 'sequelize';
import UserModel from '../../users/models/user.model';
import CategoryModel from '../../categories/model/category.model';

class RecipeModel extends Model {
  declare id?: number;
  declare id_user: number;
  declare id_category?: number;
  declare name?: string;
  declare preparation_time_minutes?: number;
  declare servings?: number;
  declare preparation_method: string;
  declare ingredients?: string;
  declare created_at?: Date;
  declare updated_at?: Date;
}

RecipeModel.init(
  {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'usuarios',
        key: 'id'
      },
      field: 'id_usuarios'
    },
    id_category: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'categorias',
        key: 'id'
      },
      field: 'id_categorias'
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true,
      field: 'nome'
    },
    preparation_time_minutes: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'tempo_preparo_minutos'
    },
    servings: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      field: 'porcoes'
    },
    preparation_method: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: 'modo_preparo'
    },
    ingredients: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'ingredientes'
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
    tableName: 'receitas',
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
        name: 'fk_receitas_1_idx',
        using: 'BTREE',
        fields: [{ name: 'id_user' }]
      },
      {
        name: 'fk_receitas_2_idx',
        using: 'BTREE',
        fields: [{ name: 'id_category' }]
      }
    ]
  }
);

RecipeModel.belongsTo(UserModel, {
  as: 'usuario',
  foreignKey: 'id_user'
});

RecipeModel.belongsTo(CategoryModel, {
  as: 'categoria',
  foreignKey: 'id_category'
});

export default RecipeModel;
