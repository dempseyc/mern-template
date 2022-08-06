import SwipeViews from '../components/SwipeViews'
import Header from '../components/Header'
import NavBar from '../components/NavBar'
import SwiperPage from '../components/SwiperPage'

import { useStoreState, useStoreActions } from 'easy-peasy'

const pageColors = ['#808080','#00aaaa','#3a99a7'];
const pageNames = ['Game','Chat','User'];

const App = () => {
	console.log('app render');
	const currPage = useStoreState(state => state.currPage);
	const setCurrPage = useStoreActions(actions => actions.setCurrPage);

	let swiperPages = [];

	const buildSwiperPages = () => {
		const pages = pageColors.map((c,i) => {
			let pageName = pageNames[i];
			return (
			<SwiperPage
				key={i}
				pageIdx={i}
				bgColor={c}
				pageName={pageName}
			/> )
		});
		return pages;
	}

	// useEffect(() => {
	// 	swiperPages = buildSwiperPages();
	// }, [])
		
	return (
		<div className="App">
		<Header />
		<SwipeViews
			index={currPage}
			setIndex={(index) => setCurrPage({index:index, source:'swipeable_views'})}
			children={ buildSwiperPages() }
		/>
		<NavBar
			pageNames={pageNames}
			pageColors={pageColors}
			openModalButtonType={pageNames[currPage]}
		/>		
		</div>
	)
}


export default App