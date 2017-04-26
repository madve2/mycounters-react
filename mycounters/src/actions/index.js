import { Actions as C } from '../actions/constants' 
 
export const addCounter = (name, count) => { 
    return { 
        type: C.ADD_COUNTER, 
        payload: { name, count } 
    } 
} 
 
export const removeCounter = name => { 
    return { 
        type: C.REMOVE_COUNTER, 
        name: name 
    } 
} 
 
export const increaseCounter = name => { 
    return { 
        type: C.INCREASE_COUNTER, 
        name: name 
    } 
} 
 
export const decreaseCounter = name => { 
    return { 
        type: C.DECREASE_COUNTER, 
        name: name 
    } 
}

export const increaseCounterX5 = name => (dispatch, getState) => { 
    let i = 0; 
    var inv = setInterval( () => { 
        dispatch(increaseCounter(name)) 
        if (++i >= 5) { 
            clearInterval(inv) 
        } 
    }, 1000) 
} 
 
export const setVisibilityFilter = filter => { 
    return { 
        type: C.SET_VISIBILITY_FILTER, 
        filter: filter 
    } 
}