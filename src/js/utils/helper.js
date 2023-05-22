export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ("0" + (d.getMonth() + 1)).slice(-2);
    const day = ("0" + d.getDate()).slice(-2);
    const hours = ("0" + d.getHours()).slice(-2);
    const minutes = ("0" + d.getMinutes()).slice(-2);

    return ` ${year}-${month}-${day},  ${hours}:${minutes}UHR`;
  }

  export const isActiveReservation = (reservation) => {
    const endDate = new Date(reservation.endDate);
    const currentDate = new Date();
    return endDate >= currentDate;
  };

  // export  const calculateStartDate = (price) => {
  //   return new Date(Date.now() + vehicle.price * 60 * 60 * 1000);
  // };

  export  const calculateTotalPrice = (startDate, endDate, price) => {
    if (startDate && endDate) {
      const durationInHours = (endDate - startDate) / (60 * 60 * 1000);
      return durationInHours * price;
    }
    return;
  };

  // Diese Funktion gibt die Reservierungs-ID der aktiven Reservierung zurück, wenn eine vorhanden ist, andernfalls gibt sie null zurück.s
  export const getActiveReservationId = (reservations) => {
    const activeReservations = reservations.filter((reservation) => isActiveReservation(reservation));
    if (activeReservations.length > 0) {
      return activeReservations[0]._id;
    }
    return null;
  };