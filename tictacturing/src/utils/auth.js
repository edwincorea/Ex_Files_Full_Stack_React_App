import Auth0Lock from 'auth0-lock'
import Relay from 'react-relay/classic'

import CreateUser from '../mutations/CreateUser'
import SignInUser from '../mutations/SignInUser'

const authDomain = 'fullstack-development.auth0.com'
const clientId = 'BF76J7e2i6vAFI587pp5AVYFFDXWREvu'

class AuthService {
    constructor() {
        this.lock = new Auth0Lock(clientId, authDomain, {
            auth: {
                params: {
                    scope: 'openid email'
                },
            },
        })

        this.showLock = this.showLock.bind(this)

        this.lock.on('authenticated', this.authProcess.bind(this))
    }

    authProcess = (authResult) => {
        let {
            email,
            exp
        } = authResult.idTokenPayload
        const idToken = authResult.idToken

        this.signInUser({
            idToken,
            email,
            exp
        }).then(
            success => success,
            rejected => {
                // user was not found, created it
                this.createUser({
                    idToken,
                    email,
                    exp
                }).then() // we don't need to do anything on promise succeed or rejected
            }
        )
    }

    showLock() {
        this.lock.show()
    }

    setToken = (authFields) => {
        let {
            idToken,
            exp
        } = authFields

        localStorage.setItem('idToken', idToken)
        localStorage.setItem('exp', exp * 1000)
    }

    isCurrent = () => {
        let expString = localStorage.getItem('exp')
        if (!expString) {
            localStorage.removeItem('idToken')
            return false
        }

        let now = new Date()
        let exp = new Date(parseInt(expString, 10)) // 10 is radix parameter
        if(exp < now) {
            this.logout()
            return false
        } else {
            return true
        }
    }

    getToken() {
        let idToken = localStorage.getItem('idToken')
        if (this.isCurrent() && idToken) {
            return idToken
        } else {
            localStorage.removeItem('idToken')
            localStorage.removeItem('exp')
            return false
        }
    }

    logout = () => {
        localStorage.removeItem('idToken')
        localStorage.removeItem('exp')
        location.reload()
    }

    createUser = (authFields) => {
        return new Promise((resolve, reject) => {
            Relay.Store.commitUpdate(
                new CreateUser({
                    email: authFields.email,
                    idToken: authFields.idToken
                }), {
                    onSuccess: (response) => {
                        this.signInUser(authFields)
                        resolve(response)
                    },
                    onFailure: (response) => {
                        console.log('CreateUser error', response)
                        reject(response)
                    }
                }
            )
        })        
    }

    signInUser = (authFields) => {
        return new Promise((resolve, reject) => {
            Relay.Store.commitUpdate(
                new SignInUser({
                    idToken: authFields.idToken
                }), {
                    onSuccess: (response) => {
                        this.setToken(authFields)
                        resolve(response)
                    },
                    onFailure: (response) => {                        
                        reject(response)
                    }
                }
            )
        })
    }
}

const auth = new AuthService()

export default auth