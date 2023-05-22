import React from "react";

import Map from "../features/Map";

export default function Contact() {
  return (
    <div className="flex flex-col justify-center items-center  h-full mb-10 mt-24 w-3/4">
      <div className="container  h-full flex items-center   mb-12 max-w-4xl mx-auto flex-col md:flex-row">
        <div className="max-w-[100%] md:max-w-[50%] w-full mt-16">
          <img
            src="https://investingminister.com/wp-content/uploads/2020/09/carhandshake.jpg"
            alt=""
            className="w-full h-[500px] object-cover"
          />
        </div>

        <div>
          <div>
          <h1 className="text-6xl  text-green-600">
              Green <span className="text-gray-600">Wheels</span>{" "}
            </h1>
          </div>
          <h2 className="mt-2 text-xl">Eco Fahrzeuge rental App.</h2>

          <ul className="flex flex-row mt-8">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg><li> Adresse: </li>
            <div>
              <li>Heimer Straße 74., </li>
              <li>68309 Mannheim</li>
            </div>
          </ul>

          <ul className="flex flex-row p-5 ">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" d="M16.5 12a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 10-2.636 6.364M16.5 12V8.25" />
            </svg><li>Email: </li>
            <div>
              <li> green-wheels@rental.de</li>
            </div>
          </ul>

          <ul className="flex flex-row p-5">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg><li>Telefonnummer: </li>
            <div>
            <li>+49 621 71419341</li>
            </div>
          </ul>
        </div>
      </div>

      <div className="  ">
        <Map />
      </div>
    </div>
  );
}