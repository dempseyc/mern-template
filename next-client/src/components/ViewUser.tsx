
import { useStoreState, useStoreActions } from '../store/store'
import LoginModule from './LoginModule'
import UserDetails from './UserDetails'

const ViewUser = () => {
    const ready = useStoreState(state => state.users.ready);
    const user = useStoreState(state => state.users.user);
    const logoutUser = useStoreActions(actions => actions.users.logoutUser);

    return (
        <>
            { ready ? <UserDetails user={user} logoutUser={logoutUser}/> : <LoginModule/> }
            {/* { ready ? null : <MessageList/> } */}
        </>
    )
}

export default ViewUser