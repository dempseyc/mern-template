import { useEffect } from 'react'
import './styles/CSSreset.css'
import './styles/App.scss'
// import SwipeableViews from 'react-swipeable-views'
import SwipeViews from './SwipeViews'

import Header from './Header'
import NavBar from './NavBar'
import SwiperPage from './SwiperPage'

import { useStoreState, useStoreActions } from 'easy-peasy'


// const viewsStyle = {
// 	position: 'absolute',
// 	top: 0,
// 	left: 0,
// 	minHeight: '100%',
// 	minWidth: '100vw'
// };

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
		{/* <div className="SV-Layout"> */}
		{/* <SwipeableViews 
			enableMouseEvents
			style={viewsStyle}
			className='SwipeableViews o-a-none'
			onChangeIndex={ (index,indexLatest,meta) => {
				if (meta.reason === 'focus') {
					index = indexLatest
				}
				setCurrPage({index:index, source:'swipeable_views'})
				} }
			children={ buildSwiperPages() }
			ignoreNativeScroll={true}
			index={currPage}
		/> */}
		<SwipeViews
			index={currPage}
			setIndex={(index) => setCurrPage({index:index, source:'swipeable_views'})}
			children={ buildSwiperPages() }
		/>
		{/* </div> */}
		<NavBar
			pageNames={pageNames}
			pageColors={pageColors}
			// handleTabChange={(e, newVal) => { setCurrPage({index:newVal, source:'tab_change'}) }}
			openModalButtonType={pageNames[currPage]}
		/>		
		</div>
	)
}


export default App