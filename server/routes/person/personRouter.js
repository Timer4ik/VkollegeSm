const { Router } = require("express")
const PersonController = require("../../controllers/PersonController/PersonController")
const router = Router()

// router.post()
router.get("/person/:id",PersonController.getOnePerson)
router.get("/persons",PersonController.getPersons)
// router.put()

module.exports = router
