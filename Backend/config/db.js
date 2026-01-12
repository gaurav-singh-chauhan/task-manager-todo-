const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT
    }
);

const authDb = async () => {
    try{
        await sequelize.authenticate();
        console.log("Sequelize sucessfully initialized :)");
    } catch(err){
        console.log(`Something went wrong with DB connection ${err}`);
    }
}

module.exports = { sequelize, authDb };