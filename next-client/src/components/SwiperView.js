import {useStoreState, useStoreActions} from 'easy-peasy'
import ViewMain from './ViewMain'
import ViewUser from './ViewUser'
import ViewGeneric from './ViewGeneric'
import ViewMore from './ViewMore'
import Container from "@mui/material/Container";

const SwiperView = (props) => {

    const {viewName, index} = props
    const currView = useStoreState(state => state.currView);

    let view;

    // replace switch with key/val pairs
    switch (viewName) {
        case 'main':
            view = <ViewMain {...props}/>;
            break;
        case 'user':
            view = <ViewUser {...props}/>;
            break;
        case 'more':
            view = <ViewMore {...props}/>;
            break;
        default:
            view = <ViewGeneric {...props}/>;
            break;
    }
    // deal with useability / aria
    return (
        <div
        inert={(index !== currView) ? "" : null}
        className={`${viewName} swiper-view sv-${index}`}
        >
            <Container>
                <span className='view-header'>{`${viewName[0].toUpperCase() + viewName.substring(1)} View`}</span>
                {view}
            </Container>
        </div>
    )
}

export default SwiperView
