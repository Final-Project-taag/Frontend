// import necessary packages and components
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const PaymentSuccess = () => {
  const { reservationId } = useParams(); // Beispiel: Angenommen, die reservationId wird in der URL übergeben
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Hier führen Sie einen API-Aufruf durch, um den Zahlungsstatus zu überprüfen und die Reservierungsinformationen zu aktualisieren
        const response = await axios.get(`http://localhost:8081/payment/payment-update/${reservationId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });

        if (response.data.status === 'success') {
          setSuccess(true);
        }
      } catch (error) {
        console.error("Error verifying payment:", error);
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [reservationId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (success) {
    return (
      <div>
        <h1>Zahlung erfolgreich</h1>
        <p>Vielen Dank für Ihre Zahlung. Ihre E-Fahrzeugreservierung wurde bestätigt.</p>
        {/* Weitere Aktionen, wie das Senden einer Bestätigungsnachricht an den Benutzer, können hier ausgeführt werden. */}
      </div>
    );
  } else {
    return (
      <div>
        <h1>Zahlung fehlgeschlagen</h1>
        <p>Leider ist ein Problem mit Ihrer Zahlung aufgetreten. Bitte versuchen Sie es erneut oder kontaktieren Sie uns für weitere Unterstützung.</p>
      </div>
    );
  }
};

export default PaymentSuccess;
