import { combineReducers } from 'redux'
import counterReducer from './example'

const rootReducer = combineReducers({
  counterReducer,
})

export default rootReducer
