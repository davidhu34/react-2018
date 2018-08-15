import { createStore, applyMiddleware } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import logger from 'redux-logger'

import App from './reducers'

const freshStore = (history) => {
    const middlewares = []
    middlewares.push( logger )
    middlewares.push( routerMiddleware(history) )
    return createStore(
        App,
        applyMiddleware( ...middlewares )
    )
}

export { freshStore }
