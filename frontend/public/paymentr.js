// import axios from 'axios';
let selectedSlots = [];
function createParkingSlot(slotNumber) {
    const parkingSpace = document.createElement('div');
    parkingSpace.classList.add('parking-space');
    parkingSpace.id = `slot-${slotNumber}`;
    parkingSpace.textContent = `Slot ${slotNumber}`;

    // Set default color to white
    parkingSpace.style.backgroundColor = 'white';

    // Add click event listener for parking space selection
    parkingSpace.addEventListener('click', () => {
        // Toggle the background color on click
        parkingSpace.style.backgroundColor = parkingSpace.style.backgroundColor === 'lightgreen' ? 'white' : 'lightgreen';

        // Update the selected slots array
        if (selectedSlots.includes(parkingSpace.id)) {
            selectedSlots = selectedSlots.filter(slot => slot !== parkingSpace.id);
        } else {
            selectedSlots.push(parkingSpace.id);
        }
    });

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
            



            // Create parking slots based on the updated sv list
            data.forEach(slot => {
                const parkingContainer =
                    slot.slot <= 24 ? document.getElementById('parking-container-1') :
                    slot.slot <= 46 ? document.getElementById('parking-container-2') :
                    document.getElementById('parking-container-3');

                const parkingSpace = createParkingSlot(slot.slot);
   // Remove empty class if it's occupied
 // Add status class (free or occupied)
                parkingContainer.appendChild(parkingSpace);

                // Update slot counters

            });

            // Update the displayed slot counts
 

            
        });
}

// Periodically update parking
updateParkingStatus()

//796yhghfgd6r
function bookSelectedSlots() {
    // const { user } = useSelector(state => state.authState)
    if (selectedSlots.length === 0) {
        alert('Please select at least one parking slot before booking.');
        return;
    }

    const totalAmount = selectedSlots.length * 1000; // Replace 10000 with the actual price per slot

    const options = {
        key: 'rzp_test_Y20ryZhwfyvGbq',
        amount: totalAmount,
        name: 'Slot Booking',
        description: 'Slot Reservation',
        image: 'your_logo.png',
        handler: function (response) {
            const userDetails = {
                user: "643a867d10dbc411dfc90d3f",
                name:"thiru", // Replace with actual user ID
                slotNos: selectedSlots.map(slot => slot.replace('slot-', '')),
                quantity: selectedSlots.length,
                id: response.razorpay_payment_id,
                status:"success",
                itemsPrice: 10.0,
                totalPrice: selectedSlots.length* 10.0
                
            };
            saveUserDetails(userDetails)
            // Save user details after successful payment
            createOrder(userDetails)

            // Clear the selected slots array (no need to reset the background color)
            selectedSlots = [];

            // Show an alert to the user after successful payment
            alert('Payment Successful! User details saved.');
        },
        prefill: {
            name:" thiru",
            email: "thiru@gmail.com",
        },
        notes: {
            slots: selectedSlots.map(slot => document.getElementById(slot).textContent).join(', '),
        },
        theme: {
            color: '#3498db',
        },
    };

    const rzp = new Razorpay(options);
    rzp.open();
}

// Button click event to book selected slots
document.getElementById('book-button').addEventListener('click', bookSelectedSlots);

// Function to save user details (simplified to console log)
function saveUserDetails(userDetails) {
    console.log('User Details:', userDetails);
}
 async function createOrder (order){

    //    const {data}=await axios.post('/api/v1/order/new',order) 
    // console.log(data)
    const url = '/api/v1/order/new';


fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
        // Add any other headers as needed
    },
    body: JSON.stringify(order)
})
    .then(response => response.json())
    .then(data => {
        console.log('Response:', data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

   }



