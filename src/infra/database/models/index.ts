import { Sequelize } from 'sequelize';

const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const dbName = process.env.DB_NAME as string;
const host = process.env.DB_HOST as string;
const dialect = 'mysql';

let sequelize: Sequelize;
if (process.env.NODE_ENV === 'testing') {
  const dbUserTest = process.env.DB_USER_TEST as string;
  const dbPasswordTest = process.env.DB_PASSWORD_TEST as string;
  const dbNameTest = process.env.DB_NAME_TEST as string;
  const hostTest = process.env.DB_HOST_TEST as string;

  sequelize = new Sequelize(dbNameTest, dbUserTest, dbPasswordTest, {
    dialect: dialect,
    host: hostTest,
    logging: false
  });
} else {
  sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    dialect,
    host
  });
}

export { sequelize };
