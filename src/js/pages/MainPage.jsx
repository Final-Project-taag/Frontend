import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
/* import useAuthStore from '../hooks/useAuthStore'; */

import Typewriter from '../features/typeWriterEffect';
import  EfahrzeueModal from '../features/EfahrzeueModal';


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

    const handletovehicle = () => {
        navigate('/e-vehicles');
    };

    return (

        <div className='pt-14 h-screen'>
            <div className="flex justify-between w-full  py-20 px-1"
                style={{
                    backgroundImage: "url('/eco-car-forest-road-with-earth-planet.webp')",
                    backgroundPositionY: "bottom",
                    backgroundPosition:"center",
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    height:"40vh",   
                }} 
            ></div>

            <div className='w-3/4 flex max-h-full flex-col   text-center mt-10 mb-10'>
                    <h1 className="text-6xl  text-green-600">Green <span className='text-gray-600'>Wheels</span> </h1>
                     <Typewriter  text={introText} />
        
                    <button onClick={handletovehicle}
                        className="w-fit m-auto  tracking-wider  mt-14 rounded-2xl shadow-md shadow-gray-400  bg-green-600 p-3   font-bold text-white  hover:scale-105"
                        type="button"
                    >
                        zu unsern Fahrzeuge
                        
                    </button>

                    
        
                </div>
                
                    
                
               
                <div>
                
                </div>
               

        
        
            </div>
        );
        }
        
        export default MainPage;


