import {useEffect, useRef} from 'react'
import { useRouter } from 'next/router'
import { useStoreState, useStoreActions } from 'easy-peasy'
import SwipeViews from 'components/SwipeViews'
import SwiperView from 'components/SwiperView'
import SP_TAB_Layout from "components/SP_TAB_Layout"

const Home = () => {
	const router = useRouter()
	console.log('home render');
	const HOME_VIEWS = useStoreState(state => state.config.HOME_VIEWS);
	const currView = useStoreState(state => state.currView);
	const setCurrView = useStoreActions(actions => actions.setCurrView);
	const currViewName = useRef(HOME_VIEWS[currView]);

	useEffect(() => {
		currViewName.current = HOME_VIEWS[currView];
		if (router.pathname !== `/home/${currViewName.current}`) {
			router.push({
				pathname: '/home/[view]',
				query: { view: `${currViewName.current}` },
			  })
		}
	},[currView])

	const buildSwiperViews = () => {
		const views = HOME_VIEWS.map((view,i) => {
			let viewName = view;
			return (
			<SwiperView
				key={i}
				index={i}
				viewName={viewName}
			/> )
		});
		return views;
	}
		
	return (
		<>
		<SwipeViews
			index={currView}
			setIndex={(index) => setCurrView(index)}
			children={ buildSwiperViews() }
		/>	
		</>
	)
}

export default function HomeView() {
    return (
        <SP_TAB_Layout>
            <Home/>
        </SP_TAB_Layout>
    )
}