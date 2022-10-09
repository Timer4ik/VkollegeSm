const { check } = require("express-validator")
const createValidator = require("../../helpers/createValidator")

const postCreateValidator = createValidator([
    check("content","Контент не может быть пустым").exists(),
])

const postUpdateValidator = createValidator([
    check("content","Контент не может быть пустым").isLength({min:1}),
])

module.exports = {postCreateValidator,postUpdateValidator}