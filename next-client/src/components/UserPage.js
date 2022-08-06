
import {useStoreState, useStoreActions } from 'easy-peasy'
import LoginModule from './LoginModule'
import UserDetails from './UserDetails'

const UserPage = (props) => {
    const {pageName, bgColor} = props;
    const ready = useStoreState(state => state.users.ready);
    const user = useStoreState(state => state.users.user);
    const logoutUser = useStoreActions(actions => actions.users.logoutUser);


    // users (for chat)
    
    const pageStyle = {
        backgroundColor: bgColor,
    }
    
    return (
        <div 
        className={`${pageName} SwiperPage`}
        style={pageStyle}
        >
            <span>{`${pageName} pagename`}</span>
            { ready ? <UserDetails user={user} logoutUser={logoutUser}/> : <LoginModule/> }
            {/* { ready ? null : <MessageList/> } */}
        </div>
    )
}

export default UserPage