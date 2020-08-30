import React from 'react'
import { connect } from 'react-redux'

import { removeToken, logoutUser } from 'features/user/userSlice'

const mapDispatch = { removeToken, logoutUser } 

const LogoutButton = ({ removeToken, logoutUser, ...props}) => {

    return (
        <button onClick={e => {
            removeToken()
        }}>
            Log Out
        </button>
    )
}

export default connect(
null,
mapDispatch
)(LogoutButton)