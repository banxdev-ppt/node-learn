import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';

interface UserAttributes {
  id?: number;
  username: string;
  password: string;
  email: string;
  address: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserModelStatic = ModelStatic<UserModel>;

export default (sequelize: Sequelize) => {
  const User = sequelize.define<UserModel>(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      address: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
    },
    {
      tableName: 'users',
      timestamps: true,
    }
  );

  return User;
};
