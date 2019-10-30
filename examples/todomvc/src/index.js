import React from 'react'
import { render } from 'react-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from './containers/App'
import reducer from './reducers'
import 'todomvc-app-css/index.css'
import thunk from 'redux-thunk'
import logger from './redux-logger'
// import './compose.test'

const middlewares = [logger, thunk]
const enhancers = [applyMiddleware(...middlewares)]

const composeEnhancers =
  process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      shouldHotReload: false,
    })
    : compose


// const store = createStore(reducer, compose(...enhancers))
const store = createStore(reducer, enhancers[0])

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
