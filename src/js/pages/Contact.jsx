import React from "react";

import Map from "../features/Map";


export default function Contact() {


return (

<div className="flex flex-col justify-center items-center  h-full mb-10 mt-24 w-screen">


<div className="container  h-full flex items-center   mb-12 max-w-4xl mx-auto flex-col md:flex-row">



<div className="max-w-[100%] md:max-w-[50%] w-full mt-16" >
<img src="https://investingminister.com/wp-content/uploads/2020/09/carhandshake.jpg" 
    alt="" className="w-full h-[500px] object-cover" />

    
</div>




<div>
    <div>
	<h1 className="text-6xl  text-green-600">Green <span className='text-gray-600'>Wheels</span> </h1>
    </div>
    <h2 className="mt-2 text-xl">Eco Fahrzeuge  rental App.</h2>
    <ul className="mt-8">
        <li>Adresse: </li>
        <li>Musterstraße 123</li>
        <li>12345 Musterstadt</li>
    </ul>

    <ul className="mt-4">
        <li>Telefonnummer: 01234 123456</li>
        <li className="mt-1">Email: hallo@superduperseite.de</li>
        <li></li>
    </ul>

    
</div>



</div>

<div className="w-3/4  m-auto  py-4 "> 
<Map />
</div>
</div>








            
        );
    }
    


