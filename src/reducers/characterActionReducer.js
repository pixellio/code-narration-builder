const initState = {
    action: "Walk"
}

//Define Actions
const characterActionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'CHANGE_ANIMATION':
            return {
                ...state,
                action: action.payload
            }
        default:
            return state
    }
}

export default characterActionReducer;