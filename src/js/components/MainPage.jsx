import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';

import Carousel from './Carousel';
const slides = [
    "/images/Tesla-Model-3.webp",
    "/images/autos_03.jpg",
    "/images/autos_04.jpg",
    "/images/autos_05.jpg",
    "/images/E-Bike-X.jpg",
    "/images/ERoller Xyhundert.webp",
    "/images/Eroller-X.jpeg",
    "/images/motorrad_01.jpg",
    "/images/motorrad_02.jpg",
    "/images/SuperScooter 3000.jpg",
    "/images/vw_Id5_SUV.avif",
    "/images/vw_ID5.jpg"


];

function MainPage() {
    const navigate = useNavigate();
    const authStore = useAuthStore();
    const [vehicles, setVehicles] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8081/vehicles')
            .then(response => response.json())
            .then(data => setVehicles(data))
            .catch(error => console.error(error));
    }, []);

    const handleRegisterClick = () => {
        navigate('/register');
    };

    return (


        <div
            className="flex justify-between w-full h-full py-20 px-1"
             style={{
                backgroundImage: "url('/images/bg für Login.jpg')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat"
            }} 
        >
            <div className='w-2/4 max-w-lg h-full pt-10'>
                <h1 className="text-5xl font-bold text-green-600">Green <span className='text-green-800'>Wheels</span> </h1>
                <p className='text-2xl'>"Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu!"</p>

                <button
                    onClick={handleRegisterClick}
                    className="inline-block rounded bg-slate-700 px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                    type="button"
                >
                    Register
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