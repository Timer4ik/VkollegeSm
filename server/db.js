const {Sequelize} = require("sequelize")

const db = new Sequelize({
    database:"vkollege",
    port:5432,
    host:"localhost",
    dialect:"postgres",
    username:"postgres",
    password:"1234"
})

module.exports = db