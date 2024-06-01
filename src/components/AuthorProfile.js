import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../style/AuthorProfile.css';

function AuthorProfile({ authorId }) {
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
    <div className="author_info">
      <p>Name: {author.name}</p>
      <p>
        Institution: {author.institution && author.institution.url ? (
          <a href={author.institution.url} target="_blank" rel="noopener noreferrer">
            {author.institution.institution_name}
          </a>
        ) : (
          'No Institution'
        )}
      </p>
      <p>Position: {author.position_name}</p>
      <p>Education: {author.education}</p>
    </div>
  );
}

function AuthorLink({ authorId }) {
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
    <div className="link">
      <h4>Внешние ссылки</h4>
      <p>Email: {author.email}</p>
      <p>Elibrary URL: {author.elibrary_url}</p>
    </div>
  );
}

function AuthorActivity({ authorId }) {
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
    <div className="activity">
      <h3>Научная деятельность</h3>
      <a>Публикации: {author.total_publications || '0'} </a>
      <a>VAC: {author.vak_publications || '0'} </a>
      <a>RINC: {author.rinc_publications || '0'} </a>
    </div>
  );
}

export { AuthorProfile, AuthorLink, AuthorActivity };
