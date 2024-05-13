import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

function AuthorPublications({ authorId }) {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicationsByAuthor = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/PublicationViewSet/?authors=${authorId}`);
        setPublications(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch publications by author');
        setLoading(false);
        console.error(error);
      }
    };

    fetchPublicationsByAuthor();
  }, [authorId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h3>Publications by this author:</h3>
      <ul>
        {publications.map(publication => (
          <Link to={`/publication/${publication.id}`} className="PublicationTitle">{publication.title}</Link>
        ))}
      </ul>
    </div>
  );
}

export default  AuthorPublications;
