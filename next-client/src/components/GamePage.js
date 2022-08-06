
import {useStoreState, useStoreActions} from 'easy-peasy'
import MovieList from './MovieList'
import SearchForm from './SearchForm'

const GamePage = (props) => {
    const {pageName, bgColor} = props;

    const submitQuery = useStoreActions(actions => actions.movies.submitQuery);
    const query = useStoreState(state => state.movies.query);
    
    const pageStyle = {
        backgroundColor: bgColor,
    }
    
    return (
        <div 
        className={`${pageName} SwiperPage`}
        style={pageStyle}
        >
            <span>{`${pageName} pagename`}</span>
            <SearchForm query={query} submitQuery={submitQuery}/>
            <MovieList
                query={query}
                submitQuery={submitQuery}
            />
        </div>
    )
}

export default GamePage