import React from 'react' 
import { render } from 'react-dom' 
import Counter from './Counter' 
 
render(<div><h1>MyCounters</h1><Counter name="Warrior level" initialCount={1} /></div>, document.getElementById('root'))