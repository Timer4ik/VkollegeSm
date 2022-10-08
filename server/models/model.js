const { DataTypes } = require("sequelize")
const db = require("../db.js")

const Person = db.define("person", {
    person_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    birthDate: { type: DataTypes.DATE, allowNull: true },
    status:{type:DataTypes.STRING,allowNull:true},
    about:{type:DataTypes.STRING,allowNull:true},
    photo: { type: DataTypes.STRING, allowNull: true, defaultValue: "person.jpg" }
}, { freezeTableName: true })

const Post = db.define("post", {
    post_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    content: { type: DataTypes.STRING, allowNull: false },
    likes: { type: DataTypes.INTEGER, defaultValue: 0 },
    comments: { type: DataTypes.INTEGER, defaultValue: 0 }
}, { freezeTableName: true })

const PostPhoto = db.define("post_photo", {
    photo_id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false, unique: true }
}, { freezeTableName: true })

const Friend = db.define("friend",{
    
})

Person.hasMany(Post,{foreignKey:"person_id"})
Post.belongsTo(Person, { foreignKey: "person_id" })

Post.hasMany(PostPhoto, { foreignKey: "post_id" })
PostPhoto.belongsTo(Post, { foreignKey: "post_id" })


module.exports = { Person, Post, PostPhoto }