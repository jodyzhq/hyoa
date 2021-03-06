import { createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import apiMiddleware from '../api/middleware'
import { routerMiddleware } from 'react-router-redux'
//import createLogger from 'redux-logger'
import rootReducer from '../reducers'
import noticeReducer from '../reducers/notice'


export default function configureStore(initialState, history) {

  let middleware = [thunkMiddleware, apiMiddleware, routerMiddleware(history)]

  let finalCreateStore

  if(process.env.NODE_ENV === 'production') {
    finalCreateStore = compose(applyMiddleware(...middleware))
  } else {
    let createLogger = require('redux-logger')
    const logger = createLogger({
      level: 'info',
      collapsed: false,
      logger: console,
      predicate: (getState, action) => true
    })

    middleware.push(logger)

    finalCreateStore = compose(applyMiddleware(...middleware))
  }

    const store = finalCreateStore(createStore)(rootReducer, initialState)

  if (module.hot && process.env.NODE_ENV !== 'production') {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}

// export default function configureStore(initialState) {
//   let store = null

//   if(process.env.NODE_ENV === 'production') {
//     store = createStore(
//       rootReducer,
//       initialState,
//       applyMiddleware(thunkMiddleware, apiMiddleware)
//     )
//   } else {
//     let createLogger = require('redux-logger')
//     const logger = createLogger({
//       level: 'info',
//       collapsed: false,
//       logger: console,
//       predicate: (getState, action) => true
//     })

//     store = createStore(
//       rootReducer,
//       initialState,
//       applyMiddleware(thunkMiddleware, apiMiddleware, logger)
//     )
//   }

//   if (module.hot && process.env.NODE_ENV !== 'production') {
//     // Enable Webpack hot module replacement for reducers
//     module.hot.accept('../reducers', () => {
//       const nextRootReducer = require('../reducers')
//       store.replaceReducer(nextRootReducer)
//     })
//   }

//   return store
// }
