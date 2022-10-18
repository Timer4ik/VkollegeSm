
import axios, { Axios } from "axios";
import baseUrl from "../../api/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

export const loginInit = () => async (dispatch) => {
    try {
        dispatch({ type: "SET_ERROR", payload: null })
        dispatch({ type: "SET_LOADING", payload: true })

        let user_id = JSON.parse(await AsyncStorage.getItem("user_id"))
        let token = JSON.parse(await AsyncStorage.getItem("token"))

        if (!user_id || !token) {
            throw "no auth"
        }

        dispatch({
            type: "LOGIN", payload: data
        })

        dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: { error: "some erro", isError: true } })
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const login = ({ email, password }) => async (dispatch) => {
    try {
        dispatch({ type: "SET_ERROR", payload: null })
        dispatch({ type: "SET_LOADING", payload: true })

        const { data } = await axios.post(`${baseUrl}/login`, { email, password })

        // await AsyncStorage.setItem("user_id", JSON.stringify(data.person_id))
        // await AsyncStorage.setItem("token", JSON.stringify(data.token))

        await dispatch({
            type: "LOGIN", payload: data
        })

        await dispatch({ type: "SET_LOADING", payload: false })


    } catch (error) {
        let data = await error.response.data

        dispatch({ type: "SET_AUTH_ERRORS", payload: { ...data, isError: true } })
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const logout = async () => (dispatch) => {
    try {
        dispatch({ type: "SET_ERROR", payload: null })
        dispatch({ type: "SET_LOADING", payload: true })

        dispatch({ type: "LOGOUT" })

        dispatch({ type: "SET_LOADING", payload: false })
    } catch (error) {
        dispatch({ type: "SET_ERROR", payload: { message: "error", isError: true } })
        dispatch({ type: "SET_LOADING", payload: false })
    }
}

export const register = ({ name, email, password }) => async (dispatch) => {
    try {
        dispatch({ type: "SET_ERROR", payload: null })
        dispatch({ type: "SET_LOADING", payload: true })

        const { data } = await axios.post(`${baseUrl}/register`, { name, email, password })

        await (async () => {
            const { data } = await axios.post(`${baseUrl}/login`, { email, password })

            await AsyncStorage.setItem("user_id", JSON.stringify(data.person_id))
            await AsyncStorage.setItem("token", JSON.stringify(data.token))

            dispatch({
                type: "LOGIN", payload: data
            })
        })()

        dispatch({ type: "SET_LOADING", payload: false })

    } catch (error) {

        if (!error?.response?.data) {
            return
        }

        let data = await error.response.data

        dispatch({ type: "SET_AUTH_ERRORS", payload: { ...data, isError: true } })
        dispatch({ type: "SET_LOADING", payload: false })
    }
}