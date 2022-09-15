
// import {useStoreState, useStoreActions} from '../store/store'
import Link from 'next/link'

const ViewMore = (props) => {
    return (
        <>
            <ul>
                <li><Link href='/admin'><a>Admin Page</a></Link></li>
            </ul>
        </>
    )
}

export default ViewMore