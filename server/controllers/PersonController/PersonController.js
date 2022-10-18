const { Person, Post, PostPhoto, Friend } = require("../../models/model")
const { Op } = require("sequelize")
const { fileUtils, filesIsImages } = require("../../utils/fileUtils.js")

// class Friend {

//     async create({ person_id, friend_id }) {
//         let person = await Person.findOne({
//             where: {
//                 person_id
//             }
//         })
//         let isFirstFriend = person.friends.length === 0

//         let friends = person.friends.split(",")

//         if (isFirstFriend) {
//             person.friends = friendId
//         }
//         else if (!friends.includes(`${friendId}`)) {
//             person.friends = [...friends, friendId].join(",")
//         }

//         await person.save()

//         return res.json({ message: "friend has been added", person })
//     }
//     async save() {

//     }
//     async findAll(where = {
//         person_id: 0,
//         friend_id: 0
//     }) {
//         let { friend_id, person_id } = where
//         this.person = person
//         this.person_id = person_id
//         this.friend_id = friend_id

//         const person = await Person.findOne({
//             where: {
//                 person_id: person_id
//             },
//             include: [{
//                 model: Post,
//                 include: [{
//                     model: PostPhoto
//                 }]
//             }]
//         })

//         let friends = person.friends.split(",")

//         return friends.map(friend => ({
//             person_id, friend_id, save: this.save
//         }))
//     }
// }

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

            const friends = await Friend.findAll({
                where: {
                    person_id1: personId,
                },
                include: [{
                    model: Person,
                }]
            })

            if (!person) return res.status(400).json({ message: "person is not exist" })

            return res.status(200).json({ message: "person was successfuly found", person, friends })
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
                        [Op.like]: `${searchString ? searchString?.trim() : "%%"}%`
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

        const person_id = req.user
        const { status, about, name, birthDate } = req.body
        const photos = req.filesArray

        try {

            let isImageFile = filesIsImages(photos)
            if (!isImageFile) return res.status(400).json({ message: "it's not image file" })

            console.log(photos);
            let updatedPerson = await Person.update({
                status, about, name, birthDate,
                photo: photos[0].uuidName
            }, {
                where: {
                    person_id
                },
                returning: true,
            })

            return res.json({ message: "person updated", updatedPerson: updatedPerson[1][0] })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async addFriend(req, res) {
        const person_id = req.user
        const { id: friendId } = req.params

        try {

            let personInviteYou = await Friend.findOne({
                where: {
                    person_id1: friendId,
                    person_id2: person_id
                }
            })
            if (personInviteYou) {
                personInviteYou.isFriend = true
                await personInviteYou.save()
            }

            let iFriendOrSubscriber = await Friend.create({
                person_id1: person_id,
                person_id2: friendId,
                isFriend: !!personInviteYou
            }, { returning: true })
            await iFriendOrSubscriber.save()

            return res.json({ message: "friend has been added", friend: iFriendOrSubscriber })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    async removeFriend(req, res) {
        const person_id = req.user
        const { id: friendId } = req.params
        try {
            let personInviteYou = await Friend.findOne({
                where: {
                    person_id1: friendId,
                    person_id2: person_id
                }
            })
            if (personInviteYou) {
                personInviteYou.isFriend = false
                await personInviteYou.save()
            }

            let iFriendOrSubscriber = await Friend.destroy({
                where: {
                    person_id1: person_id,
                    person_id2: friendId,
                }
            }, { returning: true })

            return res.json({ message: "friend has been removed", friend: iFriendOrSubscriber })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
}


module.exports = new PersonController()