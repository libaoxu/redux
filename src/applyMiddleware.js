import compose from './compose'

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */
export default function applyMiddleware(...middlewares) {
  return (createStore) => (reducer, preloadedState, enhancer) => {
    const store = createStore(reducer, preloadedState, enhancer)
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action) // 注意: 划重点了哈, 这里的`dispatch`, 因为异步执行`middlewareAPI.dispatch`的原因, 所以这个`dispatch`不是第22行声明的`store.dispatch`, 而是第30行通过compose创建的dispatch
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI)) // 中间件接收的第一个参数({ dispatch, getState })
    dispatch = compose(...chain)(store.dispatch) // 这里的store.dispatch, 的就是中间件的next, 所创建的dispatch在执行, 就是将action(function or object)传入进去

    return {
      ...store,
      dispatch
    }
  }
}

/* 一: redux enhacer设计思想 */
const xxxEnhancer1 = createStore => (reducer, preloadedState, enhancer) => {}
const xxxEnhancer2 = createStore => (reducer, preloadedState, enhancer) => {}
const xxxEnhancer3 = createStore => (reducer, preloadedState, enhancer) => {}


// 装饰器, 将`函数`进行装饰, 暴露一个`新函数`, `新函数`接收的参数是跟`原函数`保持一致的
// 之所以这样设计, 可以达到 `连环` 装饰的效果, 也是`流式`的设计思想, (中间件也是这种思路)
// 其中每个enhancer遵循相同的规范, 逻辑独立, 这里执行的createStore可能是经过多层装饰的createStore, 一层层由内而外的执行
const enhancer = (...args) => xxxEnhancer1(xxxEnhancer2(xxxEnhancer3(...args)))
const enhancer = compose(xxxEnhancer1, xxxEnhancer2, xxxEnhancer3)

enhancer(creatStore) -> xxxEnhancer1(xxxEnhancer2(xxxEnhancer3(createStore)))


/* 二: 如何写一个middleware */
const addTodo = text => (dispatch, getState) => dispatch({ type: 'ADD_TODO', text })

const thunkMiddleware = ({ dispatch, getState }) => next => action => {
  if (action === 'function') {
    // 这里的action 就是一个函数, 如addTodo这样是个函数, 在addTodo里面 再执行dispatch({ type, payload })
    // 这个dispatch 是经过 applyMiddleware 处理过的代理函数, 里面代理着通过compose创建完的thunk
    return action(dispatch, getState)
  }
  // next可能是两种dispatch
  // 第一种: 直接从createStore创建的store的dispatch
  // 第二种: 是通过compose middleware产出的dispatch, 这个dispatch执行会依次执行下一个中间件, 同时也是addTodo接收到的dispatch, 也是redux-thunk第六行的dispatch, 详见`applyMiddleware`L30
  // 第三种: 是下一个中间件的可执行action的函数, 接收action参数, 其中next是通过compose(...chain)来注入的闭包变量, 此变量是个函数, 直接执行action, 调用下一个中间件的函数
  return next(action)
}

const loggerMiddleware = ({ dispatch, getState }) => next => action => {
  console.log('[redux-logger] preState: ', getState())
  if (action === 'function') {
    return action(dispatch, getState)
  }

  const res = next(action)
  console.log('[redux-logger] nextState: ', getState())
  return res
}

const enhancer = applyMiddleware(...[thunkMiddleware, loggerMiddleware])
// createStore(reducer, preloadState, enhancer)


const middleware1 = next => action => next(action)
const middleware2 = next => action => next(action)
const middleware3 = next => action => next(action)
const middleware4 = next => action => next(action)

const middlewares = [middleware1, middleware2, middleware3, middleware4]

const dispatch = middleware1(middleware2(middleware3(middleware4(store.dispatch))))
// 两种等价, 因为在用户端只能传入middleware的数组, 不能执行, 只能通过compose来完成上面的结果
const dispatch = compose(...middlewares)(store.dispatch)
dispatch(action)
