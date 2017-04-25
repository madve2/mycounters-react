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