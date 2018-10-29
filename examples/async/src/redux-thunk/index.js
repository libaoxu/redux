function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => {
    return function acceptNextThunk (nextThunk) {
      // 该函数做下一个中间件的next
      return function acceptActionThunk (actionThunk) {
        // console.log('thunk: ', nextThunk, actionThunk)
        if (typeof actionThunk === 'function') {
          return actionThunk(dispatch, getState, extraArgument);
        }
    
        return nextThunk(actionThunk);
      }
    }
  }
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
