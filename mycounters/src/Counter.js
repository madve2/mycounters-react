import React from 'react' 
import { render } from 'react-dom'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import FaMinusCircle from 'react-icons/lib/fa/minus-circle'
import './Counter.css'
 
class Counter extends React.Component { 
    constructor(props, context) { 
        super(props, context) 
        this.increment = this.increment.bind(this) //developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this 
        this.decrement = this.decrement.bind(this)
 
        this.state = { 
            count: this.props.initialCount 
        } 
    } 
 
    increment() { 
        this.setState( 
            { 
                ...this.state, //bár a state-ben most nincs más mező, így gondoskodunk róla, hogy a jövőben se írjuk felül őket, ha lesznek
                count: this.state.count + 1 
            } 
        ) 
    }

    decrement() { 
        this.setState(  
            { 
                ...this.state, 
                count: this.state.count - 1 
            } 
        ) 
    } 
 
    render() { 
        return <div className="Counter"> 
            <span className="current-count">{ this.state.count }</span> 

            <h2>{ this.props.name }</h2> 

            <button onClick={this.increment}><FaPlusCircle /> Increment</button>
            <button onClick={this.decrement}><FaMinusCircle /> Decrement</button>
        </div>
    } 
} 
 
export default Counter