import { Actions as C } from '../actions/constants' 
 
const messages = function (state = [], action) { 
    switch(action.type) 
    { 
        case C.SHOW_MESSAGE: 
            return [ 
                        ...state, 
                        action.message             
                   ] 
        case C.CLEAR_MESSAGES: 
            return [] 
 
        default: 
            return state 
    } 
} 
 
export default messages