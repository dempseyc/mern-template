import React, { useState } from 'react'
import { connect } from 'react-redux'
import { 
    loginUser,
    createUser,
    setCredentials,
    unsetCredentials,
    lookupEmail
     } from 'features/user/userSlice'

const mapDispatch = { 
    loginUser,
    createUser,
    setCredentials,
    unsetCredentials,
    lookupEmail
}

const UserForm = ({ mapDispatch, ...props }) => {
    const credentials = unsetCredentials()
    const { createMode } = props

    const [firstNameText, setfirstNameText] = useState('')
    const [lastNameText, setlastNameText] = useState('')
    const [emailText, setEmailText] = useState(credentials.email||'')
    const [passwordText, setPasswordText] = useState(credentials.password||'')

    const onChangeFirstName = e => setfirstNameText(e.target.value)
    const onChangeLastName = e => setlastNameText(e.target.value)
    const onChangeEmail = e => setEmailText(e.target.value)
    const onChangePassword = e => setPasswordText(e.target.value)

    const onSubmitLogin = e => {
        e.preventDefault()
        if ( !emailText.trim() || !passwordText.trim() ) {
            return
        }
        loginUser({email: emailText, password: passwordText})
        // setEmailText('')
        // setPasswordText('')
    }

    const onSubmitCreate = e =>{
        e.preventDefault()
        if ( !emailText.trim() || !passwordText.trim() ||
        !firstNameText.trim() || !lastNameText.trim() ) {
            return
        }
        createUser({
            email: emailText, password: credentials.passwordText,
            f_name: firstNameText, l_name: lastNameText
        })
    }

    return (
        <div className="user-form">
        <form
            onSubmit={createMode ? onSubmitCreate : onSubmitLogin}
        >
        {createMode ?
        <>
            <label>First Name</label>
            <input 
                value={firstNameText} 
                onChange={onChangeFirstName}
                onBlur={() => setCredentials({f_name: firstNameText})}
            />
            <label>Last Name</label>
            <input
                value={lastNameText}
                onChange={onChangeLastName}
                onBlur={() => setCredentials({l_name: lastNameText})}
            />
        </>
        : null}
            <label>Email</label>
            <input 
                value={emailText}
                onChange={onChangeEmail}
                onBlur={() => {
                    setCredentials({email: emailText})
                    lookupEmail(emailText)
                }}
            />
            <label>Password</label>
            <input 
                value={passwordText}
                onChange={onChangePassword}
                onBlur={() => setCredentials({password: passwordText})}
            />
            <button type="submit">Submit</button>
        </form>
        </div>
    )
}

export default connect(
null,
mapDispatch
)(UserForm)