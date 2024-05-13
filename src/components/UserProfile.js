import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userId) return; // Check if userId is defined

      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/accounts/User/${userId}/`);
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error(error); // Log the error for debugging
      }
    };

    fetchUserProfile();
  }, [userId]);

  if (!userId) {
    return <div>User ID is not defined</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>User Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Institution: {user.institution || 'N/A'}</p>
      <p>Position: {user.position || 'N/A'}</p>
      <p>Education: {user.education || 'N/A'}</p>
      <p>eLibrary URL: {user.elibrary_url || 'N/A'}</p>
      <p>Статьи - {user.total_publications || '0'}</p>
        <p>Стати VAC - {user.vak_publications || '0'}</p>
        <p>Статьи РИНЦ - {user.rinc_publications || '0'}</p>
      {/* Display other user details as needed */}
    </div>
  );
}

export default UserProfile;
