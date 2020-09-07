import React, { useState } from 'react'
import { useHistory } from "react-router-dom"
import { connect } from 'react-redux'
import { 
    loginUser,
    createUser,
     } from 'features/user/userSlice'

const mapDispatch = { 
    loginUser,
    createUser,
}

const UserForm = ({ loginUser, createUser, ...props }) => {

    const [firstNameText, setfirstNameText] = useState('')
    const [lastNameText, setlastNameText] = useState('')
    const [emailText, setEmailText] = useState('')
    const [passwordText, setPasswordText] = useState('')
    const [createMode, toggleCreateMode] = useState(false)

    const history = useHistory()

    const onChangeFirstName = e => setfirstNameText(e.target.value)
    const onChangeLastName = e => setlastNameText(e.target.value)
    const onChangeEmail = e => setEmailText(e.target.value)
    const onChangePassword = e => setPasswordText(e.target.value)

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

    return (
        <div className="user-form">
        {!createMode ?
            <>
                <button
                    style={{display:"block"}}
                    onClick={()=>toggleCreateMode(!createMode)}
                >Create New User</button>
            </>
        :
            <>
                <button
                    style={{display:"block"}}
                    onClick={()=>toggleCreateMode(!createMode)}
                >Login with Password</button>
            </>}
        <form
            onSubmit={createMode ? onSubmitCreate : onSubmitLogin}
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
            <input value="Login" type="submit"></input>
        </form>
        </div>
    )
}

export default connect(
null,
mapDispatch
)(UserForm)