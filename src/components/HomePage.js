import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomePage.css'; // Import CSS file

function HomePage() {
  const [driverData, setDriverData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://api.openf1.org/v1/drivers?driver_number=1&session_key=9158')
      .then(response => {
        console.log('API Response:', response.data); // Log the entire response
        setDriverData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  // Ensure correct access to data properties
  const driver = Array.isArray(driverData) ? driverData[0] : driverData;
  const imageSource = driver?.headshot_url?.replace(/^"|"$/g, '');
  const fullName = driver?.full_name || 'Name not available';
  const teamName = driver?.team_name || 'Team not available';
  const teamColor = driver?.team_colour ? `#${driver.team_colour}` : '#ffffff'; // Ensure color format

  console.log('Driver Data:', driver);
  console.log('Image Source:', imageSource);
  console.log('Full Name:', fullName);
  console.log('Team Name:', teamName);
  console.log('Team Color:', teamColor);

  return (
    <div className="container">
      <div className="card" style={{ backgroundColor: teamColor }}>
        {imageSource ? (
          <img className="card-image" src={imageSource} alt="Driver Headshot" />
        ) : (
          <p>No image available</p>
        )}
        <div className="card-content">
          <h2>{fullName}</h2>
          <p><strong>Team:</strong> {teamName}</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
