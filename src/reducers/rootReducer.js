import {combineReducers} from 'redux';
import characterActionReducer from './characterActionReducer';
import characterPositionReducer from './characterPositonRedicer';



//Combine all the sub reducers
const rootReducer = combineReducers({
    charaterActions: characterActionReducer,
    characterPosition: characterPositionReducer,
    // todos:todoReducer
})

export default rootReducer