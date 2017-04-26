import { Actions as C, VisibilityFilters} from '../actions/constants'

const visibilityFilter = function (state = VisibilityFilters.SHOW_ALL, action) {
    switch(action.type)
    {
        case C.SET_VISIBILITY_FILTER:
            return action.filter;
        default:
            return state;
    }
}

export default visibilityFilter