const validationCheckMiddleware = require("../middlewares/validationCheckMiddleware");

module.exports = (validator) => [
    validator,validationCheckMiddleware
]