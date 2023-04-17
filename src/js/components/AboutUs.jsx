import React from "react";

function AboutUs() {
  return (
    <div>
      <div className="text-center bg-black-500  mb-6">
        <h1 className=" text-start text-xl font-bold ml-12">About Us</h1>
        <h3 className="text-emerald-600 text-xl font-bold mb-4">
      
          Welcome to Green-Wheels GmbH! <br/> <br /> 
          <p className="text-yellow-700">
            You will enjoy a service more than your Expectation! 
          </p>
        </h3>

        <p className="font-sans  text-center ml-10 mr-10" ml-10>
          Unser Ziel ist es, unseren Kunden die neuesten Elektrofahrzeuge
          anzubieten. Wir haben einen langen Weg hinter uns und wissen daher am
          besten, wie wir Sie mit modernen, ökologischen und dennoch preiswerten
          Mietfahrzeugen begeistern können. Wir bieten all dies bei gleichzeitig
          exzellentem Kundenservice und freundlichem Support.
        </p>
      </div>
      <br />

      <div className=" flex flex-col text-center ">
        <h2 className=" text-emerald-600 text-xl font-bold mb-4">Our Green Dream Team</h2>
      </div>

      <br />
      <br />

      <div className="flex flex-row mx-2">
        <div className="basis-1/4 ">
          <p className="ml-16 text-blue-600">Gabriella, Full Stack Developer</p>
          <img
            className="object-cover  w-52 ml-16"
            src={"/images/avatar-place-holder.webp"}
            alt="Full Stack Developer"
          />
        </div>

        <div className="basis-1/4 ">
          <p className="ml-16 text-blue-600">Ahmad, Full Stack Developer</p>
          <img
            className="object-cover  w-52 ml-16"
            src={"/images/avatar-place-holder.webp"}
            alt="Full Stack Developer"
          />
        </div>

        <div className="basis-1/4 ">
          <p className="ml-16 text-blue-600">Ammar, Full Stack Developer</p>
          <img
            className="object-cover  w-52 ml-16"
            src={"/images/avatar-place-holder.webp"}
            alt="Full Stack Developer"
          />
        </div>

        <div className="basis-1/4 ">
          <p className="ml-16 text-blue-600">Tenaw, Full Stack Developer</p>
          <img
            className="object-cover  w-52 ml-16"
            src={"/images/avatar-place-holder.webp"}
            alt="Full Stack Developer"
          />
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
