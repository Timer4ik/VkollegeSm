const { Router } = require("express")
const AuthController = require("../../controllers/AuthController/AuthController")
const {registerValidator, loginValidator} = require("../../controllers/AuthController/authValidator")

const router = Router()

// router.post()
router.post("/register", registerValidator, AuthController.register)
router.post("/login",...loginValidator,AuthController.login)
// router.put()

module.exports = router
