// import React from 'react' 
// import { render } from 'react-dom' 
// import CounterCollection from './CounterCollection' 
// import './index.css'
 
// render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))

import C from './constants' 
import initialState from './initialState.json' 
import { counter, counterCollection } from './store/reducers' 
 
const state = initialState 
 
const action = { 
    type: C.INCREASE_COUNTER, 
    name: "Bard level" 
} 
 
const nextState = counter(state, action);
 
const action2 = { 
    type: C.ADD_COUNTER, 
    payload: { 
        name: "Barbarian level", 
        count: 4 
    } 
} 
 
const nextState2 = counterCollection(nextState, action2);  
 
const action3 = { 
    type: C.REMOVE_COUNTER, 
    name: "Wizard level" 
} 
 
const nextState3 = counterCollection(nextState2, action3); 

console.log(state); 
console.log(nextState); 
console.log(nextState2); 
console.log(nextState3); 