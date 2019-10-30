/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 *
 * const middlewares = [middleware1, middleware2, middleware3, middleware4]
 *
 * const dispatch = middleware1(middleware2(middleware3(middleware4(store.dispatch))))
 *
 * 两种等价, 因为在用户端只能传入middleware的数组, 不能执行, 只能通过compose来完成上面的结果
 * const dispatch = compose(...middlewares)(store.dispatch)
 *
 * dispatch(action)
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
