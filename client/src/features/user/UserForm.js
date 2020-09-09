import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { 
    loginUser,
    createUser,
    updateUser,
    deleteUser
     } from 'features/user/userSlice'

const mapStateToProps = state => ({
  ...state
})

const mapDispatchToProps = { 
    loginUser,
    createUser,
    updateUser,
    deleteUser
}

const UserForm = ({ cMode, loginUser, createUser, updateUser, deleteUser, ...props }) => {

    console.log(props)
    const loggedIn = props.user.loggedIn

    let view = {}

    const templating = {
        editView: {
            modeButton: false,
            headingText: "Edit User",
            submitValue: "Submit Changes",
            submitFn: onSubmitUpdate,
            showProfileFeilds: true,
            showNPField: true,
            showDeleteButton: true
        },
        createView: {
            modeButton: "switch to login",
            headingText: "New User",
            submitValue: "Submit",
            submitFn: onSubmitCreate,
            showProfileFeilds: true,
            showNPField: false,
            showDeleteButton: false
        },
        loginView: {
            modeButton:  "switch to new user",
            headingText: "Login User",
            submitValue: "Submit",
            submitFn: onSubmitLogin,
            showProfileFeilds: false,
            showNPField: false,
            showDeleteButton: false
        }
    }

    const [createMode, toggleCreateMode] = useState(props.cMode)

    if (loggedIn) {
        var {f_name,l_name,email} = props.user.profile
        view = templating.editView
    } else {
        if(createMode) {
            view = templating.createView
        } else {
            view = templating.loginView
        }
    }

    const [firstNameText, setfirstNameText] = useState(f_name||'')
    const [lastNameText, setlastNameText] = useState(l_name||'')
    const [emailText, setEmailText] = useState(email||'')
    const [passwordText, setPasswordText] = useState('')
    const [newPasswordText, setNewPasswordText] = useState('')
    const [errorsTexts, setNewErrorsTexts] = useState([])

    const history = useHistory()

    const onChangeFirstName = e => setfirstNameText(e.target.value)
    const onChangeLastName = e => setlastNameText(e.target.value)
    const onChangeEmail = e => setEmailText(e.target.value)
    const onChangePassword = e => setPasswordText(e.target.value)
    const onChangeNewPassword = e => setNewPasswordText(e.target.value)

    function onSubmitLogin (e) {
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
        <h1>{view.headingText}</h1>
    )

    function onSubmitCreate (e) {
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

    function onSubmitUpdate (e) {
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

    function onSubmitDelete (e) {
        if (passwordText.trim()) {
            deleteUser()
        } else {
            let newErrorsTexts = [...errorsTexts]
            newErrorsTexts.push("enter password to delete user")
            setNewErrorsTexts(newErrorsTexts)
        }
    }

    const modeButton = (view.modeButton) ? (
        <>
            <button
                style={{display:"block"}}
                onClick={()=>toggleCreateMode(!createMode)}
            >{view.modeButton}</button>
        </>
    ): null;

    const newPasswordField = (
        (view.showNPField) ? [<label key="newpass-label">New Password</label>,
            <input 
                key="newpass-input"
                value={newPasswordText}
                onChange={onChangeNewPassword}
                // onBlur={() => setCredentials({password: passwordText})}
            />]
            : null
    )

    const deleteButton = (
        (view.showDeleteButton) ? (
            <button onClick={()=>onSubmitDelete()}>DELETE USER</button>
        ) : null
    )

    return (
        <div className="user-form">
        {heading}
        {modeButton}
        <form
            onSubmit={view.submitFn}
        >
        {view.showProfileFeilds ?
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
            <input value={view.submitValue} type="submit"></input>
            {deleteButton}
            {errorsTexts.map((str,i)=>(<p key={i}>{str}</p>))}
        </form>
        </div>
    )
}

export default connect(
mapStateToProps,
mapDispatchToProps
)(UserForm)