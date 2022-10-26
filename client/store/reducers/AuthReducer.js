const initialState = {
    person_id: "",
    token: "",
    error:null,
    message:""
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "SET_AUTH_ERRORS":
            return { ...state, ...action.payload }
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}

export default AuthReducer