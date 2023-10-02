import React, { useState, useEffect } from 'react';

const Payment = () => {
  let selectedSlots = [];

  useEffect(() => {
    // Load Razorpay script dynamically
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Razorpay script loaded, you can now define functions that use Razorpay
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  updateParkingStatus()

  // Move bookSelectedSlots outside of the script.onload callback
  function bookSelectedSlots() {
    if (selectedSlots.length === 0) {
      alert('Please select at least one parking slot before booking.');
      return;
    }

    const totalAmount = selectedSlots.length * 1000;

    const options = {
      key: 'rzp_test_Y20ryZhwfyvGbq',
      amount: totalAmount,
      name: 'Slot Booking',
      description: 'Slot Reservation',
      image: 'your_logo.png',
      handler: function (response) {
        const userDetails = {
          user: '643a867d10dbc411dfc90d3f',
          name: 'thiru',
          slotNos: selectedSlots.map((slot) => slot.replace('slot-', '')),
          quantity: selectedSlots.length,
          id: response.razorpay_payment_id,
          status: 'success',
          itemsPrice: 10.0,
          totalPrice: selectedSlots.length * 10.0,
        };

        saveUserDetails(userDetails);
        createOrder(userDetails);

        selectedSlots = [];
        alert('Payment Successful! User details saved.');
      },
      prefill: {
        name: ' thiru',
        email: 'thiru@gmail.com',
      },
      notes: {
        slots: selectedSlots.map((slot) => document.getElementById(slot).textContent).join(', '),
      },
      theme: {
        color: '#3498db',
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  }

  function createParkingSlot(slotNumber) {
    const parkingSpace = document.createElement('div');
    parkingSpace.classList.add('parking-space');
    parkingSpace.id = `slot-${slotNumber}`;
    parkingSpace.textContent = `Slot ${slotNumber}`;

    parkingSpace.style.backgroundColor = 'white';

    parkingSpace.addEventListener('click', () => {
      parkingSpace.style.backgroundColor =
        parkingSpace.style.backgroundColor === 'lightgreen' ? 'white' : 'lightgreen';

      if (selectedSlots.includes(parkingSpace.id)) {
        selectedSlots = selectedSlots.filter((slot) => slot !== parkingSpace.id);
      } else {
        selectedSlots.push(parkingSpace.id);
      }
    });

    return parkingSpace;
  }

  function updateParkingStatus() {
    // Replace this with your API endpoint for updating parking status
    fetch('slot.json')
      .then((response) => response.json())
      .then((data) => {
        document.getElementById('parking-container-1').innerHTML = '';
        document.getElementById('parking-container-2').innerHTML = '';
        document.getElementById('parking-container-3').innerHTML = '';

        const bc1 = createParkingSlot('b1');
        document.getElementById('parking-container-2').appendChild(bc1);

        const bc2 = createParkingSlot('b2');
        document.getElementById('parking-container-3').appendChild(bc2);

        data.forEach((slot) => {
          const parkingContainer =
            slot.slot <= 24
              ? document.getElementById('parking-container-1')
              : slot.slot <= 46
              ? document.getElementById('parking-container-2')
              : document.getElementById('parking-container-3');

          const parkingSpace = createParkingSlot(slot.slot);
          parkingContainer.appendChild(parkingSpace);
        });
      });
  }

  function saveUserDetails(userDetails) {
    console.log('User Details:', userDetails);
  }

  async function createOrder(order) {
    // Replace this with your API endpoint for creating an order
    const url = '/api/v1/order/new';

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(order),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Response:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  return (
    <>
      <div className="container" id="container">
        <div className="parking-container" id="parking-container-1"></div>
        <div className="parking-container" id="parking-container-2"></div>
        <div className="parking-container" id="parking-container-3"></div>
      </div>
      <button id="book-button" onClick={bookSelectedSlots}>
        Book Now
      </button>
    </>
  );
};

export default Payment;
