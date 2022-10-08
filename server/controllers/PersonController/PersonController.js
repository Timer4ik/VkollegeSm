const { Person, Post, PostPhoto } = require("../../models/model")
const { Op } = require("sequelize")


class PersonController {

    async getOnePerson(req, res) {
        const { id: personId } = req.params

        try {
            const person = await Person.findOne({
                where: {
                    person_id: personId
                },
                include: [{
                    model: Post,
                    include: [{
                        model: PostPhoto
                    }]
                }]
            })
            if (!person) return res.status(400).json({ message: "person is not exist" })

            return res.status(200).json({ message: "person was successfuly found", person })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async getPersons(req, res) {
        let { page, limit, searchString } = req.query
        page = page ?? 1
        limit = limit ?? 10;

        try {
            let persons = await Person.findAll({
                where: {
                    name: {
                        [Op.like]: `${ searchString? searchString?.trim():"%%"}%`
                    }
                },
                limit: limit,
                offset: page * limit - limit,
            })
            if (!persons.length) {
                persons = await Person.findAll({
                    where: {
                        name: {
                            [Op.like]: `%${searchString.trim()}%`
                        }
                    },
                    limit: limit,
                    offset: page * limit - limit,
                })
            }

            return res.status(200).json({ message: "persons was successfuly found", persons })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    async editPerson(req, res) {

        const { id: personId } = req.params
        const { status,about,name,birthDate } = req.body

        try {



        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new PersonController()