import {useMemo, useEffect, useState, useRef} from 'react'
import { useStoreState, useStoreActions } from '../../store/store'
import SwipeViews from 'components/SwipeViews'
import SwiperView from 'components/SwiperView'
import SP_TAB_Layout from "components/SP_TAB_Layout"
import Router from 'next/router'

const HOME_VIEWS = ['main','chat','user','more'];

const Home = () => {
	// const router = useRouter();
	console.log('home render');
	const currView = useStoreState(state => state.currView);
	const setCurrView = useStoreActions(actions => actions.setCurrView);
	const currViewName = useMemo(() => HOME_VIEWS[currView], [currView]);

	useEffect(() => {
		Router.push(currViewName)
	}, [currViewName])

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
		>{buildSwiperViews() }</SwipeViews>	
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