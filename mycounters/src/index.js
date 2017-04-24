import React from 'react' 
import { render } from 'react-dom' 
import CounterCollection from './CounterCollection' 
import './index.css'
 
render(<div><h1>MyCounters</h1><CounterCollection /></div>, document.getElementById('root'))