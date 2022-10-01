import { useStoreState, useStoreActions } from "../store/store";
import FilteredSearchList from "./FilteredSearchList";

const ViewMain = (props) => {
  const submitQuery = useStoreActions((actions) => actions.movies.submitQuery);
	const resetQuery = useStoreActions((actions) => actions.movies.resetQuery);
	const query = useStoreState((state) => state.movies.query);
  const data = useStoreState((state) => state.movies.data);
  const loading = useStoreState((state) => state.movies.loading);
  const complete = useStoreState((state) => state.movies.complete);
  const pages = useStoreState((state) => state.movies.pages);

	const filterFunction = (data, filter) => {
		const filterWords = filter.toLowerCase().split(" ");
		const testString = data.original_title.toLowerCase();
		return filterWords.every(word => testString.includes(word));
	}

  return (
      <FilteredSearchList 
				contentName="movies"
				query={query}
				submitQuery={submitQuery} 
				resetQuery={resetQuery}
				data={data}
				loading={loading}
				complete={complete}
				pages={pages}
				filterFunction={filterFunction}
			/>
  );
};

export default ViewMain;
