const { Post, PostPhoto } = require("../../models/model")
const { filesMove, filesRemove, filesIsImages } = require("../../utils/fileUtils.js")

class PostController {

    createPost = async (req, res) => {
        const person_id = req.user
        const { content } = req.body

        let photos = req.filesArray

        try {

            let isImageFiles = filesIsImages(photos)
            if (!isImageFiles) return res.status(400).json({ message: "the files must be images" })

            const newPost = await Post.create({
                content,
                person_id
            }, { returning: true })
            await newPost.save()

            await PostPhoto.bulkCreate(photos.map(photo => ({
                name: photo.uuidName,
                post_id: newPost.post_id
            })))

            filesMove(photos)

            return res.status(200).json({ message: "post was created", post: newPost })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    getUserPosts = async (req, res) => {
        let { limit, page } = req.query
        let { id: personId } = req.params

        page = page ?? 1
        limit = limit ?? 10

        try {

            const posts = await Post.findAll({
                where: personId && {
                    person_id: personId
                },
                limit: limit,
                offset: page * limit - limit,
                include: [
                    {
                        model: PostPhoto
                    }
                ]
            })


            return res.status(200).json({ message: "posts was found", posts })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    updatePost = async (req, res) => {
        const person_id = req.user

        let { id: postId } = req.params
        let { content, deletedPhotos } = req.body

        let photos = req.filesArray

        deletedPhotos = deletedPhotos ? JSON.parse(deletedPhotos) : null

        try {
            const updatedPost = await Post.update({ content }, {
                where: {
                    post_id: postId,
                    person_id: person_id
                },
                returning: true
            })

            // Удаление фото
            deletedPhotos && await PostPhoto.destroy({
                where: {
                    photo_id: deletedPhotos.map(photo => photo.photo_id)
                }
            })
            deletedPhotos && filesRemove(deletedPhotos.map(photo => ({ uuidName: photo.name })))

            // Добавление изображений
            filesMove(photos)
            await PostPhoto.bulkCreate(photos.map(photo => ({
                name: photo.uuidName,
                post_id: postId
            })))

            return res.status(200).json({ message: "post was updated", updatedPost })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    deletePost = async (req, res) => {
        const person_id = req.user
        let { id: postId } = req.params
        try {

            // Удаление фото
            const postPhotos = await PostPhoto.findAll({
                where: {
                    post_id: postId
                }
            })
            filesRemove(postPhotos.map(photo => ({ uuidName: photo.name })))


            // Удаление поста
            const deletedPost = await Post.destroy({
                where: {
                    post_id: postId,
                    person_id: person_id
                },
                raw: true
            })


            return res.status(200).json({ message: "post was successfuly deleted", deletedPost })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

}

module.exports = new PostController()