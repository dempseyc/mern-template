import { useStoreState } from '../store/store'
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

    return (
        <div
        // workaround for inert not on type for
        ref={(node) => {
            if (node && (index !== currView)) {
                node.setAttribute('inert', '');
            } else  {
                if  (node && node.hasAttribute('inert'))  {
                    node.removeAttribute('inert');
                }
            }
            return node;
        }}
        aria-current={(index !== currView) ? "false" : "page"}
        className={`${viewName} swiper-view sv-${index}`}
        >

                <span className='view-header'>{`${viewName[0].toUpperCase() + viewName.substring(1)} View`}</span>
                <div className='view-content'>{view}</div>

        </div>
    )
}

export default SwiperView
