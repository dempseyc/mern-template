import { useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from 'easy-peasy'

import MovieListItem from './MovieListItem'

const MovieList = (props) => {
    const {query, submitQuery} = props;
    const [selected, setSelected] = useState(false)

    const setSelection = useStoreActions(actions => actions.movies.setSelection);

    const data = useStoreState(state => state.movies.data);
    const loading = useStoreState(state => state.movies.loading);
    const complete = useStoreState(state => state.movies.complete);
    const page = useStoreState(state => state.movies.page);
    const pages = useStoreState(state => state.movies.pages);
    const selection = useStoreState(state => state.movies.selection);


    const isBottom = (el) => {
        return el.getBoundingClientRect().bottom <= window.innerHeight;
    }

    const selectMovie = (item, i) => {
        // setSelected(true);
        setSelection({selection: item, index: i});
    }

    const showDetails = () => {
        console.log("show details")
    }

    const currentMovie = (item) => {
        return (
            <MovieListItem 
                    key={`mli-selected`} 
                    text={item.original_title}
                    handleClick={showDetails}
                />
        )
    }
    
    const movieListItems = (data) => {
        return data.map( (item,i) => {
            return (
                <MovieListItem 
                    key={`mli-${i}`} 
                    i={i}
                    text={item.original_title}
                    handleClick={() => selectMovie(item,i)}
                />
            )
        });
    }

    const trackScrolling = () => {
        const el = document.getElementById('movie-list');
        if (isBottom(el) && !loading && !complete && data.length<70) {
           submitQuery({query: query, page: page+1});
        }
    }

    useEffect(() => {
        document.addEventListener('scroll', trackScrolling);
        return function cleanup () {
            document.removeEventListener('scroll', trackScrolling);
        }
    }, [])

    useEffect(() => {
        if (selection) { setSelected(true); }
    }, [selection])

    const list = (data.length>0) ? movieListItems(data) : null ;
    const content = (selected) ? currentMovie(selection) : list

    return (
        < div id='movie-list' className='movie-list' onScroll={trackScrolling} >
            {content}
        </div>
    );

}


export default MovieList;