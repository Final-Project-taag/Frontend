
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
    
    return (
        
        <div className=" flex justify-between w-full h-full  py-20 px-1 ">
            <div className='w-2/4 max-w-lg h-full'>
                <p className="text-3xl font-bold text-gray-800">asdad</p>
            </div>
 
            <div className=' max-w-lg  relative  '>

            <Carousel autoSlide={true} autoSlideInterval ={7000}>
                {slides.map((s)=>(
                <img src={s} />
                ))}
            </Carousel>
            </div>
            
        </div>
        
        
        
    );
}

export default MainPage;