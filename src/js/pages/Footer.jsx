import React from "react";

import useAuthStore from '../hooks/useAuthStore';

/* const Icons = [
 { name: "logo-facebook", link: "#" },
 { name: "logo-twitter", link: "#" },
 { name: "logo-github", link: "#" },
 { name: "logo-linkedin", link: "#" },
 { name: "logo-instagram", link: "#" },
]; */
function Footer() {
   const authStore = useAuthStore();
   return ( 
       <footer className=" fixed w-full z-50 bottom-0 h-fit md:h-[5vh]  bg-gray-100 dark:bg-slate-900">
         <div
           className="flex  flex-col-reverse justify-around md:flex-row item-center 
         text-center   px-8  "
         >
           <span className='md:ml-0 pb-2 md:pb-0 md:pt-3 md:text-sm text-gray-600 dark:text-green-500 '>© 2023 Green Wheels. All rights reserved.</span>
           {/* <div className=" m-0 pt-2">
     {Icons.map((icon) => (
       <span
         key={icon.name}
         className="p-2 cursor-pointer inline-flex items-center
       rounded-full  mx-1.5 text-xl text-gray-600 dark:text-gray-400 hover:text-gray-100 hover:bg-green-500
       duration-300 "
       >
         <ion-icon name={icon.name}>
         </ion-icon>
       </span>
     ))}
   </div>
          */}
         </div>
       </footer>
     );
   };
export default Footer;