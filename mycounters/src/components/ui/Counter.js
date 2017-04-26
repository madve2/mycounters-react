import React from 'react' 
import { render } from 'react-dom'
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import FaMinusCircle from 'react-icons/lib/fa/minus-circle'
import FaTrash from 'react-icons/lib/fa/trash'
import './Counter.css'
 
class Counter extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.increment = this.increment.bind(this) 
        this.decrement = this.decrement.bind(this)
        this.remove = this.remove.bind(this)
    }

    increment() {
        this.props.onIncrement(this.props.name)
    }

    decrement() {
        this.props.onDecrement(this.props.name)
    }

    remove() {
        this.props.onRemove(this.props.name);
    }

    render() {
        return <div className="Counter">
            <span className="current-count">{ this.props.count }</span>

            <h2>{ this.props.name }</h2>

            <button onClick={this.increment}><FaPlusCircle /> Increment</button>
            <button onClick={this.decrement}><FaMinusCircle /> Decrement</button>
            <button onClick={this.remove}><FaTrash /></button>
        </div>;
    }
}
 
export default Counter