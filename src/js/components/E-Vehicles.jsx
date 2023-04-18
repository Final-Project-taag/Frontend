import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import LogoutIcon from './LogoutIcon'
import Card from './E-VehicleDetails';



function EVehicles() {
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    const [typeFilter, setTypeFilter] = useState('');
    const [minPriceFilter, setMinPriceFilter] = useState('');
    const [maxPriceFilter, setMaxPriceFilter] = useState('');
    const [minDriveRangeFilter, setMinDriveRangeFilter] = useState('');
    const [maxDriveRangeFilter, setMaxDriveRangeFilter] = useState('');


    function handleVehicleSelection() {
        navigate("/booking");
    }
    async function fetchVehicles() {
        try {
            const queryParams = new URLSearchParams();

            if (typeFilter) {
                queryParams.append('type', typeFilter);
            }
            if (minPriceFilter) {
                queryParams.append('minPrice', minPriceFilter);
            }
            if (maxPriceFilter) {
                queryParams.append('maxPrice', maxPriceFilter);
            }
            if (minDriveRangeFilter) {
                queryParams.append('minDriveRange', minDriveRangeFilter);
            }
            if (maxDriveRangeFilter) {
                queryParams.append('maxDriveRange', maxDriveRangeFilter);
            }

            const response = await axios.get('http://localhost:8082/vehicles?' + queryParams.toString());
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

            <div className="filter-container col-span-3 flex flex-wrap justify-around items-center bg-gray-100 p-4 rounded-md mb-4">

                <label htmlFor="typeFilter" className="font-bold">Type:</label>
                <select id="typeFilter" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="bg-white p-2 rounded-md">
                    <option value="">All</option>
                    <option value="scooter">Scooter</option>
                    <option value="bike">Bike</option>
                    <option value="car">Car</option>
                </select>

                <label htmlFor="minPriceFilter" className="font-bold">Min Price:</label>
                <input id="minPriceFilter" type="number" value={minPriceFilter} onChange={(e) => setMinPriceFilter(e.target.value)} className="bg-white p-2 rounded-md" />

                <label htmlFor="maxPriceFilter" className="font-bold">Max Price:</label>
                <input id="maxPriceFilter" type="number" value={maxPriceFilter} onChange={(e) => setMaxPriceFilter(e.target.value)} className="bg-white p-2 rounded-md" />

                <label htmlFor="minDriveRangeFilter" className="font-bold">Min Drive Range:</label>
                <input id="minDriveRangeFilter" type="number" value={minDriveRangeFilter} onChange={(e) => setMinDriveRangeFilter(e.target.value)} className="bg-white p-2 rounded-md" />

                <label htmlFor="maxDriveRangeFilter" className="font-bold">Max Drive Range:</label>
                <input id="maxDriveRangeFilter" type="number" value={maxDriveRangeFilter} onChange={(e) => setMaxDriveRangeFilter(e.target.value)} className="bg-white p-2 rounded-md" />

                <button onClick={fetchVehicles} className="bg-blue-500 text-white px-4 py-2 rounded-md font-bold">Apply Filters</button>
            </div>

            <LogoutIcon />
            {cars.map((car) => (
                <div key={car._id} className="col-span-1" onClick={() => handleVehicleSelection(car)}>
                    <Card
                        imageUrls={car.imageUrls}
                        name={car.name}
                        type={car.type}
                        driveRange={car.driveRange}
                        weight={car.weight}
                        price={car.price}
                        chargingTime={car.chargingTime}
                        vehicleId={car._id}
                    />
                </div>
            ))}
        </div>

    );
}

export default EVehicles;