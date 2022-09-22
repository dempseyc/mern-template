
import { useStoreState, useStoreActions } from '../store/store'

import AppBar from '@mui/material/AppBar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import PersonIcon from '@mui/icons-material/PersonOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SnowFlake from '@mui/icons-material/AcUnit'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

const TabStyle = {
    minWidth: 'none',
}

const NavBar = () => {
    const HOME_VIEWS = ['main','chat','user','more'];
    const currView = useStoreState(state => state.currView);
	const setCurrView = useStoreActions(actions => actions.setCurrView);

    const handleTabChange = (e,val) => {
        setCurrView(val);
    }

    const tabMaker = () => {
        let tabs = HOME_VIEWS.map((view,i) => {
            let icon;
            switch (view) {
                case 'user': 
                    icon = <PersonIcon fontSize="inherit" />;
                    break;
                case 'main':
                    icon = <SnowFlake fontSize="inherit" />;
                    break;
                case 'chat':
                    icon = <ChatBubbleOutlineIcon fontSize="inherit" />;
                    break;
                default:
                    icon = <MoreHorizIcon fontSize="inherit"/>
                    break;
            }
            return (
                <Tab 
                    key={`NavLink-${i}`}
                    style={ {...TabStyle} }
                    className='NavLink' 
                    value={i}
                    icon={icon}
                    label={view}
                    />
            )
        })
        return tabs;
    }

    return (
        <div className="NB-Layout">
        <AppBar 
            position='static' 
        >
            <Tabs 
                className='NavBar'
                value={ currView } 
                onChange={ handleTabChange }
                variant='fullWidth'
                indicatorColor={'secondary'}
            >
                {tabMaker()}
            </Tabs>
        </AppBar>
        </div>
    )
}
   
export default NavBar