import counters from './counters'
import visibilityFilter from './visibilityFilter'
import messages from './messages'
import { combineReducers } from 'redux'

const myCountersApp = combineReducers({
  counters,
  visibilityFilter,
  messages
})

export default myCountersApp