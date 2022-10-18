const { Router } = require("express")
const PersonController = require("../../controllers/PersonController/PersonController")
const { personEditValidator } = require("../../controllers/PersonController/personValidator")
const authCheckMiddleware = require("../../middlewares/authCheckMiddleware")
const filesToArrayMiddleware = require("../../middlewares/filesToArrayMiddleware")
const router = Router()

// router.post()
router.get("/person/:id",PersonController.getOnePerson)
router.get("/persons",PersonController.getPersons)
router.put("/person/edit",authCheckMiddleware,personEditValidator, filesToArrayMiddleware,PersonController.editPerson)

router.post("/person/friend/:id",authCheckMiddleware,PersonController.addFriend)
router.delete("/person/friend/:id",authCheckMiddleware,PersonController.removeFriend)
// router.put()

module.exports = router
