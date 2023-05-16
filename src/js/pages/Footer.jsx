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
        <footer className="h-12">
          <div
            className="flex flex-col-reverse justify-around md:flex-row item-center 
          text-center  py-2 px-8 border-t-[1px] border-gray-500"
          >
            <span className='md:ml-0 pt-2 text-green-600'>© 2023 Green Wheels. All rights reserved.</span>

            <div className=" m-0">
      {Icons.map((icon) => (
        <span
          key={icon.name}
          className="p-2 cursor-pointer inline-flex items-center
        rounded-full  mx-1.5 text-xl hover:text-gray-100 hover:bg-green-500
        duration-300 "
        >
          <ion-icon name={icon.name}>
            
          </ion-icon>
        </span>
      ))}
    </div>
            
           {/* <span className='md:mr-0 mt-2'> <SocialIcons Icons={Icons} /> </span> */}
          </div>
        </footer>
      );
    };

export default Footer;