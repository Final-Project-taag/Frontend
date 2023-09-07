                    E-VehiclesDetails.jsx


 handleReservation: Diese Funktion wird aufgerufen, wenn der Benutzer auf den "Reservieren"-Knopf klickt. Sie überprüft, ob der Benutzer angemeldet ist und ob Fahrzeuge zur Verfügung stehen. Wenn alle Bedingungen erfüllt sind, wird eine Reservierungsanfrage an den Server gesendet. Bei erfolgreicher Reservierung wird der Status des Fahrzeugs auf "Reserviert" gesetzt und ein Timer für die Dauer der Reservierung gestartet.

 handleShowDetails: Diese Funktion wird aufgerufen, wenn der Benutzer auf "Reservierung Fortsetzen" klickt. Sie ändert den showDetails-Zustand auf true, um das Detailfeld und die Eingabefelder für die Startzeit und die Dauer der Buchung anzuzeigen.

calculateStartDate: Diese Funktion berechnet das Startdatum der Buchung basierend auf der gewählten Startzeit und gibt ein entsprechendes Date-Objekt zurück.

handleStartDateChange: Diese Funktion aktualisiert den startDate-Zustand, wenn der Benutzer eine Startzeit für die Buchung auswählt.

 handleDurationChange: Diese Funktion aktualisiert den endDate-Zustand, wenn der Benutzer die Dauer der Buchung auswählt.

 calculateTotalPrice: Diese Funktion berechnet den Gesamtpreis für die Buchung basierend auf dem Startdatum, dem Enddatum und dem Preis des Fahrzeugs. Der berechnete Preis wird zurückgegeben.

Die übrigen Funktionen und Codeabschnitte in der Komponente sind für das Rendering der Benutzeroberfläche, die Verwaltung von Zuständen und die Anzeige von Fahrzeuginformationen verantwortlich.


                    EVehicles.jsx

Die Hauptkomponente EVehicles rendert eine Liste von Elektrofahrzeugen basierend auf verschiedenen Filtern. Hier sind die Funktionen und ihre Zwecke:

aggregateVehicleData(vehicles, vehicleCounts) - Diese Hilfsfunktion gruppiert die Fahrzeugdaten basierend auf den Fahrzeugmodellen. Sie nimmt zwei Argumente entgegen: vehicles, eine Liste von Fahrzeugen und vehicleCounts, ein Objekt, das die Anzahl der Fahrzeuge enthält. Die Funktion erstellt ein neues Objekt namens aggregatedVehicles, das Fahrzeuge gruppiert und ihre Anzahl aggregiert. Schließlich gibt sie ein Array von gruppierten Fahrzeugen zurück.

fetchVehicles() - Diese asynchrone Funktion ruft Fahrzeugdaten vom Backend ab. Sie verwendet die Filtervariablen typeFilter, minPriceFilter, maxPriceFilter, minDriveRangeFilter und maxDriveRangeFilter, um die Fahrzeugliste basierend auf den Benutzereingaben zu filtern. Nachdem die Daten abgerufen wurden, verwendet die Funktion die aggregateVehicleData-Funktion, um die Fahrzeugdaten zu aggregieren und aktualisiert den cars-Zustand mit den aggregierten Fahrzeugdaten.

fetchVehicleCounts() - Diese asynchrone Funktion ruft die Anzahl der Fahrzeuge vom Backend ab und speichert sie im vehicleCounts-Zustand. Dieser Zustand wird später in der aggregateVehicleData-Funktion verwendet, um die Fahrzeuge basierend auf ihren Modellen zu gruppieren.

Der useEffect-Hook wird verwendet, um fetchVehicles und fetchVehicleCounts beim ersten Rendern der Komponente und bei Änderungen an den Filtervariablen aufzurufen.

Die Komponente rendert eine Liste von Card-Komponenten, die die Details jedes Fahrzeugs anzeigen. Sie stellt Informationen wie imageUrls, name, type, driveRange, price, chargingTime, weight, vehicleId und quantity bereit.

Die exportierte EVehicles-Komponente kann in anderen Teilen der Anwendung verwendet werden, um eine Liste von Elektrofahrzeugen anzuzeigen und Benutzern die Möglichkeit zu geben, die Liste basierend auf verschiedenen Filtern zu durchsuchen.