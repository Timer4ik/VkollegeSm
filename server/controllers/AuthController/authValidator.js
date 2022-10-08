const { check } = require("express-validator")

const registerValidator = [
    check("name","Введите имя пользователя").exists(),
    check("name","Имя пользователя должно быть не меньше 3 символов").isLength({min:3}),
    check("name","Имя пользователя должно быть не больше 100 символов").isLength({max:100}),
    check("email","Некорректный email").exists().isEmail().isLength({min:3,max:100}),
    check("password","Пароль должен содержать не меньше 5 символов и не более 100").exists().isLength({min:5,max:100}),
]

const loginValidator = [
    check("email","Введите email").exists(),
    check("password","Введите пароль").exists(),
]

module.exports = {registerValidator,loginValidator}