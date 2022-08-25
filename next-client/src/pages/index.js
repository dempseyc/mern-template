import SwipeViews from '../components/SwipeViews'
import SwiperView from '../components/SwiperView'
import { useStoreState, useStoreActions } from 'easy-peasy'

const App = () => {
	console.log('app render');
	const HOME_VIEWS = useStoreState(state => state.config.HOME_VIEWS);
	const currView = useStoreState(state => state.currView);
	const setCurrView = useStoreActions(actions => actions.setCurrView);

	const buildSwiperViews = () => {
		const views = HOME_VIEWS.map((view,i) => {
			let viewName = view;
			return (
			<SwiperView
				key={i}
				pageIdx={i}
				viewName={viewName}
			/> )
		});
		return views;
	}
		
	return (
		<>
		<SwipeViews
			index={currView}
			setIndex={(index) => setCurrView({index:index, source:'swipeable_views'})}
			children={ buildSwiperViews() }
		/>	
		</>
	)
}


export default App