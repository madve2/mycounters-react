// import React from 'react' 
// import { render } from 'react-dom' 
// import CounterCollection from './CounterCollection' 
// import './index.css'
 
// render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))

import * as actions from './actions' 
import { VisibilityFilters } from './actions/constants'
import initialState from './initialState.json'
import storeFactory from './store'

let store = storeFactory(initialState)

store.dispatch(actions.increaseCounter("Bard level")) 
 
store.dispatch(actions.addCounter("Barbarian level", 4))

store.dispatch(actions.addCounter("Barbarian level", 4))
 
store.dispatch(actions.removeCounter("Wizard level")) 
 
store.dispatch(actions.setVisibilityFilter(VisibilityFilters.SHOW_POSITIVE))

//store.dispatch(actions.increaseCounterX5("Bard level"))

store.dispatch(actions.clearMessages())

window.store = store; 
window.actions = actions; 