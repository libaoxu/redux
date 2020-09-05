import * as types from '../constants/ActionTypes'
/**
 *
 * 在redux-thunk中的判断
 * function createThunkMiddlware () {
 *   return ({ dispatch, getState }) => next => action => {
 *      if (typeof action === 'function') {
 *        // 这里的action 就是一个函数, 如addTodo这样是个函数, 在addTodo里面 再执行dispatch({ type, payload })
 *        // 这个dispatch 是经过 applyMiddleware 处理过的代理函数, 里面代理着通过compose创建完的thunk
 *        return action(dispatch, getState)
 *      }
 *      // next可能是两种dispatch
 *      // 第一种: 直接从createStore创建的store的dispatch
 *      // 第二种: 是通过compose middleware产出的dispatch, 这个dispatch执行会依次执行下一个中间件, 同时也是addTodo接收到的dispatch, 也是redux-thunk第六行的dispatch, 详见`applyMiddleware`L30
 *      // 第三种: 下一个中间件的接收next为参数所创建的需要传入action的新函数
 *      return next(action)
 *   }
 * }
 */
let store
export const setStore = _store => store = _store
export const addTodo = text => (dispatch, getState) => {
  // console.log(dispatch, getState, text)
  return dispatch({ type: types.ADD_TODO, text })
}
export const deleteTodo = id => ({ type: types.DELETE_TODO, id })
export const editTodo = (id, text) => ({ type: types.EDIT_TODO, id, text })
export const completeTodo = id => ({ type: types.COMPLETE_TODO, id })
export const completeAllTodos = () => ({ type: types.COMPLETE_ALL_TODOS })
export const clearCompleted = () => ({ type: types.CLEAR_COMPLETED })
export const setVisibilityFilter = filter => ({ type: types.SET_VISIBILITY_FILTER, filter})
