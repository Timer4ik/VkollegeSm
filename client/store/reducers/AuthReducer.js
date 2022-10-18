import { Alert } from "react-native"

const initialState = {
    user_id: "",
    token: "",
    errors: [],
    message: "",
    isError: false
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "SET_AUTH_ERRORS":
            Alert.alert(JSON.stringify(action.payload))
            return { ...state, ...action.payload }
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}

export default AuthReducer