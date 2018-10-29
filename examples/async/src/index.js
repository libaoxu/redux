import React from 'react'
import { render } from 'react-dom'
import { createStore, applyMiddleware } from './redux'
import { Provider } from './react-redux'
import thunk from './redux-thunk'
import { createLogger } from 'redux-logger'
import reducer from './reducers'
import App from './containers/App'

const logger1 = ({ dispatch, getState }) => function acceptNextLogger1 (nextLogger1) {
  return function acceptActionLogger1 (actionLogger1) {
    setTimeout(() => {
      // console.log('logger1: ', nextLogger1, actionLogger1)
      nextLogger1(actionLogger1)
    })
  }
}
// const logger2 = ({ dispatch, getState }) => function acceptNextLogger2 (nextLogger2) {
//   return function acceptActionLogger2 (actionLogger2) {
//     setTimeout(() => {
//       console.log('logger2: ', nextLogger2, actionLogger2)
//       nextLogger2(actionLogger2)
//     })
//   }
// }
// const logger3 = ({ dispatch, getState }) => function acceptNextLogger3 (nextLogger3) {
//   return function acceptActionLogger3 (actionLogger3) {
//     setTimeout(() => {
//       console.log('logger3: ', nextLogger3, actionLogger3)
//       nextLogger3(actionLogger3)
//     })
//   }
// }

const middleware = [ thunk, logger1 ]
// const middleware = [ createLogger(), thunk ]

createLogger()
// if (process.env.NODE_ENV !== 'production') {
//   middleware.push(createLogger())
// }

const store = createStore(
  reducer,
  applyMiddleware(...middleware)
)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
