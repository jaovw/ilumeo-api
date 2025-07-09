import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';
import { CreateColaboradorDto } from '../interface/create-colaborador-dto';
import { IColaborador } from '../interface/colaborador-interface';

export class Colaborador
  extends Model<IColaborador, CreateColaboradorDto>
  implements IColaborador
{
  declare id: number;
  declare nome: string;
  declare matricula: number;
  declare created_at?: Date;
  declare deleted_at?: Date | null;
}

Colaborador.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nome: {
      type: DataTypes.STRING(120),
      allowNull: false,
    },
    matricula: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    deleted_at: {
      type: DataTypes.DATE,
    },
  },
  {
    sequelize,
    modelName: 'Colaborador',
    tableName: 'colaborador',
    timestamps: true,
    paranoid: true,                 // [joaovictor - 07/07/2025] Habilita deleted_at
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);
