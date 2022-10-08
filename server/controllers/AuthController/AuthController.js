const { Person } = require("../../models/model")
const { validationResult } = require("express-validator")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

class AuthController {

    register = async (req, res) => {

        const { name, email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(400).json({ message: "incorrect data", errors: errors.array() })

        try {
            const emailExist = await Person.findOne({
                where: {
                    email: email
                }
            })
            if (emailExist) return res.status(400).json({ message: "person already exist" })

            const hashedPassword = await bcrypt.hash(password, 7)

            const newPerson = await Person.create({ name, email, password: hashedPassword }, { returning: true })

            return res.json({ message: "person has been created", person: newPerson })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    login = async (req, res) => {

        const { email, password } = req.body

        try {

            const person = await Person.findOne({
                where: {
                    email: email,
                }
            })
            if (!person) return res.status(400).json({ message: "person doesn't exist" })

            const isMatch = await bcrypt.compare(password, person.password)
            if (!isMatch) return res.status(400).json({ message: "invalid password" })

            const token = jwt.sign({ person_id: person.person_id }, process.env.SECRET_KEY, { expiresIn: "24h" })

            return res.status(200).json({ message: "authorization was successful", token })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new AuthController()