import {Link, Outlet} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';



function Header() {
    const authStore = useAuthStore();

    return (
        <>
        <div className=" flex  justify-between items-center  py-1 px-1 bg-black">
            <div className='flex  justify-start  '>
            <Link to='/'> <button  className=" py-1 px-1 " type="button">
                <img src='vite.svg' className=" h-14 w-10 text-gray-700" /></button>
            </Link>
            </div>
            
            <div className='flex justify-center  items-center'>
            
                <ul className="flex justify-center items-center gap-5 "> 
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700'><Link to='/e-vehicles'>E-Vehicles</Link></li>
                     <li className=' font-bold text-2xl text-green-500 hover:text-green-700'><Link to='/booking'>Booking</Link></li>
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700'><Link to='/contact'>Contact</Link></li>
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700'><Link to='/About-us'>About us</Link></li>
                </ul>
                
           
            </div>
             <div className='flex justify-center '>
            <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/login'>Login</Link>
                
            </button>
            </div>
            {/* <button onClick={evt => authStore.logout()}  className=" flex items-center  justify-center gap-1  text-gray-700 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
             <svg className="h-8 w-8 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>Log Out
          </button> */}
        </div>
        <Outlet />
        </>
    );
}

export default Header;