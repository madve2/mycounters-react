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
 
export const setVisibilityFilter = filter => { 
    return { 
        type: C.SET_VISIBILITY_FILTER, 
        filter: filter 
    } 
}