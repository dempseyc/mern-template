import { useState } from 'react'
import { useSwipeable } from 'react-swipeable'

const SwipeViews = (props) => {
    const [ dragging, setDragging ] = useState(false);
    const { children, index, setIndex } = props;
    const maxIndex = children.length-1;

    const swipeViewsStyle = {
        height: '100%',
        width: '100vw',
        overflow: 'hidden',
    }
    // put transitions in and add eventlister for transition end somewhere in here
    const viewsWrapperStyle = {
        display: 'inline-flex',
        flexDirection: 'row' as const,
        transition: 'transform 200ms',
        transform: `translateX(${index*-(100/children.length)}%)`,
    }

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            console.log("swipeleft");
            if (index < maxIndex ) { setIndex(index+1); }
        },
        onSwipedRight: (eventData) => {
            console.log("swiperight");
            if (index > 0) { setIndex(index-1); }
        },
        onTouchStartOrOnMouseDown: (eventData) => {
            console.log("begin dragging");
        },
        onTouchEndOrOnMouseUp: (eventData) => {
            console.log("end dragging");
        },
        trackMouse: true,
        delta: 20,                             // min distance(px) before a swipe starts. *See Notes*
        preventScrollOnSwipe: true,           // prevents scroll during swipe (*See Details*)
        trackTouch: true,                      // track touch input                    // track mouse input
        rotationAngle: 0,                      // set a rotation angle
        swipeDuration: 700,               // allowable duration of a swipe (ms). *See Notes*
        touchEventOptions: { passive: true },  // options for touch listeners (*See Details*)
    })

    return (
        <div className='SwipeViews' style={swipeViewsStyle} {...handlers}>
            <div className='ViewsWrapper' style={viewsWrapperStyle}>
                {children}
            </div>
        </div>
    )

}

export default SwipeViews