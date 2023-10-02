document.addEventListener("DOMContentLoaded", function() {
    
    const container = document.getElementById("container");
    const predefinedPoints = [{ x: 100, y: 100 }, { x: 200, y: 200 }, { x: 300, y: 300 }];
    let markedLocations = [];
    
    
    container&&container.addEventListener("click", function(event) {
        // Remove previously marked locations
        markedLocations.forEach(location => {
            location.remove();
        });
        markedLocations = [];
    
        // Create and append the location icon
        const locationIcon = document.createElement("div");
        locationIcon.className = "location-icon";
        locationIcon.style.left = (event.clientX ) + "px";
        locationIcon.style.top = (event.clientY) + "px";
        container.appendChild(locationIcon);
        markedLocations.push(locationIcon);
    
        // Calculate distances to predefined points
        let shortestDistance = null;
        let closestPoint = null;
    
        predefinedPoints.forEach((point) => {
            const distance = Math.sqrt(Math.pow(event.clientX - point.x, 2) + Math.pow(event.clientY - point.y, 2));
            if (shortestDistance === null || distance < shortestDistance) {
                shortestDistance = distance;
                closestPoint = point;
            }
        });
    
        console(`Position: (${event.clientX}, ${event.clientY})\nShortest Distance to Predefined Point: (${closestPoint.x}, ${closestPoint.y}) is ${shortestDistance}`);
    });
    });
    const targetLatitude = 13.126108; // Example latitude
            const targetLongitude = 79.643980; // Example longitude
    
            // Function to calculate the distance between two points using Haversine formula
            function calculateDistance(lat1, lon1, lat2, lon2) {
                const R = 6371; // Radius of the Earth in km
                const dLat = (lat2 - lat1) * (Math.PI / 180);
                const dLon = (lon2 - lon1) * (Math.PI / 180);
                const a =
                    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                    Math.cos(lat1 * (Math.PI / 180)) *
                    Math.cos(lat2 * (Math.PI / 180)) *
                    Math.sin(dLon / 2) *
                    Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                const distance = R * c;
                return distance;
            }
    
            // Function to update the page with the current location and distance
            function updateLocation(position) {

                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
    
                const distance = calculateDistance(
                    latitude,
                    longitude,
                    targetLatitude,
                    targetLongitude
                );
            
            const status=document.getElementById("status");
            if(status!=null){
           status.innerHTML= "Checking your location...";
                
                document.getElementById("distance").innerHTML ="Distance to target: " + distance.toFixed(2) + " km";
    
                if (distance <= 0.1) { // Check if the distance is less than or equal to 1 meter
                    document.getElementById("status").innerHTML = "You've reached the place!";
                    document.getElementById("map").style.display = "none";
                    document.getElementById("rmap").style.display = "block"; 
                    document.getElementById("info").style.display = "none"; 
                } else {
                    document.getElementById("status").innerHTML =
                        "You're not there yet. Keep going!";
                        document.getElementById("rmap").style.display = "none";
                        document.getElementById("map").style.display = "block"; 
                }
            }
    
            // Function to handle location errors
            
            function locationError(error) {
                document.getElementById("status").innerHTML = "Error getting your location: " + error.message;
            }
    
            // Request location updates every 1 minute
            setInterval(() => {
                navigator.geolocation.getCurrentPosition(updateLocation, locationError);
                }, 5000);}