import { Link, Outlet } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';



function Header() {

    const authStore = useAuthStore();
    const isAuthenticated = authStore.isAuthenticated(); // Add this line to check authentication status

    return (
        <>
            <div className=" flex py-1 px-1 bg-gray-800">

                <div className='flex  justify-start  '>
                    <Link to='/'> <button className=" py-1 px-1 " type="button">
                        <img src='vite.svg' className=" h-14 w-10 text-gray-700" /></button>
                    </Link>
                </div>

                <div className='flex justify-center  items-center'>

                    <ul className="flex justify-center items-center gap-5 ">
                        <li className=' font-light text-2xl text-green-500 hover:text-green-300'><Link to='/e-vehicles'>E-Fahrzeuge</Link></li>
                        <li className=' font-light text-2xl text-green-500 hover:text-green-300'><Link to='/reservation-view'>Reservierungen</Link></li>
                        <li className=' font-light text-2xl text-green-500 hover:text-green-300'><Link to='/contact'>Kontakt</Link></li>
                        <li className=' font-light text-2xl text-green-500 hover:text-green-300'><Link to='/About-us'>Über uns</Link></li>
                    </ul>
                </div>

                <div className='flex justify-center  '>
                    {!isAuthenticated && (
                        <button className="text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
                            <Link to='/login'>Login</Link>
                        </button>
                    )}


                    {isAuthenticated && (
                        <button onClick={evt => authStore.logout()} className="flex items-center  gap-1 text-green-500 focus:outline-none focus:shadow-outline" type="button">
                            <svg className="h-8  text-green-500" width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z" />  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>Log Out
                        </button>
                    )}

                </div>
            </div>
            <Outlet />
        </>
    );
}

export default Header;

