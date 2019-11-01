export default function reduxLoggerMiddleware ({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    console.log(`[redux-logger] prevState:`, getState())
    const res = next(action)
    console.log(`[redux-logger] nextState:`, getState())
    return res
  }
}
