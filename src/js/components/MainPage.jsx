import { urlencoded } from 'express';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PickupAndReturnLocation from './SearchBar.jsx';

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
    <>
      <div className="animation-container ">



        <div className='h-full'>
          <div className="flex justify-between w-full  py-52 px-1"
            style={{
              backgroundImage: "url('/eco-car-forest-road-with-earth-planet.webp')",
              backgroundPositionY: "bottom",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "40vh",
            }}
          ></div>
          <PickupAndReturnLocation/>

          <div className='w-3/4 flex max-h-full flex-col   text-center mt-10 mb-10'>
            <h1 className="text-6xl font text-green-600">Green <span className='text-gray-600'>Wheels</span> </h1>
            <p className='text-2xl text-gray-700'>"Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu!"</p>

<PickupAndReturnLocation/>
            <button onClick={handleRegisterClick}
              className="w-fit m-auto  tracking-wider  mt-14 rounded-xl bg-gray-600 p-3  uppercase  text-white "
              type="button"
            >
              zu unseren Fahrzeugen
            </button>

          </div>
          
        </div>
<div>


</div>
      </div>
    </>
  )
}

export default MainPage;


