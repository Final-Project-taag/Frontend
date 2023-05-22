import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
/* import useAuthStore from '../hooks/useAuthStore'; */
import Typewriter from "../features/typeWriterEffect";
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
  "/images/vw_ID5.jpg",
];
function MainPage() {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const introText =
    " Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu !";
  useEffect(() => {
    fetch("http://localhost:8081/vehicles")
      .then((response) => response.json())
      .then((data) => setVehicles(data))
      .catch((error) => console.error(error));
  }, []);
  const handletovehicle = () => {
    navigate("/e-vehicles");
  };
  return (

    <div className='pt-20 h-[95vh]'>
        <div className="flex justify-between w-full bg-cover bg-no-repeat bg-[url('https://img.freepik.com/premium-photo/eco-car-forest-road-with-earth-planet-going-through-forest-ecosystem-ecology-healthy-environment-road-trip-travel-eco-car-with-nature-electric-car-earth-ev-electrical-energy-environment_35024-2448.jpg?w=2000')]	 px-1  md:w-auto h-[16vh] md:h-[20vh] lg:h-[25vh] xl:h-[40vh]"
            style={{
               
                backgroundPositionY: "47%",
                
                
               
            
            }} 
        ></div>

        <div className='w-11/12 lg:w-3/4 flex lg:max-h-full flex-col   text-center  mt-6 md:mt-10 mb-2'>
                <h1 className="text-4xl md:text-6xl  text-green-600 dark:text-green-500">Green <span className='text-gray-600 dark:text-gray-500'>Wheels</span> </h1>
                 <Typewriter  text={introText} />
    
                <button onClick={handletovehicle}
                    className="w-fit m-auto  tracking-wider  md:mt-0
                     rounded-xl  shadow-md dark:shadow-sm shadow-gray-400   bg-green-600 p-3 px-6 font-base  text-gray-200 hover:bg-green-500  "
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
