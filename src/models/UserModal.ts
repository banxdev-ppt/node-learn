import { Model, DataTypes, Sequelize, ModelStatic } from 'sequelize';

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  email: string;
  address: string;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserModelStatic = ModelStatic<UserModel>;

export default (sequelize: Sequelize) => {
  const User = sequelize.define<UserModel>(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
      address: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    {
      tableName: 'users',
      timestamps: false,
    }
  );

  return User;
};
