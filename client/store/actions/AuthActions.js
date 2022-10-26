
import axios, { Axios } from "axios";
import baseUrl from "../../api/baseUrl";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginInit = () => async (dispatch) => {
    let person_id = JSON.parse(await AsyncStorage.getItem("person_id"))
    let token = JSON.parse(await AsyncStorage.getItem("token"))

    if (!person_id || !token) {
        throw "no auth"
    }

    dispatch({
        type: "LOGIN", payload: data
    })
}

export const login = ({ email, password }) => async (dispatch) => {

    await dispatch({
        type: "SET_LOADING", payload: true
    })

    await dispatch({
        type: "SET_AUTH_ERRORS",
        payload: { error: [], message: "" }
    })

    try {

        const { data } = await axios.post(`${baseUrl}/login`, { email, password })
        // Здесь сохранение в локальном хранилище
        await dispatch({
            type: "LOGIN", payload: data
        })

        await dispatch({
            type: "SET_LOADING", payload: false
        })

    } catch (err) {
        if (!axios.isAxiosError(err))
            return

        let data = await err.response.data
        
        await dispatch({
            type: "SET_AUTH_ERRORS",
            payload: {...data,error:data.errors}
        })
    }
    finally {
        await dispatch({
            type: "SET_LOADING", payload: false
        })
    }

}

export const logout = () => async (dispatch) => {
    dispatch({ type: "LOGOUT" })
}

export const register = ({ name, email, password }) => async (dispatch) => {

    await dispatch({
        type: "SET_LOADING", payload: true
    })

    await dispatch({
        type: "SET_AUTH_ERRORS",
        payload: { error: [], message: "" }
    })

    try {
        await axios.post(`${baseUrl}/register`, { name, email, password })

        const { data } = await axios.post(`${baseUrl}/login`, { email, password })

        dispatch({
            type: "LOGIN", payload: data
        })
    } catch (err) {
        if (!axios.isAxiosError(err))
        return
        
        let data = await err.response.data

        await dispatch({
            type: "SET_AUTH_ERRORS",
            payload: {...data,error:data.errors}
        })
    }
    finally {
        await dispatch({
            type: "SET_LOADING", payload: false
        })
    }
}