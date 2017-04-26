import React from 'react' 
import { render } from 'react-dom' 
import Counter from './Counter' 
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import './CounterCollection.css';
 
class CounterCollection extends React.Component {
    constructor(props, context) {
        super(props, context)
        this.renderSingleCounter = this.renderSingleCounter.bind(this);
    }

    renderSingleCounter(counter) {
        return <Counter name={counter.name}
                        count={counter.count} key={counter.name}
                        onRemove={this.props.onRemoveCounter} />
    }

    render() {
        return <div className="CounterCollection">
            { this.props.counters.map(this.renderSingleCounter) }
            <a className="add-counter-button" onClick={this.props.onAddCounter}><FaPlusCircle /></a>
        </div>;
    }
}

export default CounterCollection  