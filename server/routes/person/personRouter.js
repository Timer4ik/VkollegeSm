const { Router } = require("express")
const PersonController = require("../../controllers/PersonController/PersonController")
const authCheckMiddleware = require("../../middlewares/authCheckMiddleware")
const filesToArrayMiddleware = require("../../middlewares/filesToArrayMiddleware")
const router = Router()

// router.post()
router.get("/person/:id",PersonController.getOnePerson)
router.get("/persons",PersonController.getPersons)
router.put("/person/edit",authCheckMiddleware, filesToArrayMiddleware,PersonController.editPerson)
// router.put()

module.exports = router
