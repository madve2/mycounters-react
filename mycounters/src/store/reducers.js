import C from '../constants' 
 
export const counter = function (state, action) { 
    if (action.type === C.INCREASE_COUNTER) { 
        return { 
            ...state, 
            counters: state.counters.map( 
                ctr => ctr.name === action.name 
                ? {...ctr, count: ctr.count + 1 } 
                : ctr 
            ) 
        } 
    } 
    else if (action.type === C.DECREASE_COUNTER) { 
        //Ugyanaz, mint az előző, csak + helyett -
        return { 
            ...state, 
            counters: state.counters.map( 
                ctr => ctr.name === action.name 
                ? {...ctr, count: ctr.count - 1 } 
                : ctr 
            ) 
        } 
    } 
    else { 
        return state; 
    } 
}

export const counterCollection = function (state, action) { 
    switch(action.type) 
    { 
        case C.ADD_COUNTER: 
            return { 
                ...state, 
                counters: [ 
                    ...state.counters, 
                    action.payload             
                ] 
            } 
        case C.REMOVE_COUNTER: 
            return { 
                ...state, 
                counters: state.counters.filter(ctr => ctr.name !== action.name) 
            } 
        default: 
            return state 
    } 
}