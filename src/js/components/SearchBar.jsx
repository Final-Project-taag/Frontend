import React, { useState } from 'react';

function PickupAndReturnLocation() {
    const [pickupLocation, setPickupLocation] = useState("");
    const [returnLocation, setReturnLocation] = useState("");

    const locations = [
        'Beispielstr.1',
        'Beispielstr.2',
        'Beispielstr.3',
        'Beispielstr.4',
        'Beispielstr.5',
        'Beispielstr.6',
        'Beispielstr.7',
        'Beispielstr.8',
        'Beispielstr.9',
        'Beispielstr.10'
    ];

    return (
        <div>
            <select value={pickupLocation} onChange={(e) => setPickupLocation(e.target.value)}>
                <option value="">--Abholort auswählen--</option>
                {locations.map(location => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>

            <select value={returnLocation} onChange={(e) => setReturnLocation(e.target.value)}>
                <option value="">--Rückgabeort auswählen--</option>
                {locations.map(location => (
                    <option key={location} value={location}>
                        {location}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default PickupAndReturnLocation;
