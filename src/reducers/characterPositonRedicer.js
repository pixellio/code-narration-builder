const initState = {
    x:0,
    y:0,
    z:0
}

//Define Actions
const characterPositionReducer = (state = initState, action) => {
    switch (action.type) {
        case 'FORWARD':
            return {
                ...state,
                x: state.x + action.payload
            }
        default:
            return state
    }
}

export default characterPositionReducer;