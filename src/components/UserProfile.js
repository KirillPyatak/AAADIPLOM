import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/UserProfilePage.css'; // Импортируем файл стилей

function UserProfilePage() {
  const [user, setUser] = useState(null);
  const [editedUser, setEditedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
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
        setEditedUser(response.data);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error(error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.patch('http://127.0.0.1:8000/api/accounts/profile/', editedUser, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      setError('Failed to save user profile');
      console.error(error);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  const handleCreatePublication = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      // Отправка запроса на создание публикации
    } catch (error) {
      setError('Failed to create publication');
      console.error(error);
    }
  };

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!user) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="container">
      <div className="profile-header">
        {user.photo && <img src={user.photo} alt="User Photo" />}
        <h2>{user.name} {user.familiya} {user.otchestvo}</h2>
        <div className="profile-actions">
          {isEditing ? (
            <>
              <button onClick={handleSaveProfile}>Save</button>
              <button onClick={handleCancelEdit}>Cancel</button>
            </>
          ) : (
            <button onClick={handleEditProfile}>Edit Profile</button>
          )}
          <button onClick={handleCreatePublication}>Create Publication</button>
        </div>
      </div>
      <div className="main-info">
        <p><strong>Email:</strong> {isEditing ? <input type="email" name="email" value={editedUser.email} onChange={handleInputChange} /> : user.email}</p>
        <p><strong>Институт/Факультет:</strong> {isEditing ? <input type="text" name="institution" value={editedUser.institution.institution_name} onChange={handleInputChange} /> : <a href={user.institution.url} target="_blank" rel="noopener noreferrer">{user.institution.institution_name}</a>}</p>
        <p><strong>{isEditing ? <input type="text" name="position" value={editedUser.position.position_name} onChange={handleInputChange} /> : user.position.position_name}</strong> </p>
        <p><strong>Образование:</strong> {isEditing ? <input type="text" name="education" value={editedUser.education} onChange={handleInputChange} /> : user.education}</p>
        <p><strong>Elibrary URL:</strong> {isEditing ? <input type="text" name="elibrary_url" value={editedUser.elibrary_url} onChange={handleInputChange} /> : user.elibrary_url}</p>
      </div>

      <div className="activity">
        <h3>Научная активность</h3>
        <p>Публикации: {user.total_publications || '0'} </p>
        <p>VAC: {user.vak_publications || '0'} </p>
        <p>RINC: {user.rinc_publications || '0'} </p>
      </div>
      <div className="publications">
        <p>Публикации ({user.total_publications || '0'}) <a href="#">Подробнее</a></p>
      </div>
    </div>
  );
}

export default UserProfilePage;
