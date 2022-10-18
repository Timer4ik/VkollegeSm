const { Router } = require("express")
const PostController = require("../../controllers/PostController/PostController.js")
const { postCreateValidator, postUpdateValidator } = require("../../controllers/PostController/postValidator.js")
const authCheckMiddleware = require("../../middlewares/authCheckMiddleware.js")
const filesToArrayMiddleware = require("../../middlewares/filesToArrayMiddleware.js")
const validationCheckMiddleware = require("../../middlewares/validationCheckMiddleware.js")
const router = Router()

router.post("/post", authCheckMiddleware, postCreateValidator, filesToArrayMiddleware, PostController.createPost)

router.get("/posts/:id", authCheckMiddleware, PostController.getUserPosts)

router.delete("/post/:id", authCheckMiddleware, PostController.deletePost)

router.put("/post/:id", authCheckMiddleware, postUpdateValidator, filesToArrayMiddleware, PostController.updatePost)
// router.get("/persons",PersonController.getPersons)
// router.put()

module.exports = router
