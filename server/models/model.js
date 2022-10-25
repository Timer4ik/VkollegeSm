const { DataTypes } = require("sequelize")
const db = require("../db.js")

const Person = db.define("person", {
    person_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING(100), allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: true },
    status: { type: DataTypes.STRING(100), allowNull: true },
    about: { type: DataTypes.STRING(1000), allowNull: true },
    photo: { type: DataTypes.STRING, allowNull: true, defaultValue: "person.jpg" }
}, { freezeTableName: true })

const PostCategory = db.define("category", {
    category_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: true },
    name: { type: DataTypes.STRING, allowNull: false }
}, { freezeTableName: true })

const Post = db.define("post", {
    post_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    title:{ type: DataTypes.STRING(100), allowNull: false },
    content: { type: DataTypes.STRING, allowNull: false },
    views: { type: DataTypes.INTEGER, defaultValue: 0 },
    category_id: { type: DataTypes.INTEGER, allowNull: true }
}, { freezeTableName: true })

const PostPhoto = db.define("post_photo", {
    photo_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { freezeTableName: true })

const Friend = db.define("friend", {
    person_id1: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    person_id2: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    isFriend: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { freezeTableName: true })

const Comment = db.define("comment", {
    comment_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
    person_id: { type: DataTypes.INTEGER, allowNull: false },
    post_id: { type: DataTypes.INTEGER, allowNull: false }
}, { freezeTableName: true })

const Like = db.define("like", {
    person_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
    post_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true },
}, { freezeTableName: true })

Person.hasMany(Post, { foreignKey: "person_id" })
Post.belongsTo(Person, { foreignKey: "person_id" })

Post.hasMany(PostPhoto, { foreignKey: "post_id" })
PostPhoto.belongsTo(Post, { foreignKey: "post_id" })

// Не хватает связи пользователя с друзьями
Person.hasMany(Friend, { foreignKey: "person_id2" })
Friend.belongsTo(Person, { foreignKey: "person_id2" })

Person.hasMany(Comment, { foreignKey: "person_id" })
Comment.belongsTo(Person, { foreignKey: "person_id" })
Post.hasMany(Comment, { foreignKey: "post_id" })
Comment.belongsTo(Post, { foreignKey: "post_id" })

Person.hasMany(Like, { foreignKey: "person_id" })
Like.belongsTo(Person, { foreignKey: "person_id" })
Post.hasMany(Like, { foreignKey: "post_id" })
Like.belongsTo(Post, { foreignKey: "post_id" })

module.exports = { Person, Post, PostPhoto, Friend, Comment, Like, PostCategory }