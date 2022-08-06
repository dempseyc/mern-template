
import { useStoreState, useStoreActions } from 'easy-peasy'

import AppBar from '@mui/material/AppBar'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'

import PersonIcon from '@mui/icons-material/PersonOutlined'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import SnowFlake from '@mui/icons-material/AcUnit'


const TabStyle = {
    minWidth: 'none',
}

const NavBar = (props) => {
    const currPage = useStoreState(state => state.currPage);
	const setCurrPage = useStoreActions(actions => actions.setCurrPage);

    const handleTabChange = (e,val) => {
        setCurrPage({index: val, source: 'tab_click'});
    }

    const tabMaker = () => {
        let tabs = props.pageNames.map((pn,i) => {
            let color = props.pageColors[i];
            let icon;
            switch (pn) {
                case 'User': 
                    icon = <PersonIcon fontSize="inherit" />;
                    break;
                case 'Game':
                    icon = <SnowFlake fontSize="inherit" />;
                    break;
                case 'Chat':
                    icon = <ChatBubbleOutlineIcon fontSize="inherit" />;
                    break;
                default:
                    break;
            }
            return (
                <Tab 
                    key={`NavLink-${i}`}
                    style={ {...TabStyle, backgroundColor: color } }
                    className='NavLink' 
                    value={i}
                    icon={icon}
                    label={pn}
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
                value={ currPage } 
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