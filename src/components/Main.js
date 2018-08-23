import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'

import { Button } from 'semantic-ui-react'

import { pushRoute } from '../actions'
import Counter from './Counter'
import ImageContainer from './ImageContainer'

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

        <div style={{
            width: '100%',
            height: '100%',
            position: 'fixed',
            top: 0,
            left: 0,
            zIndex: -1
        }}>
            <ImageContainer layer cover
                src={'https://timedotcom.files.wordpress.com/2018/04/dtt4200_v519-1049.jpg'}
                placeholderSrc={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl5vmPOtM8gmiNANElsT0PE4tvkrNSYR_93slvtlYk_1MbyYalLg'}
                backgroundStyles={{ backgroundPosition: 'top' }}
                blur={10} />
        </div>

    </div>
)

export default withRouter(connect(
	({ router }) => ({ router }),
    dispatch => ({
        pushRoute: (route) => dispatch(pushRoute(route))
    })
)(Main))
