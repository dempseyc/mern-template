import React, { useState } from 'react'
import { connect } from 'react-redux'
import { loginUser } from 'features/user/userSlice'

const mapDispatch = { loginUser }

const LoginForm = ({ loginUser }) => {
  const [emailText, setEmailText] = useState('')
  const [passwordText, setPasswordText] = useState('')

  const onChangeE = e => setEmailText(e.target.value)
  const onChangePW = e => setPasswordText(e.target.value)

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault()
          if ( !emailText.trim() || !passwordText.trim() ) {
            return
          }
          loginUser({email: emailText, password: passwordText})
          setEmailText('')
          setPasswordText('')
        }}
      >
        <input value={emailText} onChange={onChangeE} />
        <input value={passwordText} onChange={onChangePW} />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )
}

export default connect(
  null,
  mapDispatch
)(LoginForm)