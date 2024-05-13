import React, { useState, useEffect } from 'react';
import axios from 'axios';

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/accounts/profile/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

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
        {user.photo && <img src={user.photo} alt="User Photo" />} {/* Отображаем изображение, если оно существует */}
        <p>Email: {user.email}</p>
        <p>Institution: {user.institution}</p>
        <p>Position: {user.position}</p>
        <p>Education: {user.education}</p>
        <p>Elibrary URL - {user.elibrary_url}</p>
        <p>Статьи - {user.total_publications || '0'}</p>
        <p>Стати VAC - {user.vak_publications || '0'}</p>
        <p>Статьи РИНЦ - {user.rinc_publications || '0'}</p>
      {/* Добавьте другие данные о пользователе при необходимости */}
    </div>
  );
}

export default UserProfilePage;
