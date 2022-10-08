const jwt = require("jsonwebtoken")

const authCheckMiddleware = async (req,res,next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        if (!token) return res.status(400).json({message:"user doesn't auth"})

        const {person_id} = jwt.decode(token)

        req.user = person_id
        return next()

    } catch (error) {
        return res.status(400).json({message:"user doesn't auth"})
    }
} 

module.exports = authCheckMiddleware