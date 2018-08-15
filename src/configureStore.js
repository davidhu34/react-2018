import { createStore, compose, applyMiddleware } from 'redux'
// import { routerMiddleware } from 'react-router-redux'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import logger from 'redux-logger'

import reducer from './reducers'

const freshStore = (history) => {
    const middlewares = []
    middlewares.push( logger )
    middlewares.push( routerMiddleware(history) )
    return createStore(
        connectRouter(history)(reducer),
        {},
        compose(
            applyMiddleware( ...middlewares )
        )
    )
}

export { freshStore }
