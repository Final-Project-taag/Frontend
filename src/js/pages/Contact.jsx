import React from "react";

import Map from "../features/Map";

export default function Contact() {
  return (
    <div className="flex flex-col justify-center items-center  h-full pt-20  ">
      <h1 className=" pt-10 text-6xl  text-green-600 dark:text-green-500">
        Green <span className="text-gray-600  dark:text-gray-400">Wheels</span>{" "}
      </h1>
      <p className=" text-center mt-2 text-2xl  dark:text-gray-300 ">
        Eco Fahrzeuge rental App.
      </p>
      <div className="  h-full flex items-center   mb-12 max-w-4xl mx-auto flex-col md:flex-row">
        <div className="max-w-[100%] md:max-w-[50%] w-full mt-16">
          <img
            src="https://investingminister.com/wp-content/uploads/2020/09/carhandshake.jpg"
            alt=""
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div className=" max-w-4xl">
          <ul className=" mb-32 text-left text-3xl text-gray-600 dark:text-gray-300">
            <li>Telefonnummer: 0174 123987</li>
            <li className="mt-1">Email: service@greenwheels.de</li>

            <li>
              Adresse: Friedrichsplatz <br /> 68165 Mannheim
            </li>
          </ul>
        </div>
      </div>

      <div className="h-full  mb-12 flex items-center   ">
        <Map />
      </div>
    </div>
  );
}
