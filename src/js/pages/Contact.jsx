import React from "react";



function Contact() {


return (


<div className="container  h-full flex items-center gap-4  pt-28  m-auto max-w-4xl mx-auto flex-col md:flex-row">



<div className="max-w-[50%] w-full" >
    <img src="/public/contact.png" 
    alt="" className="w-full h-[560px] object-cover" />
</div>



<div>
    <div>
       <h1 className=" font-bold mt-4 text-4xl">Green Wheels</h1>
    </div>
    <h2 className="mt-2 text-xl">Lorem ipsum dolor sit amet consectetur .</h2>
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






            
        );
    }
    

export default Contact; 
