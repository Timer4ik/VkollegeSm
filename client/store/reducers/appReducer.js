const initialState = {
    isLoading: false,
    error: null,
}

const AppReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_LOADING":
            return { ...state, isLoading: action.payload }
        case "SET_ERROR":
            return { ...state, error: action.payload }
        case "SET_PARAMS":
            return {...state,...action.payload}
        default:
            return state
    }
}

export default AppReducer