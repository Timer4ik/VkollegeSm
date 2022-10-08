const { check } = require("express-validator")

const postCreateValidator = [
    check("content","Контент не может быть пустым").exists(),
]

const postUpdateValidator = [
    check("content","Контент не может быть пустым").isLength({min:1}),
]

module.exports = {postCreateValidator,postUpdateValidator}