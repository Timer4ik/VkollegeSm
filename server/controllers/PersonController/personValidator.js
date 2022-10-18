const { check } = require("express-validator")
const createValidator = require("../../helpers/createValidator")

const personEditValidator = createValidator([
    check("status","Статус не может быть больше 100 символов").isLength({min:1,max:100}),
    check("about","Описание не может быть больше 1000 символов").isLength({min:1,max:1000}),
    check("name","Имя должно содержать не более 100 символов").isLength({min:1,max:100}).matches(/[A-Za-zА-Яа-я]/gm),
    check("birthDate","Некорректная дата рождения").isDate(),
])

module.exports = {personEditValidator}