import axios from "axios";

export async function fetchBookings() {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      const response = await axios.get("http://localhost:8081/booking", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response)
      return response.data;
    } catch (error) {

      console.error("Error fetching reservations:", error);
      return [];
    }
  }


  export  const deleteBooking = async (bookingId) => {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      await axios.delete(`http://localhost:8081/booking/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };