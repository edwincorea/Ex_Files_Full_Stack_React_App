import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory } from 'react-router'

import Relay from 'react-relay'
import userRelay from 'react-router-relay'
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer'
import { relayApiUrl } from './config/endpoints'
import auth from './utils/auth'

import Routes from './routes'

const createHeaders = () => {
    let idToken = auth.getToken()
    if (idToken) {
        Authorization: `Bearer ${idToken}`
    } else {
        return {}
    }
}

ReactDOM.render(
    <Router
        history={browserHistory}
        routes={Routes}
    />,
    document.getElementById('root'))

