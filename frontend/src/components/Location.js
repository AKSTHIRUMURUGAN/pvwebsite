import React, { useState, useEffect, useRef } from 'react';

const Location = () => {
  const [markedLocations, setMarkedLocations] = useState([]);
  const targetLatitude = 13.126108; // Example latitude
  const targetLongitude = 79.643980; // Example longitude

  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const predefinedPoints = [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }];

    const handleClick = (event) => {
      // Remove previously marked locations
      setMarkedLocations([]);

      // Create and append the location icon
      const containerRect = container.getBoundingClientRect();
      const iconLeft = event.clientX - containerRect.left;
      const iconTop = event.clientY - containerRect.top;

      setMarkedLocations([{ left: iconLeft, top: iconTop }]);

      // Calculate distances to predefined points
      let shortestDistance = null;
      let closestPoint = null;

      predefinedPoints.forEach((point) => {
        const distance = Math.sqrt(Math.pow(iconLeft - point.x, 2) + Math.pow(iconTop - point.y, 2));
        if (shortestDistance === null || distance < shortestDistance) {
          shortestDistance = distance;
          closestPoint = point;
        }
      });

      console.log(`Position: (${iconLeft}, ${iconTop})\nShortest Distance to Predefined Point: (${closestPoint.x}, ${closestPoint.y}) is ${shortestDistance}`);
    };

    container && container.addEventListener("click", handleClick);

    return () => {
      // Clean up event listener on component unmount
      container && container.removeEventListener("click", handleClick);
    };
  }, []);

  useEffect(() => {
    const updateLocation = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const distance = calculateDistance(
        latitude,
        longitude,
        targetLatitude,
        targetLongitude
      );

      const status = document.getElementById("status");
      if (status != null) {
        status.innerHTML = "Checking your location...";

        document.getElementById("distance").innerHTML = "Distance to target: " + distance.toFixed(2) + " km";

        if (distance <= 0.1) {
          document.getElementById("status").innerHTML = "You've reached the place!";
          document.getElementById("map").style.display = "none";
          document.getElementById("rmap").style.display = "block";
          document.getElementById("info").style.display = "none";
        } else {
          document.getElementById("status").innerHTML = "You're not there yet. Keep going!";
          document.getElementById("rmap").style.display = "none";
          document.getElementById("map").style.display = "block";
        }
      }
    };

    const locationError = (error) => {
      document.getElementById("status").innerHTML = "Error getting your location: " + error.message;
    };

    // Request location updates every 1 minute
    const intervalId = setInterval(() => {
      navigator.geolocation.getCurrentPosition(updateLocation, locationError);
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  }, []);

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  return (
    <div>
      <h1>Location Checker</h1>
      <p id="status">Checking your location...</p>
      <div id="rmap">
        <div id="container" className="container" ref={containerRef}>
          <div className="parking-container" id="parking-container-1"></div>
          <div className="parking-container" id="parking-container-2"></div>
          <div className="parking-container" id="parking-container-3"></div>
          {/* Use locationIconPosition.left and locationIconPosition.top to position the location icon */}
          {markedLocations.map((location, index) => (
            <div
              key={index}
              className="location-icon"
              style={{ left: location.left + "px", top: location.top + "px" }}
            ></div>
          ))}
        </div>
      </div>
      <div id="map">
        <h1>Real Time Google Location </h1>
        <div id="mapContainer">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3885.574415712126!2d79.64139217392662!3d13.12612551147396!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52bbd3c7d89af5%3A0xb762b84561392539!2sA.K.S.THIRUMURUGAN!5e0!3m2!1sen!2sin!4v1695562296351!5m2!1sen!2sin"
            width="600"
            height="450"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p id="distance"></p>
      </div>
    </div>
  );
};

export default Location;
