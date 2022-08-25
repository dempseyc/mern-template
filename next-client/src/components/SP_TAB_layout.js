import Header from './Header'
import NavBar from './NavBar'


export default function Layout({ children }) {
    return (
      <div className='wrapper'>
        <Header />
        <NavBar />	
        <>{children}</>
      </div>
    )
  }