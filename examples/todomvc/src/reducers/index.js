import { combineReducers, } from 'redux'
import todos from './todos'

const rootReducer = combineReducers({
  todos,
  // todosNext: combineReducers({
  //   todos
  // })
})

export default rootReducer
