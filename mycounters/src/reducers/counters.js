import { Actions as C } from '../actions/constants'

const counter = function (state = { name: "", count: 0}, action) {
    if (action.type === C.INCREASE_COUNTER) {
        return state.name === action.name
                ? {...state, count: state.count + 1 }
                : state
    }
    else if (action.type === C.DECREASE_COUNTER) {
        return state.name === action.name
                ? {...state, count: state.count - 1 }
                : state
    }
    else {
        return state;
    }
}

const counters = function (state = [], action) {
    switch(action.type)
    {
        case C.ADD_COUNTER:
            const hasThisCounter = state.some( ctr => ctr.name === action.payload.name)
            return hasThisCounter
                ? state
                :  [
                        ...state,
                        action.payload            
                   ]
        case C.REMOVE_COUNTER:
            return state.filter(ctr => ctr.name !== action.name)

        case C.INCREASE_COUNTER:
        case C.DECREASE_COUNTER:
            return state.map(ctr => counter(ctr, action))

        default:
            return state
    }
}

export default counters