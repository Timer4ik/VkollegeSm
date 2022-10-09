const { getFilesArray, addUuids } = require("../utils/fileUtils")


module.exports = async (req,res,next) => {
    try {
        let filesArray = addUuids(getFilesArray(req.files?.file) )

        req.filesArray = filesArray
        return next()
    } catch (error) {
        return res.status(400).json({message:error.message,error})
    }
}