import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';



import Carousel from './Carousel';
const slides = [
    "https://i.ibb.co/ncrXc2V/1.png",
    "https://i.ibb.co/B3s7v4h/2.png",
    "https://i.ibb.co/XXR8kzF/3.png",
    "https://i.ibb.co/yg7BSdM/4.png"

]

function MainPage() {
    const authStore = useAuthStore();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/vehicles')
          .then(response => response.json())
          .then(data => setVehicles(data))
          .catch(error => console.error(error));
      }, []);

    return (

        <div className=" flex justify-between w-full h-full  py-20 px-1 ">
            <div className='w-2/4 max-w-lg h-full pt-10'>
                <h1 className="text-5xl font-bold text-green-600">Green <span className='text-green-800'>Wheels</span> </h1>
                <p className='text-2xl'>"Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu!"</p>

                <button onClick={evt => authStore.logout()} className=" inline-block rounded bg-slate-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]" type="button">
                    <Link to='/register'>register</Link>

                </button>

            </div>

            <div className=' max-w-2xl  relative  '>

                <Carousel autoSlide={true} autoSlideInterval={7000}>
                    {slides.map((s) => (
                        <img src={s} />
                    ))}
                </Carousel>
            </div>

        </div>



    );
}

export default MainPage;