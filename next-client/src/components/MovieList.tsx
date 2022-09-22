import { useState, useEffect} from 'react'
import {useStoreState, useStoreActions} from '../store/store'

import MovieListItem from './MovieListItem'

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

    const selectMovie = (item, i) => {
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

    useEffect(() => {
        window.addEventListener("scroll", handleScroll)
        return () => {
          window.removeEventListener("scroll", handleScroll)
        }
    })

    const list = (data.length>0) ? movieListItems(data) : null ;
    const content = selection ? currentMovie(selection) : list

    return (
        < div id='movie-list' className='movie-list' onScroll={handleScroll}>
            {content}
        </div>
    );

}


export default MovieList;