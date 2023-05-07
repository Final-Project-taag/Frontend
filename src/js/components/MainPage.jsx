import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../hooks/useAuthStore';
import EVehicles from './E-Vehicles';
import Typewriter from './typeWriterEffect';

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
    const [vehicles, setVehicles] = useState([]);
    const introText = " Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu !"; 

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

        <div className='pt-14 h-screen '>
            <div className="flex justify-between w-full py-20 px-1 h-20 md:w-auto  md:h-[20vh] xl:h-[40vh]"
                style={{
                    backgroundImage: "url('/eco-car-forest-road-with-earth-planet.webp')",
                    backgroundPositionY: "bottom",
                    backgroundPosition:"center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    
                    
                    
                     
                }} 
            ></div>

            <div className='w-3/4 flex max-h-full flex-col  text-center mt-10 mb-10 '>
                    <h1 className="text-6xl  text-green-600">Green <span className='text-gray-600'>Wheels</span> </h1>
                     <p className='text-xl text-gray-600 font-bold min-h-[460px] md:min-h-full'><Typewriter  text={introText} /></p>
        
                    
        
                </div>
                <div><button onClick={handleRegisterClick}
                        className="w-fit m-auto  tracking-wider  rounded-xl bg-gray-600 p-3  uppercase  text-white flex items-center "
                        type="button"
                    >
                        Register
                    </button></div>
                {/* <div className=' max-w-2xl  relative  mt-10'>
        
                    <Carousel autoSlide={true} autoSlideInterval={7000}>
                        {slides.map((s) => (
                            <img  key={s} src={s} />
                        ))}
                    </Carousel> 
                </div>
                <div>
                <EVehicles/>
                </div> */}

        
        
            </div>
        );
        }
        
        export default MainPage;


