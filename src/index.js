import React from 'react'
import { render } from 'react-dom'
import { freshStore } from './configureStore'
import createHistory from 'history/createBrowserHistory'

import App from './App'

const history = createHistory()
const store = freshStore(history)

render(
    <App store={store} history={history} />,
    document.getElementById('root')
)
