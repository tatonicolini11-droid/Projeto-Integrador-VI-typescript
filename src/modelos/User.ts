import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../configuracao/database';
import { IUser } from '../interfaces/IUser';

export class User extends Model<IUser, Optional<IUser, 'id'>> implements IUser {
  declare id: number;
  declare nome: string;
  declare email: string;
}

User.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false },
  },
  { sequelize, tableName: 'users' }
);
