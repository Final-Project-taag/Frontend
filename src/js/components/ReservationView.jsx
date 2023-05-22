import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Modal, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';


const StyledModal = styled(Modal)({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const StyledBox = styled(Box)({
  position: 'absolute',
  width: '50%',
  backgroundColor: 'white', // set the background color to white
  border: '2px solid #000',
  boxShadow: 24,
  padding: theme => theme.spacing(2, 4, 3),
});

const GreenButton = styled(Button)({
  borderColor: 'green', // set border color to green
  color: 'green', // set text color to green
  '&:hover': {
    backgroundColor: 'rgba(0, 128, 0, 0.1)', // set background color to light green on hover
  },
});
const ReservationView = () => {

  const [reservations, setReservations] = useState([]);
  const { vehicleId } = useParams(); // Extrahiere die Fahrzeug-ID aus der URL

  const [vehicles, setVehicles] = useState([]);
  const [vehicle, setVehicle] = useState(null);
  const userId = "yourUserId"; // Ersetzen Sie dies durch die Benutzer-ID des angemeldeten Benutzers

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  const [timeLeft, setTimeLeft] = useState(null);
  const [showInputs, setShowInputs] = useState(true);
  // Timer von EfahrzeugModal nutzen---------------//
  const location = useLocation();
  const timerValue = location.state ? location.state.timerValue : null;
  const [showModal, setShowModal] = useState(false);
const [modalMessage, setModalMessage] = useState("");



  // Timer anzeigen in der Form---------------------//
  const formatTimeLeft = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    let timer;

    if (timeLeft) {
      const endTime = new Date(Date.now() + timeLeft);
      timer = setInterval(() => {
        const diff = endTime.getTime() - new Date().getTime();
        setTimeLeft(diff);
        if (diff <= 0) {
          clearInterval(timer);
          setTimeLeft(null);
        }
      }, 1000);

    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };

  }, [timerValue]);

  const handleShowDetails = () => {
    setShowDetails(true);
  };
  //-------------------------- FORMATdATE------------------------------------------------------------------------//
  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const hours = ("0" + d.getHours()).slice(-2);
    const minutes = ("0" + d.getMinutes()).slice(-2);

    return `Datum: ${year}-${month}-${day}, Uhrzeit: ${hours}:${minutes}`;
  }

  //-------------------------------------------------------------------------------------------------------------------//

  async function fetchReservations(userId) {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      const response = await axios.get("http://localhost:8081/reservations", {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching reservations:", error);
      return [];
    }
  }

  const fetchVehicleDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/vehicles/${vehicleId}` // Verwende die Fahrzeug-ID in der URL
      );
      setVehicle(response.data);
    } catch (error) {
      console.error("Error fetching vehicle details: ", error);
    }
  };

  useEffect(() => {
    fetchVehicleDetails();
  }, [vehicleId]);
  useEffect(() => {
    // Fetch reservations from the database for the given userId
    fetchReservations(userId).then((fetchedReservations) => {
      setReservations(fetchedReservations);
    });

  }, [userId]);

  const isActiveReservation = (reservation) => {
    const endDate = new Date(reservation.endDate);
    const currentDate = new Date();
    return endDate >= currentDate;
  };

  //------------------------------------Löschen-------------------------------------------------------//
  const deleteReservation = async (reservationId) => {
    try {
      const token = localStorage.getItem("token"); // Replace with your token management method
      await axios.delete(`http://localhost:8081/reservations/${reservationId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setReservations(reservations.filter((res) => res._id !== reservationId));
    } catch (error) {
      console.error("Error deleting reservation:", error);
    }
  };

  //-----------------------------------UPDATEN-------------------------------------------------/

  const updateReservation = async (reservationId, updatedReservationData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(`http://localhost:8081/reservations/${reservationId}`, updatedReservationData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error) {
      console.error("Error updating reservation:", error);
      if (error.response && error.response.status === 400) {
        setModalMessage("Es gibt bereits eine Reservierung in diesem Zeitraum. Bitte wählen Sie einen anderen Zeitraum.");
        setShowModal(true);
      }
    }
  };
  return (

    <div className="flex flex-row    pt-20 pb-20" >

      <h2>Reservation View</h2>

      <div className=" flex flex-row  rounded-lg shadow m-10">
      <div>
      {showModal ? (
        <StyledModal
          open={showModal}
          onClose={() => setShowModal(false)}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          <StyledBox>
            <Typography id="simple-modal-title" variant="h4" component="h2" color="primary">
              Warnung
            </Typography>
            <Typography id="simple-modal-description" variant="body1" color="textSecondary" gutterBottom>
              {modalMessage}
            </Typography>
            <GreenButton variant="outlined" onClick={() => setShowModal(false)}>
              Ok
            </GreenButton>
          </StyledBox>
        </StyledModal>
      ) : null}
    </div>
        {reservations.map((reservation, index) => {
          const vehicle = vehicles[index];
          const isActive = isActiveReservation(reservation);
          const bgColor = isActive ? 'bg-green-300' : 'bg-red-300';
          return (
            <div key={reservation._id} className={`p-1 w-1/3 border-green-400 border-2  rounded-lg shadow  ${bgColor}`}>

              <div className=" flex  flex-row">

                {/* Name und Id Nummer */}
                <div className=" border-2 ">
                  <h2 className="text-xl font-bold mb-2">{reservation.vehicle.name}</h2>
                  <h5>ID Nummer: {reservation.vehicle._id}</h5>
                </div>
              </div>

              <img src={reservation.vehicle.imageUrls} alt="" />
              <p>Reservation ID: {reservation._id}</p>

              <div className="flex col-span-3 p-1">
                <p>Reservierung von: {formatDate(reservation.startDate)}</p>
                <p>Reservierung bis {formatDate(reservation.endDate)}</p>
                <p>Pro Stunde: {reservation.vehicle.price}€</p>
              </div>

              {showInputs && (
                // Ihre Eingabefelder hier 
                <div className="flex pt-1 flex-row gap-1 ">
                  <div>
                    <label htmlFor="start-date" className="font-bold mb-1">
                      Buchung von:
                    </label>
                    <select
                      id="start-date"
                      className="p-2 w-52 border border-gray-600 rounded-md bg-white text-black"
                      onChange={(e) => {
                        const startDate = new Date(Date.now() + parseInt(e.target.value) * 60 * 60 * 1000);
                        setStartDate(startDate);
                      }}
                    >
                      <option value="">Wähle Startzeit</option>
                      {[...Array(10).keys()].map((i) => (
                        <option key={i} value={i + 1}>
                          In {i + 1} Stunde(n)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div >
                    <label htmlFor="duration" className=" font-bold mb-1">
                      Dauer:
                    </label>
                    <select
                      id="duration"
                      className="p-2 w-52 border border-gray-600 rounded-md bg-white text-black"
                      onChange={(e) => {
                        const endDate = new Date(startDate.getTime() + parseInt(e.target.value) * 60 * 60 * 1000);
                        setEndDate(endDate);
                        setTotalPrice(calculateTotalPrice(startDate, endDate, reservation.vehicle.price));

                      }}
                    >
                      <option value="">Wähle Dauer</option>
                      {[...Array(24).keys()].map((i) => (
                        <option key={i} value={i + 1}>
                          {i + 1} Stunde(n)
                        </option>
                      ))}
                    </select>
                  </div>   
                  
                </div>

              )
              }
              <div className="p-5 font-bold">
                Gesamtpreis: {totalPrice} €
              </div>
              <button
                      type="button"
                      className="h-10 bg-blue-400 text-white px-4 rounded-md hover:bg-blue-500 transition-colors duration-300 mb-4 block w-full"
                      onClick={() => {
                        if (!startDate || !endDate) {
                          alert("Bitte wählen Sie Startzeit und Dauer aus.");
                          return;
                        }
                        updateReservation(reservation._id, { startDate: startDate.toISOString(), endDate: endDate.toISOString(), reservedUntil: endDate.toISOString() });
                        /*                     handlePayment();
                         */
                        // Setzt 'showInputs' auf false, wodurch die Eingabefelder ausgeblendet werden
                        setShowInputs(false);
                      }}
                    >
                      Buchen
                    </button>
            </div>

          );
        })}
      </div >

    </div >
    
  );
};

export default ReservationView;