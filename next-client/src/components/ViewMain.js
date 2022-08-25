
import {useStoreState, useStoreActions} from 'easy-peasy'
import MovieList from './MovieList'
import SearchForm from './SearchForm'

const ViewMain = (props) => {
    const submitQuery = useStoreActions(actions => actions.movies.submitQuery);
    const query = useStoreState(state => state.movies.query);
    
    return (
        <>
            <SearchForm query={query} submitQuery={submitQuery}/>
            <MovieList
                query={query}
                submitQuery={submitQuery}
            />
        </>
    )
}

export default ViewMain