const { validationResult } = require("express-validator")

module.exports = (req, res,next) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty) return res.status(400).json({ message: "values are not valid", errors: errors.array() })

        return next()
    } catch (error) {
        return res.status(400).json({ message: error.message, error })
    }
}