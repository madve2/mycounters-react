// import React from 'react' 
// import { render } from 'react-dom' 
// import CounterCollection from './CounterCollection' 
// import './index.css'
 
// render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))

import C from './constants' 
import initialState from './initialState.json' 
import { counter } from './store/reducers' 
 
const state = initialState 
 
const action = { 
    type: C.INCREASE_COUNTER, 
    name: "Bard level" 
} 
 
const nextState = counter(state, action);
 
console.log(state); 
console.log(nextState); 