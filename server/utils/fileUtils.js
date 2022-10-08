const path = require("path")
const fs = require("fs")
const { v4 } = require("uuid")

let photoPath = path.resolve(__dirname, "..", "static/uploads")

let createPhotoPath = (photo) => {
    try {
        return path.resolve(photoPath, photo.uuidName)
    } catch (error) {
        console.log({message:error.message,error});        
    }
}

// Проверяет что приходит из фронта и помещает в массив
let getFilesArray = (files) => {
    try {
        if (!files) return []
        return Array.isArray(files) ? files : [files]
    } catch (error) {
        console.log({message:error.message,error});
    }
}

// Добавляет в массив объектов уникальное название для файлов 
let addUuids = (files) => {
    try {
        return files.map((file) => (
            {
                ...file,
                uuidName: v4() + "." + file.name.split(".")[1]
            }))
    } catch (error) {
        console.log({ message: error.message, error });
    }
}

// На вход принимает массив с объектами, которые содержат uuidName
let filesMove = (filesWithUuids) => {
    try {
        filesWithUuids.forEach(async (file) => {
            await file.mv(createPhotoPath(file))
        })
    } catch (error) {
        console.log({ message: error.message, error });
    }
}

let filesRemove = (fileNames) => {
    try {
        console.log(fileNames);
        fileNames.forEach(fileName => {
            if (!fs.existsSync(createPhotoPath(fileName))) {
                return
            }
            fs.unlinkSync(createPhotoPath(fileName))
        })
    } catch (error) {
        console.log({ message: error.message, error });
    }
}

let filesIsImages = (files) => {
    let isImage = true
    try {
        for (let i = 0; i < files.length; i++) {
            let extension = files[i].name.split(".")[1]
            switch (extension) {
                case "png":
                case "jpg":
                case "jpeg":
                    break;
                default:
                    isImage = false
                    break;
            }
            break
        }
        return isImage
    } catch (error) {
        console.log({ message: error.message, error });
    }
}
module.exports = { createPhotoPath, getFilesArray, addUuids, filesMove, filesRemove, filesIsImages }