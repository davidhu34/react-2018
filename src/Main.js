import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import { pushRoute } from './actions'

import Counter from './Counter'

const Home = () => <div>Home Page</div>
const About = () => <div>About content</div>
const Topics = () => <div>Topics content</div>

const Main = ({
    router,
    pushRoute
}) => (
    <div>
        <h1>
             Hello World.<br />
             <Counter />
        </h1>
        <div onClick={() => pushRoute('/')}>Home</div>
        <div onClick={() => pushRoute('/about')}>About</div>
        <div onClick={() => pushRoute('/topics')}>Topics</div>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/topics" component={Topics} />
    </div>
)

export default withRouter(connect(
	({ router }) => ({ router }),
    dispatch => ({
        pushRoute: (route) => pushRoute(dispatch, route)
    })
)(Main))
