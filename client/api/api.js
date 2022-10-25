import axios from "axios"
import baseUrl from "./baseUrl"


export const fetchPerson = async ({ person_id }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/person/${person_id}`)

        return data
    } catch (error) {
        return error
    }
}

export const fetchPosts = async () => {
    try {
        console.log(`${baseUrl}/posts`);
        const { data } = await axios.get(`${baseUrl}/posts`)
        return data
    } catch (error) {
        return error
    }
}

export const fetchPersonPosts = async ({ person_id }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/posts/${person_id}`)

        return data
    } catch (error) {
        return error
    }
}


export const fetchOnePost = async ({ post_id }) => {
    try {
        const { data } = await axios.get(`${baseUrl}/post/${post_id}`)

        return data
    } catch (error) {
        return error
    }
}

export const addPost = async ({ content, photos, category_id }) => {
    try {

        const formData = new FormData()

        formData.append("content", content)
        formData.append("category_id", category_id)
        photos.forEach(photo => {
            formData.append("photos", photo)
        });

        const { data } = await axios.post(`${baseUrl}/post`, formData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        return data
    } catch (error) {
        return error
    }
}





