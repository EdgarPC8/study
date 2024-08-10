import Sequelize from "sequelize";

const sequelize = new Sequelize("study", "root", "", {
  host: "localhost",
  dialect: "mysql",
});


export { sequelize };
