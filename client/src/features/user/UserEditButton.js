import React from 'react'
import { useHistory } from "react-router-dom"


const UserEditButton = (props) => {

    const history = useHistory()
    
    return (
        <button onClick={e => {
            history.push("/settings");
        }}>
            Edit User
        </button>
    )
}

export default UserEditButton