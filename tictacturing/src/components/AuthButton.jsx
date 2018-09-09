import React from 'react'
import RaisedButton from 'material-ui/RaisedButton'

const AuthButton = (props) => {
    if (props.authenticated) {
        return (
            <RaisedButton
                label={'Logout'}                
                onClick={props.auth.logout}
                fullWidth={true}
                secondary={true}
            />
        )
    } else {
        return (
            <RaisedButton 
                label={'LogIn / Sign Up'}
                onClick={props.auth.showLock}
                fullWidth={true}
                primary={true}
            />
        )
    }
}

export default AuthButton