import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import { Button } from 'semantic-ui-react'

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
        <Button onClick={() => pushRoute('/')}>Home</Button>
        <Button onClick={() => pushRoute('/about')}>About</Button>
        <Button onClick={() => pushRoute('/topics')}>Topics</Button>
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
