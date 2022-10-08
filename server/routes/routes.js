const {Router} = require("express")
const personRouter = require("./person/personRouter.js")
const authRouter = require("./auth/authRouter.js")
const postRouter = require("./post/postRouter.js")

const router = Router()

router.use(authRouter)
router.use(personRouter)
router.use(postRouter)

module.exports = router
