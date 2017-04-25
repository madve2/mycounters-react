import { Actions as C, VisibilityFilters} from '../constants'

export const counter = function (state = { name: "", count: 0}, action) {
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

export const counters = function (state = [], action) {
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

export const visibilityFilter = function (state = VisibilityFilters.SHOW_ALL, action) {
    switch(action.type)
    {
        case C.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export const myCountersApp = function (state = { counters: [] }, action) {
    return {
        counters: counters(state.counters, action),
        visibilityFilter: visibilityFilter(state.visibilityFilter, action)
    }
}