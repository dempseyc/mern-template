import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser, unsetCredentials } from 'features/user/userSlice'

const mapDispatch = { loginUser, unsetCredentials }

const LoginForm = ({ loginUser, ...props }) => {
    const credentials = unsetCredentials()
    const { onSubmit, addedFields } = props
    const [emailText, setEmailText] = useState(credentials.email)
    const [passwordText, setPasswordText] = useState(credentials.password)

    const onChangeE = e => setEmailText(e.target.value)
    const onChangePW = e => setPasswordText(e.target.value)

    const onSubmitLogin = e => {
        e.preventDefault()
        // if ( !emailText.trim() || !passwordText.trim() ) {
        //     return
        // }
        loginUser({email: emailText, password: passwordText})
        setEmailText('')
        setPasswordText('')
    }

    return (
        <div>
        <form
            onSubmit={onSubmit ? onSubmit : onSubmitLogin}
        >
            <label>Email</label>
            <input value={emailText} onChange={onChangeE} />
            <label>Password</label>
            <input value={passwordText} onChange={onChangePW} />
            {addedFields}
            <button type="submit">Sign In</button>
        </form>
        </div>
    )
}

export default connect(
null,
mapDispatch
)(LoginForm)