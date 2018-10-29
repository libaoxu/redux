/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */

export default function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }
  // console.log('funcs: ', funcs)
  return funcs.reduce(function reduceA (a, b) {
    // console.log('reduce: ', a, b)
    return function nextFuncton (...args) {
      let next = args
      let action = b(...args)
      let res = a(action)
      // console.log('a(b(...args)) next, action, res: ', next, action, res)
      return res
    }
  })
}