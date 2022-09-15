import Link from 'next/link'
// const zeroAlpha1px = '/000000-0.png';  

const Header = () => {
    return (
        <div className='Header'>
            <Link href="/"><a>
                <h1>Next.js-CLIENT HEADER</h1>
            </a></Link>
        </div>
    )
};

export default Header;