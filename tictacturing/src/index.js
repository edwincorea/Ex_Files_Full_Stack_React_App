import React from 'react'
import ReactDOM from 'react-dom'
import { Router, browserHistory, applyRouterMiddleware } from 'react-router'

import Relay from 'react-relay/classic'
import userRelay from 'react-router-relay'
import { RelayNetworkLayer, urlMiddleware } from 'react-relay-network-layer'
import { relayApiUrl } from './config/endpoints'
import auth from './utils/auth'

import Routes from './routes'

const createHeaders = () => {
    let idToken = auth.getToken()
    if (idToken) {
        return {
            Authorization: `Bearer ${idToken}`
        }
    } else {
        return {}
    }
}

Relay.injectNetworkLayer(
    new RelayNetworkLayer([
        urlMiddleware({
            url: (req) => relayApiUrl,            
        }),
        next => req => {
            req.headers = {
                ...req.headers,
                ...createHeaders()
            }
            return next(req)
        },
    ], {disableBatchQuery: true})
)

ReactDOM.render(
    <Router
        environment={Relay.Store}
        render={applyRouterMiddleware(userRelay)}
        history={browserHistory}
        routes={Routes}
    />,
    document.getElementById('root'))

