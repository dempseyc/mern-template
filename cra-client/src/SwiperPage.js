import GamePage from './GamePage'
import UserPage from './UserPage'

const SwiperPage = (props) => {

    const pageStyle = {
        backgroundColor: props.bgColor,
    }

    let page;

    // replace switch with key/val pairs
    switch (props.pageName) {
        case 'Game':
            page = <GamePage {...props}/>;
            break;
        case 'User':
            page = <UserPage {...props}/>;
            break;
        default:
            page = (
                <div 
                className={`${props.pageName} SwiperPage`}
                style={pageStyle}
                >
                    <span>{`${props.pageName} pagename`}</span>
                </div>
            );
            break;
    }

    return (
        // <FocusTrap>
        <>
           {page}
        </>
        // </FocusTrap>
    )
}

export default SwiperPage
