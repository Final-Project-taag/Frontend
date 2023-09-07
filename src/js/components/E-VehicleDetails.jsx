import React, {useState, useEffect} from "react"
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios"

function Card({imageUrls, name, type, driveRange, price, chargingTime, vehicleId, quantity}) {
  const [vehicle, setVehicle] = useState(null)

  useEffect(() => {
    async function fetchVehicle() {
      try {
        const response = await axios.get(`https://green-wheels-backend.onrender.com/vehicles/${vehicleId}`) // Ändern Sie hier die URL, um die Fahrzeugdetails abzurufen
        if (response.status === 200) {
          setVehicle(response.data)
        }
      } catch (error) {
        console.error("Error fetching vehicle:", error.response ? error.response.data : error)
      }
    }

    fetchVehicle()
  }, [vehicleId])

  return (
    <div className="flex  justify-center items-center m-0 ">
      <div className="  p-2  rounded-lg  border  border-green-500 dark:border-green-700 text-center shadow-md shadow-gray-600  dark:shadow-sm bg-slate-100 dark:bg-slate-800 scale-95 md:hover:scale-100 transform transition-all duration-300">
        <a href="#!">
          <div className="flex py-2 dark:text-white items-center justify-between text-base font-light">
            <p className="text-center">{name}</p>
            <p className="text-center">{price} €/Stunde</p>
          </div>
          <img className="rounded-sm  border-gray-500 border  object-fill w-screen md:w-[400px] md:h-64 h-64" src={imageUrls} alt="" />
        </a>
      </div>
    </div>
  )
}
export default Card
