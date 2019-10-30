export default function reduxLoggerMiddleware ({ dispatch, getState }) {
  return next => action => {
    console.log(`[redux-logger] prevState:`, getState())
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }

    const res = next(action)
    console.log(`[redux-logger] nextState:`, getState())
    return res
  }
}
