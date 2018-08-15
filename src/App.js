import React from 'react'
import { Provider } from 'react-redux'
// import { ConnectedRouter } from 'react-router-redux'
import { ConnectedRouter } from 'connected-react-router'
import { hot } from 'react-hot-loader'

import Main from './Main'

const App = ({ store, history }) => (
   <Provider store={store} >
       <ConnectedRouter history={history}>
           <Main />
       </ConnectedRouter>
   </Provider>
)

export default hot(module)(App)
