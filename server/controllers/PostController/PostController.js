const { Post, PostPhoto, Comment, Person, Like, PostCategory } = require("../../models/model")
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

    getUserPost = async (req, res) => {

        const { id: post_id } = req.params

        try {

            const post = await Post.findOne({
                where: {
                    post_id
                },
                include: [{
                    model: PostPhoto
                }, {
                    model: Comment,
                    include: [{
                        model: Person
                    }]
                }, {
                    model: Like
                }, {
                    model: PostCategory
                }]
            })

            return res.status(200).json({ message: "post has been gotten", post })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
    // Добавить сортировку
    getPosts = async (req, res) => {

        let { limit, page, category_id } = req.query
        page = page ?? 1
        limit = limit ?? 10

        try {

            const posts = await Post.findAll({
                limit: limit,
                where: category_id && {
                    category_id: category_id
                },
                offset: page * limit - limit,
                order: [
                    ['views', 'DESC'],
                ], include: [{
                    model: PostPhoto
                }, {
                    model: Comment,
                    include: [{
                        model: Person
                    }]
                }, {
                    model: Like
                }]
            })

            return res.status(200).json({ message: "post has been gotten", posts })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    getUserPosts = async (req, res) => {
        let { limit, page, category_id } = req.query
        let { id: personId } = req.params

        page = page ?? 1
        limit = limit ?? 10

        try {

            const posts = await Post.findAll({
                where: personId && {
                    person_id: personId, category_id: category_id && ""
                },
                limit: limit,
                offset: page * limit - limit,
                include: [{
                    model: PostPhoto
                }, {
                    model: Comment,
                    include: [{
                        model: Person
                    }]
                }, {
                    model: Like
                }]
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

    commentPost = async (req, res) => {
        const person_id = req.user
        const { id: post_id } = req.params
        const { content } = req.body

        try {

            const comment = await Comment.create({
                content,
                person_id,
                post_id
            }, { returning: true })

            await comment.save()

            return res.status(200).json({ message: "comment was created", comment })
        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    getPostCommets = async (req, res) => {

        const { id: post_id } = req.params

        try {

            const comments = await Comment.findAll({
                where: {
                    post_id
                },
                include: {
                    model: Person
                }
            })

            return res.json({ message: "comment has gotten", comments })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    deletePostComment = async (req, res) => {

        const { id: comment_id } = req.params
        const person_id = req.user

        try {

            const deltedComment = await Comment.destroy({
                where: {
                    comment_id,
                    person_id
                }
            })

            return res.json({ message: "comment successfully deleted", deltedComment })

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }

    likePost = async (req, res) => {

        const person_id = req.user
        const { id: post_id } = req.params

        try {

            const foundLike = await Like.findOne({
                person_id,
                post_id
            })

            if (foundLike) {
                await foundLike.destroy()
                return res.json({ message: "post was unliked", isLiked: false })
            } else {
                await Like.create({
                    person_id,
                    post_id
                })
                return res.json({ message: "post was liked", isLiked: true })
            }

        } catch (error) {
            return res.status(400).json({ message: error.message, error })
        }
    }
}


module.exports = new PostController()