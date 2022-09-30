import { useState } from 'react'

import Loading from './Loading'

const ItemList = (props) => {
    const {query, submitQuery, contentName, data, loading, complete, pages, ListItem } = props;
    const[selection, setSelection] = useState(null);

    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const handleScroll = (e) => {
        const element = e.target;
        if (isBottom(element)) {
            if (!loading && !complete && data.length<70) {
                submitQuery({text: query.text, page: query.page+1});
            }
        }
    }
    
    const listItems = (data) => {

        const handleClick = (i, expanded) => {
            if (expanded === i) {
                setSelection(null);
            }
            else {
                setSelection(i)
            }
        };

        return data.map( (item,i) => {
            return (
                <ListItem 
                    key={`mli-${i}`} 
                    idx={i}
                    data={item}
                    selection={selection}
                    handleClick={() => handleClick(i, selection)}
                />
            )
        });
    }

    const list = (data.length>0) ? listItems(data) : null ;

    return (
        <div id='item-list' className='item-list' onScroll={handleScroll}>
            {list}
            <Loading contentName={contentName} isLoading={loading} />
        </div>
    );

}

export default ItemList;