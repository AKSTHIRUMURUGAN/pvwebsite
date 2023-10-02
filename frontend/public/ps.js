function createParkingSlot(slotNumber) {
    const parkingSpace = document.createElement('div');
    parkingSpace.classList.add('parking-space', 'empty'); // Initialize as empty slot
    parkingSpace.id = `slot-${slotNumber}`;
    parkingSpace.textContent = `Slot ${slotNumber}`;
    return parkingSpace;
}

function updateParkingStatus() {
    // Perform an AJAX request to get the updated sv list
    fetch('slot.json')
        .then(response => response.json())
        .then(data => {
            // Clear the previous parking slots
            document.getElementById('parking-container-1').innerHTML = '';
            document.getElementById('parking-container-2').innerHTML = ''; 
            document.getElementById('parking-container-3').innerHTML = '';
            const bc1=createParkingSlot("b1");
            document.getElementById('parking-container-2').appendChild(bc1)
            const bc2=createParkingSlot("b2");
            document.getElementById('parking-container-3').appendChild(bc2)
            

            // Initialize variables for counting slots and available slot numbers
            let totalAvailableSlots = 0;
            let totalOccupiedSlots = 0;
            let availableSlotNumbers = [];

            // Create parking slots based on the updated sv list
            data.forEach(slot => {
                const parkingContainer =
                    slot.slot <= 24 ? document.getElementById('parking-container-1') :
                    slot.slot <= 46 ? document.getElementById('parking-container-2') :
                    document.getElementById('parking-container-3');

                const parkingSpace = createParkingSlot(slot.slot);
                parkingSpace.classList.remove('empty'); // Remove empty class if it's occupied
                parkingSpace.classList.add(slot.status); // Add status class (free or occupied)
                parkingContainer.appendChild(parkingSpace);

                // Update slot counters
                if (slot.status === 'free') {
                    totalAvailableSlots++;
                    availableSlotNumbers.push(slot.slot);
                } else {
                    totalOccupiedSlots++;
                }
            });

            // Update the displayed slot counts
            document.getElementById('total-available-slots').textContent = totalAvailableSlots;
            document.getElementById('total-occupied-slots').textContent = totalOccupiedSlots;

            // Update the available slots as comma-separated numbers
            document.getElementById('available-slots').textContent = availableSlotNumbers.join(', ');

            
        });
}

// Periodically update parking status every 5 seconds (adjust as needed)
setInterval(updateParkingStatus, 5000);