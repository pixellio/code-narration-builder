import React from 'react';
import {useSelector, useDispatch} from 'react-redux';

const AnimationSwitch = (props) => {
    const dispatch = useDispatch();

    const removeTodoItem = (todoId) => {
        dispatch({type: 'CHANGE_ANIMATION', payload: "Run"})

    }

    return (
        <li className="collection-item" >
            <span
                onClick={() => {
                removeTodoItem()
            }}
                className="secondary-content">
                <i className="remove-btn material-icons blue-text">clear</i>
            </span>
        </li>
    );
}

export const animationSwitchAction  = (action) => {
    // const dispatch = useDispatch();
    // dispatch({type: 'CHANGE_ANIMATION', payload: action})
    return {type: 'CHANGE_ANIMATION', payload: action}
}

export default AnimationSwitch;