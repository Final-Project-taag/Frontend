import {Link, Outlet} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';

function Header() {
    const authStore = useAuthStore();

    return (
        <>
        <div className="flex justify-between mx-auto  py-5 px-2">
            <Link to='/'> <button  className=" py-1 px-10 " type="button">
                <img src='vite.svg' className="h-20 w-20 text-gray-700" /></button>
            </Link>

            <nav className="flex justify-between mx-auto  py-5 px-2">
                <ul className="flex justify-center items-center gap-4 ">
                    <li className=' font-bold text-green-600 hover:text-green-800'><Link to='/Booking'>booking</Link></li>
                    <li className=' font-bold text-green-600 hover:text-green-800'><Link to='/services'>services</Link></li>
                    <li className=' font-bold text-green-600 hover:text-green-800'><Link to='/Abo'>Abo</Link></li>
                    <li className=' font-bold text-green-600 hover:text-green-800'><Link to='/contact'>contact</Link></li>
                    <li className=' font-bold text-green-600 hover:text-green-800'><Link to='/about-us'>About us</Link></li>
                    <li className=' font-bold text-green-600 hover:text-green-800'><Link to='/allcars'>All Cars</Link></li>
                </ul>
                
            </nav>
            
            <button onClick={evt => authStore.logout()}  className=" flex items-center  justify-center gap-1  text-gray-700 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
                Log In
            </button>
            <button onClick={evt => authStore.logout()}  className=" flex items-center  justify-center gap-1  text-gray-700 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
                <svg className="h-12 w-10 text-gray-700"  viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>Log Out
            </button>
        </div>
        <Outlet />
        </>
         
    );
}

export default Header;