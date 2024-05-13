import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function AuthorProfile() {
  const { authorId } = useParams();
  const [author, setAuthor] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuthorProfile = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/accounts/profile/${authorId}/`);
        setAuthor(response.data);
      } catch (error) {
        setError('Failed to fetch author profile');
        console.error(error);
      }
    };

    fetchAuthorProfile();
  }, [authorId]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!author) {
    return <div>Loading...</div>;
  }

  return (
    <div>
        <p>Name: {author.name}</p>
        <p>Email: {author.email}</p>
        <p>Institution: {author.institution}</p>
        <p>Position: {author.position}</p>
        <p>Education: {author.education}</p>
        <p>Elibrary URL: {author.elibrary_url}</p>
        <p>Статьи - {author.total_publications || '0'}</p>
        <p>Стати VAC - {author.vak_publications || '0'}</p>
        <p>Статьи РИНЦ - {author.rinc_publications || '0'}</p>
        {/* Add other author data if needed */}
    </div>
  );
}

export default AuthorProfile;
