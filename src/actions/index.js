// import { push } from 'react-router-redux'
import { push } from 'connected-react-router'

export const pushRoute = (dispatch, route) => dispatch(push(route))
