import {useState} from 'react'
// import Loading from './Loading'
import {useStoreState, useStoreActions} from 'easy-peasy'
import LoginChoices from './LoginChoices'
import CarouUserForm from './CarouUserForm'
import Stack from '@mui/material/Stack'

const EmailLogin = () => {
    return (
        <CarouUserForm
            createMode={false}
        />
    )
}

const EmailCreate = () => {
    return (
        <CarouUserForm 
            createMode={true}
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

const LoginModule = () => {

    // const authFB = () => {
    //     window.FB.login(response => {
    //         if (response.status === "connected") {
    //             window.FB.api('/me', (response) => {
    //                 console.log(response);
    //                 // hit a useraction
    //             })
    //         }
    //         console.log(response)
    //     })
    // }

    // const authLogoutFB = () => {
    //     window.FB.logout(response => {
    //         console.log(response)
    //     })
    // }

    const ready = useStoreState(state => state.users.ready);
    const messages = useStoreState(state => state.users.messages);

    const [mode, setMode] = useState('init');

    const modePattern = {
        init: <LoginChoices 
          setMode={setMode}
        //   authFB={authFB}
        //   authLogoutFB={authLogoutFB}
        />,
        email: <EmailLogin />,
        // fb: <FaceBookLogin />,
        // google: <GoogleLogin />,
        create: <EmailCreate />,
    }

    return (
        <div className={'login-choices'}>
            { modePattern[mode] }
            {messageList(messages)}
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