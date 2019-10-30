import { compose } from 'redux'

const middleware1 = function middleware1(next) {
  return function middleware1Action (action) {
    // ...逻辑1
    return next(action)
  }
}
const middleware2 = function middleware2(next) {
  return function middleware2Action (action) {
    // ...逻辑2
    return next(action)
  }
}
const middleware3 = function middleware3(next) {
  return function middleware3Action (action) {
    // ...逻辑3
    return next(action)
  }
}
const middleware4 = function middleware4(next) {
  return function middleware4Action (action) {
    // ...逻辑4
    return next(action)
    // setTimeout(() => {
    //   return next(action)
    // })
  }
}

// 因为直接在异步里, 执行next, 并没有办法拿到返回值的, 所以通过将 compose(...middlewares)(baseDispatch)得到的 dispatch 通过代理的方式注入到中间件里, 让在中间件 间接去执行dispatch, 如下:
// const middlewareAPI = { dispatch: action => dispatch(action) }
// const chain = middlewares.map(middleware => middleware(middlewareAPI))
// dispatch = compose(...chain)(store.dispatch)
const reduxMiddleware = ({ dispatch }) => (next) => action => {
  if (typeof action === 'function') {
    return action(dispatch)
  }
  return next(action)
}

const middlewares = [middleware1, middleware2, middleware3, middleware4]

const baseDispatch = action => console.log('baseDispatch action: ', action)

// const dispatch = middleware1(middleware2(middleware3(middleware4(baseDispatch))))

// compose(f, g, h) -> (...args) => f(g(h(...args)))
// compose(f, g, h)(baseDispatch) -> f(g(h(baseDispatch)))
debugger
const dispatch = compose(...middlewares)(baseDispatch)

debugger
dispatch({ type: 'ADD_TODO', text: '可乐' })
