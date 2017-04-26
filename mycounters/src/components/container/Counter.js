import Counter from '../ui/Counter' 
import { connect } from 'react-redux' 
import { increaseCounter, decreaseCounter, removeCounter } from '../../actions/' 
 
const mapDispatchToProps = dispatch => { 
    return { 
        onIncrement(name) { dispatch(increaseCounter(name)) }, 
        onDecrement(name) { dispatch(decreaseCounter(name)) }, 
        onRemove(name) { dispatch(removeCounter(name)) } 
    } 
} 
 
const Container = connect(null, mapDispatchToProps)(Counter) 
export default Container