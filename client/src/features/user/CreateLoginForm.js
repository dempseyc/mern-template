import React, { useState } from 'react'
import { connect } from 'react-redux'
import { createUser, unsetCredentials } from 'features/user/userSlice'

import LoginForm from './LoginForm'

const mapDispatch = { createUser, unsetCredentials }

// const createMode = true

const CreateLoginForm = ({ createUser, unsetCredentials, ...props }) => {
    console.log(props.createMode)
    const [FNameText, setFNameText] = useState('')
    const [LNameText, setLNameText] = useState('')
    const onChangeFN = e => setFNameText(e.target.value)
    const onChangeLN = e => setLNameText(e.target.value)
    const credentials = unsetCredentials();
    const nameFields = (
        <>
        <input value={FNameText} onChange={onChangeFN} />
        <input value={LNameText} onChange={onChangeLN} />
        </>
    )
    const addedFields = props.createMode ? nameFields : null

    const onSubmitCreate = e =>{
        e.preventDefault()
        // if ( !emailText.trim() || !passwordText.trim() ||
        // !FNameText.trim() || !LNameText.trim() ) {
        //     return
        // }
        createUser({
            email: credentials.email, password: credentials.password,
            f_name: FNameText, l_name: LNameText
        })
    }

    const onSubmit = props.createMode ? onSubmitCreate : null

    return (
        <div>
            <LoginForm 
                onSubmit={onSubmit}
                addedFields={addedFields}
                FNameText={FNameText}
                LNameText={LNameText}
            />
        </div>
    )
}

export default connect(
  null,
  mapDispatch
)(CreateLoginForm)

// if the login comes back not found, replace with createuser form, and keep values for email and password
