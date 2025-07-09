import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import { Colaborador } from './colaborador';
import { IPonto } from '../interface/ponto-interface';
import { tipoPontoEnum } from '../config/enum/tipo-ponto-enum';
import { CreatePontoDto } from '../interface/create-ponto-dto';

export class Ponto
  extends Model<IPonto, CreatePontoDto>
  implements IPonto
{
  declare id: number;
  declare id_colaborador: number;
  declare id_tipo: tipoPontoEnum;
  declare created_at?: Date;
  declare deleted_at?: Date | null;
}

Ponto.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    id_colaborador: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: 'colaborador', key: 'id' },
      onDelete: 'CASCADE',
    },
    id_tipo: {
      type: DataTypes.SMALLINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    deleted_at: {
      type: DataTypes.DATE
    },
  },
  {
    sequelize,
    modelName: 'Ponto',
    tableName: 'ponto',
    timestamps: true,
    paranoid: true,             // [joaovictor - 07/07/2025] Habilita deleted_at
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
  },
);

// [joaovictor - 07/07/2025]  Associações colaborador <-> ponto
Colaborador.hasMany(Ponto, { foreignKey: 'id_colaborador' });
Ponto.belongsTo(Colaborador, { foreignKey: 'id_colaborador' });
