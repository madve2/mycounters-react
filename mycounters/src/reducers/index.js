import counters from './counters'
import visibilityFilter from './visibilityFilter'
import { combineReducers } from 'redux'

const myCountersApp = combineReducers({
  counters,
  visibilityFilter
})

export default myCountersApp