import { useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from '../store/store'

import MovieListItem from './MovieListItem2'
import Loading from './Loading'

const MovieList = (props) => {
    const {query, submitQuery} = props;
    // const [selected, setSelected] = useState(false)

    const setSelection = useStoreActions(actions => actions.movies.setSelection);

    const data = useStoreState(state => state.movies.data);
    const loading = useStoreState(state => state.movies.loading);
    const complete = useStoreState(state => state.movies.complete);
    const page = useStoreState(state => state.movies.query.page);
    const pages = useStoreState(state => state.movies.pages);
    const selection = useStoreState(state => state.movies.selection);

    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const handleScroll = (e) => {
        const element = e.target;
        if (isBottom(element)) {
            if (!loading && !complete && data.length<70) {
                submitQuery({text: query.text, page: page+1});
            }
        }
    }

    const showDetails = () => {
        console.log("show details")
    }
    
    const movieListItems = (data) => {

        const handleClick = (i, selection) => {
            if (selection === i) {
                setSelection(null);
            }
            else {
                setSelection(i)
            }
        };

        return data.map( (item,i) => {
            const date = item.release_date && `(${item.release_date.slice(0,4)})`;
            const overview = item.overview && item.overview;
            return (
                <MovieListItem 
                    key={`mli-${i}`} 
                    idx={i}
                    data={{text: `${item.original_title} ${date}`, overview }}
                    selection={selection}
                    handleClick={() => handleClick(i, selection)}
                />
            )
        });
    }

    const list = (data.length>0) ? movieListItems(data) : null ;

    return (
        <div id='movie-list' className='movie-list' onScroll={handleScroll}>
            {list}
            <Loading contenName="movies" isLoading={loading} />
        </div>
    );

}


export default MovieList;