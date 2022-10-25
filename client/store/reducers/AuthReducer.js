const initialState = {
    person_id: "",
    token: ""
}

const AuthReducer = (state = initialState, action) => {
    switch (action.type) {
        case "LOGIN":
            return action.payload
        case "LOGOUT":
            return initialState
        default:
            return state
    }
}

export default AuthReducer