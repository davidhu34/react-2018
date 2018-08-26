import React from 'react'
import { connect } from 'react-redux'
import { Route, withRouter } from 'react-router'
import { Button } from 'semantic-ui-react'

import { pushRoute } from '../../actions'
import { TITLE } from '../../consts'
import { BACKGROUND_URL, BACKGROUND_PLACEHOLDER_URL } from '../../configs'

import Counter from '../Counter'
import ImageContainer from '../ImageContainer'

const Home = () => <div>Home Page</div>
const About = () => <div>About content</div>
const Topics = () => <div>Topics content</div>

const PC = ({
    router,
    pushRoute
}) => (
    <div>
        <h1>
             {TITLE}
             <br />
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
                src={BACKGROUND_URL}
                placeholderSrc={BACKGROUND_PLACEHOLDER_URL}
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
)(PC))
