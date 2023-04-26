import {Link, Outlet} from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import React, { useState , useEffect} from 'react'




function Header() {
    useEffect(() => { 
        document.addEventListener('click', () => { setMobileNav(false) }, true); 
        return () =>
    { document.removeEventListener('click', () => { setMobileNav(false)}, true); }; }, []);

    const authStore = useAuthStore();
    const [mobileNav, setMobileNav]= useState(false);
    const onToggleMenu = (evt)=> {
        evt.stopPropagation();

        setMobileNav(!mobileNav);
    }

    return (
        <>
        <nav className='fixed top-0 left-0 w-full shadow z-50'>
        <div className=" flex  justify-between items-center  py-1 px-3 bg-gray-800">
            <div className='flex  justify-start m-0'>
            <Link to='/'> <button  className=" py-1 px-1 " type="button">
                <img src='vite.svg' className=" h-14 w-10 text-gray-700" /></button>
            </Link>
            </div>
            
            <div className='flex justify-between items-center text-gray-100 m-0'>
            
                <ul className="hidden md:flex items-center pr-10 text-base font-semibold cursor-pointer"> 
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700 py-4 px-6'><Link to='/services'>services</Link></li>
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700 py-4 px-6'><Link to='/Abo'>Abo</Link></li>
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700 py-4 px-6'><Link to='/contact'>contact</Link></li>
                    <li className=' font-bold text-2xl  text-green-500 hover:text-green-700 py-4 px-6'><Link to='/About-us'>About</Link></li>
                </ul>
                
             

                <div className='hidden md:flex '>
            <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/login'>Login</Link>
                
            </button>
            <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/register'>register</Link>

            </button>
            
            

            <ul className={`md:flex md:items-center justify-between md:pb-0 pb-12 absolute md:static bg-white md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20 ':'top-[-490px]'}`}>
        
        </ul>

        
            

            </div>


            <div class="flex items-center">
                <ion-icon onClick={(evt)=> onToggleMenu(evt)} name="menu" class="text-3xl  cursor-pointer md:hidden "></ion-icon>
            </div>
    


</div>




             
            {/* <button onClick={evt => authStore.logout()}  className=" flex items-center  justify-center gap-1  text-gray-700 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
             <svg className="h-8 w-8 text-gray-700"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>Log Out
          </button> */}
        </div>
        <Outlet />
        
        
        <div className={`mobile-nav flex flex-col gap-1 absolute bg-white w-full ${mobileNav ? 'block':'hidden'}`}
        onClick={ (evt) => evt.stopPropagation()}
        >
        <ul>
        <li className=' font-bold text-2xl text-green-500 hover:text-green-700 py-4 px-6'><Link className='block py-2' to='/services'>services</Link></li>
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700 py-4 px-6'><Link className='block py-2' to='/Abo'>Abo</Link></li>
                    <li className=' font-bold text-2xl text-green-500 hover:text-green-700 py-4 px-6'><Link className='block py-2' to='/contact'>contact</Link></li>
                    <li className=' font-bold text-2xl  text-green-500 hover:text-green-700 py-4 px-6'><Link className='block py-2' to='/About-us'>About</Link></li>  
        </ul>

    <div className='flex gap-3 p-2  '>
    <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/login'>Login</Link>
                
            </button>
            <button onClick={evt => authStore.logout()}   className=" text-2xl text-green-500 font-sans py-1 px-1 rounded focus:outline-none focus:shadow-outline" type="button">
            <Link to='/register'>register</Link>

            </button>
    </div>

    </div>



        </nav>
        </>
    );
}

export default Header;