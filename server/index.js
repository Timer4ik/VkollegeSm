require("dotenv").config()
const express = require("express")
const cors = require("cors")
const routes = require("./routes/routes.js")
const db = require("./db.js")
const fileUpload = require("express-fileupload")
const { Friend, Person } = require("./models/model.js")

const app = express()
const PORT = process.env.PORT

app.use(cors())
app.use(express.json())
app.use(fileUploadWithOptions())
app.use(express.static("static\\uploads"))
app.use("/api", routes)


const start = async () => {
    try {
        await db.authenticate()
        await db.sync()

        await app.listen(PORT, () => {
            console.log({ message: "app has started on port http://localhost:5000" });
        })
    } catch (error) {
        console.log({ message: "something went wrong", error });
    }
}
start()

function fileUploadWithOptions() {
    return fileUpload({
        limits: {
            fileSize: 1024 * 1024 * 3,
            files: 12,
        },
        // safeFileNames:/\.(jpg|png|jpeg)$/,
        limitHandler: (req, res) => {
            return res.status(200).json({ message: "file is too big" })
        }
    })
}