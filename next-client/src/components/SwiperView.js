import ViewMain from './ViewMain'
import ViewUser from './ViewUser'
import ViewGeneric from './ViewGeneric'
import ViewMore from './ViewMore'

const SwiperView = (props) => {

    const {viewName, index} = props

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
        // <FocusTrap>
        <div 
        className={`${viewName} swiper-view sv-${index}`}
        >
            <span className='view-header'>{`${viewName[0].toUpperCase() + viewName.substring(1)} View`}</span>
           {view}
        </div>
        // </FocusTrap>
    )
}

export default SwiperView
