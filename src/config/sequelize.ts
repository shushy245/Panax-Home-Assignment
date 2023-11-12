import { Sequelize } from "sequelize";

// Make sure to add your local postgres user details below to connect to the db
const sequelize = new Sequelize("postgres", "postgres", "Shsh12345", {
  host: "localhost",
  dialect: "postgres",
});

export default sequelize;

export const connectToDatabase = async () => sequelize.authenticate();
