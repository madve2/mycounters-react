import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import CounterCollection from './components/container/CounterCollection'
import initialState from './initialState.json'
import storeFactory from './store'
import './index.css'
import * as actions from './actions'

let store = storeFactory(initialState)

render(<Provider store={store}>
            <div>
                <h1>MyCounters</h1>
                <CounterCollection />
            </div>
       </Provider>, document.getElementById('root'))

window.store = store;
window.actions = actions; 