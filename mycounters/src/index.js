// import React from 'react' 
// import { render } from 'react-dom' 
// import CounterCollection from './CounterCollection' 
// import './index.css'
 
// render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))

import {Actions as C, VisibilityFilters} from './constants'
import initialState from './initialState.json'
import storeFactory from './store'

let store = storeFactory(initialState)

store.dispatch({
    type: C.INCREASE_COUNTER,
    name: "Bard level"
})

store.dispatch({
    type: C.ADD_COUNTER,
    payload: {
        name: "Barbarian level",
        count: 4
    }
})

store.dispatch({
    type: C.REMOVE_COUNTER,
    name: "Wizard level"
})

store.dispatch({
    type: C.SET_VISIBILITY_FILTER,
    filter: VisibilityFilters.SHOW_POSITIVE
})