import myCountersApp from './reducers' 
import { createStore, applyMiddleware } from 'redux' 
 
const logMessages = store => next => action => {

    let result 
    const logState = state => console.log( 
        `filter: ${state.visibilityFilter} 
         counters: ${state.counters.reduce((str, ctr) => str + "[" + ctr.name + ": " + ctr.count + "] ", "")}` 
    ) 
 
    console.groupCollapsed('dispatching ' + action.type) 
    logState(store.getState()) 
     
    result = next(action) 
     
    logState(store.getState()) 
 
    console.groupEnd() 
     
    return result 
}

export default (initialState={}) => createStore(myCountersApp, initialState, applyMiddleware(logMessages))