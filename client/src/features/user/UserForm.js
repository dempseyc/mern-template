import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { 
    loginUser,
    createUser, updateUser
     } from 'features/user/userSlice'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = { 
    loginUser,
    createUser, updateUser
}

const UserForm = ({ loginUser, createUser, updateUser, ...props }) => {

    if (props.user.loggedIn) {
        var {f_name,l_name,email} = props.user.profile
    }


    const [firstNameText, setfirstNameText] = useState(f_name||'')
    const [lastNameText, setlastNameText] = useState(l_name||'')
    const [emailText, setEmailText] = useState(email||'')
    const [passwordText, setPasswordText] = useState('')
    const [newPasswordText, setNewPasswordText] = useState('')
    const [createMode, toggleCreateMode] = useState(props.mode)

    const history = useHistory()

    const onChangeFirstName = e => setfirstNameText(e.target.value)
    const onChangeLastName = e => setlastNameText(e.target.value)
    const onChangeEmail = e => setEmailText(e.target.value)
    const onChangePassword = e => setPasswordText(e.target.value)
    const onChangeNewPassword = e => setNewPasswordText(e.target.value)

    const onSubmitLogin = e => {
        e.preventDefault()
        const credentials = {email: emailText, password: passwordText}
        if ( !emailText.trim() || !passwordText.trim() ) {
            console.log('blank');
            return
        }
        loginUser(credentials)
        setEmailText('')
        setPasswordText('')
        history.push("/home");
    }

    const heading = (
        (props.user.loggedIn) ? <h1>Edit User</h1> : <h1>Create New User</h1>
    )
    const submitValue = (
        (props.user.loggedIn) ? "Update" : "Create"
    )

    const onSubmitCreate = e =>{
        e.preventDefault()
        if ( !emailText.trim() || !passwordText.trim() ||
        !firstNameText.trim() || !lastNameText.trim() ) {
            return
        }
        createUser({
            email: emailText, password: passwordText,
            f_name: firstNameText, l_name: lastNameText
        })
    }

    const onSubmitUpdate = e =>{
        e.preventDefault()
        if ( !emailText.trim() || !passwordText.trim() || !newPasswordText.trim() ||
        !firstNameText.trim() || !lastNameText.trim() ) {
            return
        }
        updateUser({
            email: emailText, password: passwordText, newPassword: newPasswordText,
            f_name: firstNameText, l_name: lastNameText
        })
    }

    const onSubmitUser = e =>{
        (props.user.loggedIn) ? onSubmitUpdate(e) : onSubmitCreate(e)
    }

    const modeButton = (
        <>
            <button
                style={{display:"block"}}
                onClick={()=>toggleCreateMode(!createMode)}
            >Create New User</button>
        </>
    )

    const newPasswordField = (
        (props.user.loggedIn) ? [<label key="newpass-label">New Password</label>,
            <input 
                key="newpass-input"
                value={newPasswordText}
                onChange={onChangeNewPassword}
                // onBlur={() => setCredentials({password: passwordText})}
            />]
            : null
    )

    return (
        <div className="user-form">
        {heading}
        {!createMode ?
            modeButton
        :
            <>
                <button
                    style={{display:"block"}}
                    onClick={()=>toggleCreateMode(!createMode)}
                >Login with Password</button>
            </>}
        <form
            onSubmit={createMode ? onSubmitUser : onSubmitLogin}
        >
        {createMode ?
        <>
            <label>First Name</label>
            <input 
                value={firstNameText} 
                onChange={onChangeFirstName}
                // onBlur={() => setCredentials({f_name: firstNameText})}
            />
            <label>Last Name</label>
            <input
                value={lastNameText}
                onChange={onChangeLastName}
                // onBlur={() => setCredentials({l_name: lastNameText})}
            />
        </>
        : null}
            <label>Email</label>
            <input 
                value={emailText}
                onChange={onChangeEmail}
                // onBlur={() => {
                //     setCredentials({email: emailText})
                // }}
            />
            <label>Password</label>
            <input 
                value={passwordText}
                onChange={onChangePassword}
                // onBlur={() => setCredentials({password: passwordText})}
            />
            {newPasswordField}
            <input value={submitValue} type="submit"></input>
        </form>
        </div>
    )
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(UserForm)