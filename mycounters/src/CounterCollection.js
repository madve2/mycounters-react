import React from 'react' 
import { render } from 'react-dom' 
import Counter from './Counter' 
import FaPlusCircle from 'react-icons/lib/fa/plus-circle'
import './CounterCollection.css';
 
class CounterCollection extends React.Component { 
    constructor(props, context) { 
        super(props, context)
        this.addCounter = this.addCounter.bind(this)
        this.removeCounter = this.removeCounter.bind(this)
        this.renderSingleCounter = this.renderSingleCounter.bind(this) 

        this.state = { 
            counters: [ 
                { 
                    name: "Wizard level", 
                    initialCount: 3 
                }, 
                { 
                    name: "Bard level", 
                    initialCount: 2 
                } 
            ] 
        }
    }

    addCounter() {
        let name = prompt("Name for the new counter"); 
        if (!name) { 
            return; 
        } 
        if (this.state.counters.some( c => c.name === name)) { 
            alert("You already have a counter named " + name); 
            return; 
        } 
        this.setState( 
            { 
                ...this.state, 
                counters: [ 
                    ...this.state.counters, 
                    { 
                        name, 
                        initialCount: 0 
                    } 
                ]    
            } 
        ); 
    }

    removeCounter(name) { 
        this.setState( 
            { 
                ...this.state, 
                counters: this.state.counters.filter(n => n.name !== name) 
            } 
        ) 
    } 

    renderSingleCounter(counter) { 
        return <Counter name={counter.name} initialCount={counter.initialCount} key={counter.name} onRemove={this.removeCounter} />
    }

    render() {
        return <div className="CounterCollection"> 
            { this.state.counters.map(this.renderSingleCounter) } 
            <a className="add-counter-button" onClick={this.addCounter}><FaPlusCircle /></a> 
        </div>; 
    }
}

export default CounterCollection  