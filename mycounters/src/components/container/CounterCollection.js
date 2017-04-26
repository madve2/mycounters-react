import CounterCollection from '../ui/CounterCollection' 
import { connect } from 'react-redux' 
import { VisibilityFilters } from '../../actions/constants'
import { addCounterWithPrompt } from '../../actions/'
 
const mapStateToProps = state => { 
    return { 
        counters: state.counters.filter(ctr => { 
            switch(state.visibilityFilter) 
            { 
                case VisibilityFilters.SHOW_POSITIVE: 
                    return ctr.count > 0 
                case VisibilityFilters.SHOW_NEGATIVE: 
                    return ctr.count < 0 
                case VisibilityFilters.SHOW_ZEROS: 
                    return ctr.count === 0 
                default: 
                    return true 
            } 
        }) 
    } 
} 
 
const mapDispatchToProps = dispatch => { 
    return { 
        onAddCounter() { dispatch(addCounterWithPrompt()) } 
    } 
} 
 
const Container = connect(mapStateToProps, mapDispatchToProps)(CounterCollection)
export default Container