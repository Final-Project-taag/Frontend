import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
=======
import useAuthStore from '../hooks/useAuthStore';
import EVehicles from './E-Vehicles';
import Typewriter from './typeWriterEffect';
>>>>>>> ahmad

/* import { ScrollScene } from 'scrollscene';
import { gsap } from 'gsap';
 */

function MainPage() {
<<<<<<< HEAD
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
=======
    const navigate = useNavigate();
    const [vehicles, setVehicles] = useState([]);
    const introText = " Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu !"; 
>>>>>>> ahmad

  /*     const elemRef = useRef(null);
      const rectangleRef = useRef(null);
   */
  /* function initializeAnimation() {
      // Color palette variables
      let dark = '#252525';
      let mid = '#888';
      let light = 'rgba(255, 255, 255, 0.4)';
    
      // Add scrollmagic controller
      let controller = new ScrollMagic.Controller();
    
      //------------------
      //TIMELINE 1
      //------------------
    
      // Add timeline
      let tl1 = anime.timeline({ autoplay: false });
    
      // Add animations
      let s1a1 = {
        // ...
      };
    
      let s1a2 = {
        // ...
      };
    
      let s1a3 = {
        // ...
      };
    
      // Add children
      tl1.add(s1a3).add(s1a1, '-=1600').add(s1a2, '-=1300');
    
      // Get section height
      let oneHeight = document.getElementById("one").clientHeight;
      console.log('oneHeight: ' + oneHeight);
    
      //------------------
      //SCENE 1
      //------------------
    
      //Add first scrollmagic scene
      let scene1 = new ScrollMagic.Scene({
        // ...
      })
    
      // Add debug indicators
      .addIndicators({
        // ...
      })
    
      // Trigger animation timeline
      .on("enter", function (event) {
        tl1.play();
      })
    
      .addTo(controller);
    }
    
} */

  /* useEffect(() => {
    if (elemRef.current && rectangleRef.current) {
      const tl = gsap.timeline({ paused: true });
  
      tl.fromTo(
        elemRef.current,
        {
          opacity: 0,
          x: 250,
          rotation: 90,
          scale: 2,
          color: light,
        },
        {
          opacity: 1,
          x: 0,
          rotation: 0,
          scale: 1.5,
          color: dark,
          duration: 0.8,
        }
      );
  
      new ScrollScene({
        triggerElement: elemRef.current,
        gsap: {
          timeline: tl,
        },
      });
    }
  }, []);
   */




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
      <div className="animation-container">



        <div className='h-full'>
          <div className="flex justify-between w-full  py-20 px-1"
            style={{
              backgroundImage: "url('/eco-car-forest-road-with-earth-planet.webp')",
              backgroundPositionY: "bottom",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              height: "40vh",
            }}
          ></div>

          <div className='w-3/4 flex max-h-full flex-col   text-center mt-10 mb-10'>
            <h1 className="text-6xl font text-green-600">Green <span className='text-gray-600'>Wheels</span> </h1>
            <p className='text-2xl text-gray-700'>"Entdecken Sie mit uns die Zukunft der Mobilität - einfach, bequem und umweltbewusst. Buchen Sie Ihre nächste Fahrt mit unseren Elektrofahrzeugen und tragen Sie dazu bei, unseren Planeten zu schonen und die Lebensqualität in unseren Städten zu verbessern. Machen Sie den ersten Schritt in eine nachhaltige Zukunft und erleben Sie Mobilität neu!"</p>

            <button onClick={handleRegisterClick}
              className="w-fit m-auto  tracking-wider  mt-14 rounded-xl bg-gray-600 p-3  uppercase  text-white "
              type="button"
            >
              Register
            </button>

          </div>

        </div>

      </div>
    </>
  )
}

export default MainPage;


