import {combineReducers} from 'redux';
import characterActionReducer from './characterActionReducer';
// import counterReducer from './counterReducer';
// import todoReducer from './todoReducer';


//Combine all the sub reducers
const rootReducer = combineReducers({
    charaterActions: characterActionReducer,
    // myCounter: counterReducer,
    // todos:todoReducer
})

export default rootReducer