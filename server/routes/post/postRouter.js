const { Router } = require("express")
const PostController = require("../../controllers/PostController/PostController.js")
const { postCreateValidator, postUpdateValidator, postCommentValidator } = require("../../controllers/PostController/postValidator.js")
const authCheckMiddleware = require("../../middlewares/authCheckMiddleware.js")
const filesToArrayMiddleware = require("../../middlewares/filesToArrayMiddleware.js")
const validationCheckMiddleware = require("../../middlewares/validationCheckMiddleware.js")
const router = Router()

router.post("/post", authCheckMiddleware, postCreateValidator, filesToArrayMiddleware, PostController.createPost)

router.get("/posts/:id", PostController.getUserPosts)
router.get("/posts", PostController.getPosts)
router.get("/post/:id", PostController.getUserPost)

router.delete("/post/:id", authCheckMiddleware, PostController.deletePost)

router.put("/post/:id", authCheckMiddleware, postUpdateValidator, filesToArrayMiddleware, PostController.updatePost)
// router.get("/persons",PersonController.getPersons)
// router.put()
router.post("/post/comment/:id", authCheckMiddleware, postCommentValidator, PostController.commentPost)
router.get("/post/comment/:id", PostController.getPostCommets)
router.delete("/post/comment/:id", authCheckMiddleware, PostController.deletePostComment)

router.post("/post/like/:id", authCheckMiddleware, PostController.likePost)

module.exports = router
