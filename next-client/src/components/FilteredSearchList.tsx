import { useState } from 'react'

import SearchForm from './SearchForm'
import ItemList from './ItemList'
import MovieListItem from './MovieListItem2'

const FilteredSearchList = (props) => {
    const {contentName, query, submitQuery, resetQuery, data, loading, complete, pages, filterFunction} = props;
    const [filter, setFilter] = useState('');

    const filteredData = data.filter((item) => filterFunction(item, filter));
    
    return (
        <>
            <SearchForm submitQuery={submitQuery}  resetQuery={resetQuery} setFilter={setFilter}/>
            <ItemList
                query={query}
                submitQuery={submitQuery}
                contentName={contentName}
                filter={filter}
                data={filteredData}
                loading={loading}
                complete={complete}
                pages={pages}
                ListItem={MovieListItem}
            />
        </>
    )
}

export default FilteredSearchList;