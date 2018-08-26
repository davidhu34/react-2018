import React, { Component } from 'react'
import { Responsive } from 'semantic-ui-react'

import Mobile from './Mobile'
import PC from './PC'

const Main = () => <div>
    <Responsive maxWidth={Responsive.onlyComputer.minWidth-1}>
        <Mobile />
    </Responsive>

    <Responsive minWidth={Responsive.onlyComputer.minWidth}>
        <PC />
    </Responsive>
</div>

export default Main
