import axios from "axios"

export const fetchVehicleDetails = async id => {
  try {
    const response = await axios.get(
      `https://green-projekt.onrender.comvehicles/${id}` // Verwende die Fahrzeug-ID in der URL
    )
    return response.data
  } catch (error) {
    console.error("Error fetching vehicle details: ", error)
  }
}
