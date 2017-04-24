import React from 'react' 
import { render } from 'react-dom' 
 
class Counter extends React.Component { 
    constructor(props, context) { 
        super(props, context) 
        this.increment = this.increment.bind(this); //developer.mozilla.org/en/docs/Web/JavaScript/Reference/Functions/Arrow_functions#No_binding_of_this 
 
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
 
    render() { 
        return <div> 
            <h2>{ this.props.name }</h2> 
 
            <p>Current count: <strong>{ this.state.count }</strong></p> 
 
            <button onClick={this.increment}>Increment</button> 
        </div>; 
    } 
} 
 
export default Counter