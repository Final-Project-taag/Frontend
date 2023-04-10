import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Card from './E-VehicleDetails';
/* 
function Card({ imageUrls, name, type, driveRange, weight, price, chargingTime }) {


    return (
        <div className="flex justify-center">
            <div className="block max-w-sm rounded-lg bg-white shadow-lg dark:bg-neutral-700">
                <a href="#!">
                    <img className="rounded-t-lg" src={imageUrls} alt="" />
                </a>
                <div className="p-6">
                    <h5 className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {name}
                    </h5>
                    <p className="mb-4 text-base text-neutral-600 dark:text-neutral-200">
                        Type: {type} <br />
                        Drive Range: {driveRange} km <br />
                        Weight: {weight} kg <br />
                        Price: €{price} <br />
                        Charging Time: {chargingTime} hours
                    </p>
                    <button
                        type="button"
                        className="inline-block rounded bg-primary px-6 pt-2.5 pb-2 text-xs font-medium uppercase leading-normal text-black shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)]"
                        data-te-ripple-init
                        data-te-ripple-color="light"
                    >
                        Details
                    </button>
                </div>
            </div>
        </div>
    );
} */

function EVehicles() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);


    function handleVehicleSelection() {
         navigate("/booking");
      }
    async function fetchVehicles() {
        try {
            const response = await axios.get('http://localhost:8081/vehicles');
            setCars(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    }
    useEffect(() => {
        fetchVehicles();
    }, []);


    return (
        <div className="grid grid-cols-3 gap-7 p-8">
            {cars.map((car) => (
                <div key={car.id} className="col-span-1" onClick={() => handleVehicleSelection(car)}>
                    <Card 
                    imageUrls={car.imageUrls} 
                    name={car.name}
                    type={car.type}
                    driveRange={car.driveRange}
                    weight={car.weight}
                    price={car.price}
                    chargingTime={car.chargingTime} 
                    />
                </div>
            ))}
        </div>
    );
}

export default EVehicles;