import {useState} from 'react'
import {useStoreActions, useStoreState} from 'easy-peasy'

import Loading from './Loading'
import LoginChoices from './LoginChoices'
import CarouUserForm from './CarouUserForm'

const submitPassword = () => console.log('sub pass') ;
const submitUserCreate = () => console.log('sub create user') ;
const credentials = {uname: 'none', pass: 'none'};

const EmailLogin = () => {
    return (
        <CarouUserForm
            createMode={false}
            submitPassword={submitPassword}
            credentials={credentials}
        />
    )
}

const EmailCreate = () => {
    return (
        <CarouUserForm 
            createMode={true}
            submitUserCreate={submitUserCreate}
            credentials={credentials}
        />
    )
}

const messageList = (messages) => {
    const ms = messages.map((m,i) => {
        return (
            <li key={`m-${i}`}>{m}</li>
        )
    })
    return (
        <ul>{ms}</ul>
    )
}


const LoginModule = (props) => {
    // 
    // loginUser 
    // createUser 
    // subscribe 
    // unsubscribe
    const ready = false;

    const [mode, setMode] = useState('init');

    const messages = ['no message'];

    const modePattern = {
        init: <LoginChoices setMode={setMode}/>,
        email: <EmailLogin />,
        // google: <GoogleLogin />,
        // facebook: <FacebookLogin />,
        create: <EmailCreate />,
    }

    return (
        <div className={'user'}>
            { modePattern[mode] }
            {/* start fetching data for user instead of null */}
            {(ready) ? null : messageList(messages)}
        </div>
    )
}

export default LoginModule


// submitPassword (credentials) {
//     this.props.dispatch(loginUser(credentials));
// }

// submitUserCreate (credentials) {
//     this.props.dispatch(createUser(credentials));
// }

// contentLoading () {
//     return <Loading contentName={this.pageName}/>
// }

// manageCable () {
//     if (this.props.cable && this.props.user.loggedIn && !this.props.chatChannel) {
//         this.props.dispatch(subscribe('ChatChannel',this.props.cable,this.props.username))
//     } else if (this.props.chatChannel) {
//         this.props.dispatch(unsubscribe('ChatChannel'))
//     }
// }

// componentDidUpdate(prevProps) {
//     if (prevProps.user.loggedIn !== this.props.user.loggedIn) {
//         this.manageCable();
//     }
// }