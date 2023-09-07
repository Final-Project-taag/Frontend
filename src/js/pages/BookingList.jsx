import {useState, useEffect} from "react"
import axios from "axios"

export default function BookingList() {
  const [bookings, setBookings] = useState([])
  const bgColor = isActive ? "bg-green-100" : "bg-red-200"

  async function fetchBookings() {
    try {
      const token = localStorage.getItem("token") // Replace with your token management method
      const response = await axios.get("https://green-projekt.onrender.com/booking", {
        headers: {Authorization: `Bearer ${token}`},
      })
      setBookings(response.data)
    } catch (error) {
      console.error("Error fetching vehicle counts:", error)
    }
  }
  useEffect(() => {
    fetchBookings()
  }, [])

  return (
    <div className={`p-5  border-green-400 border-2 mx-2 rounded-lg shadow w-full ${bgColor}`}>
      {bookings.map((item, index) => (
        <div key={index}>
          item
          <h2 className="text-xl font-bold mb-2">{reservation.vehicle.name}</h2>
          <img src={reservation.vehicle.imageUrls} alt="" />
          <p>Reservation ID: {reservation._id}</p>
          <p>
            Reservierung von: {formatDate(reservation.startDate)} <br /> bis {formatDate(reservation.endDate)}
          </p>
          <p>Pro Stunde: {reservation.vehicle.price}€</p>
          Gesamtpreis: {totalPrice} €
        </div>
      ))}
    </div>
  )
}

/* <div key={reservation._id} className={`p-5  border-green-400 border-2 mx-2 rounded-lg shadow w-full ${bgColor}`}>

              <h2 className="text-xl font-bold mb-2">{reservation.vehicle.name}</h2>
             
              <img src={reservation.vehicle.imageUrls} alt="" />
              <p>Reservation ID: {reservation._id}</p>
              <p>Reservierung von: {formatDate(reservation.startDate)} <br /> bis  {formatDate(reservation.endDate)}</p>
              <p>Pro Stunde: {reservation.vehicle.price}€</p>

      </div >
 */
