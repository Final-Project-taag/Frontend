import React from "react";

import useAuthStore from '../hooks/useAuthStore';

const Icons = [
 { name: "logo-facebook", link: "#" },
 { name: "logo-twitter", link: "#" },
 { name: "logo-github", link: "#" },
 { name: "logo-linkedin", link: "#" },
 { name: "logo-instagram", link: "#" },
];
function Footer() {
   const authStore = useAuthStore();
   return ( 
       <footer className="  bottom-0 md:h-[5vh] pb-2 bg-gray-100 dark:bg-slate-900">
         <div
           className="flex flex-col-reverse justify-around md:flex-row item-center
         text-center   px-8 border-t-[1px] border-gray-200"
         >
           <span className='md:ml-0 pt-2 text-gray-600 dark:text-green-500 '>© 2023 Green Wheels. All rights reserved.</span>
           <div className=" m-0">
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
         
         </div>
       </footer>
     );
   };
export default Footer;