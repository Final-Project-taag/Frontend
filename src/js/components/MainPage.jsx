
import useAuthStore from '../hooks/useAuthStore';

import Carousel from './Carousel';
const slides = [
/*     "https://i.ibb.co/ncrXc2V/1.png",
    "https://i.ibb.co/B3s7v4h/2.png",
    "https://i.ibb.co/XXR8kzF/3.png",
    "https://i.ibb.co/yg7BSdM/4.png"
     */
    /* "/images/vw_ID3.webp",
    "/images/vw_Id4.webp",
    "/images/vw_Id5_SUV.avif", */
    "/images/autos_01.jpg",
    "/images/autos_02.jpg",
    "/images/autos_03.jpg" ,
    "/images/motorrad_01.jpg",
    "/images/motorrad_02.jpg",
    "/images/motorrad_03.jpg",
    "/images/scooter_01.jpg",
    "/images/scooter_02.jpg",
    "/images/scooter_03.jpg"


  ]

function MainPage() {
    const authStore = useAuthStore();
    
    return (
        
        <div className=" flex justify-between w-full h-full  py-20 px-1 ">
            <div className='w-2/4 max-w-lg h-full'>
                <p className="text-3xl font-bold text-gray-800">asdad</p>
            </div>
 
            <div className=' max-w-lg  relative  '>

            <Carousel autoSlide={true} autoSlideInterval ={10000}>
                {slides.map((s)=>(
                <img src={s} />
                ))}
            </Carousel>
            </div>
            
        </div>
        
        
        
    );
}

export default MainPage;