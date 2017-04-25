// import React from 'react' 
// import { render } from 'react-dom' 
// import CounterCollection from './CounterCollection' 
// import './index.css'
 
// render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))

import {Actions as C, VisibilityFilters} from './constants'
import initialState from './initialState.json' 
import { myCountersApp } from './store/reducers'
 
const state = initialState 
 
const action = { 
    type: C.INCREASE_COUNTER, 
    name: "Bard level" 
} 
 
const nextState = myCountersApp(state, action)
 
const action2 = { 
    type: C.ADD_COUNTER, 
    payload: { 
        name: "Barbarian level", 
        count: 4 
    } 
} 
 
const nextState2 = myCountersApp(nextState, action2)  
 
const action3 = { 
    type: C.REMOVE_COUNTER, 
    name: "Wizard level" 
} 
 
const nextState3 = myCountersApp(nextState2, action3) 

const action4 = { 
    type: C.SET_VISIBILITY_FILTER, 
    filter: VisibilityFilters.SHOW_POSITIVE
} 
 
const nextState4 = myCountersApp(nextState3, action4)

console.log(state) 
console.log(nextState)
console.log(nextState2)
console.log(nextState3)
console.log(nextState4)