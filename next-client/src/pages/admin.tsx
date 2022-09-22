import Link from 'next/link'
import Button from '@mui/material/Button';

const Dashboard = (): JSX.Element => {
    return (
        <div className="Dashboard">
            <header>DASHBOARD</header>
            <p>You have some special secret non-public info here on this route.</p>
            <Link href='/home' passHref>
            <Button
                key="home-back"
            >Back to Home</Button>
            </Link>
        </div>
    )
}

export default Dashboard