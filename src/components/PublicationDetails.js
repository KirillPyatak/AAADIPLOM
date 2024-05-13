import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

function PublicationDetails() {
  const { publicationId } = useParams();
  const [publication, setPublication] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicationDetails = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/PublicationViewSet/${publicationId}/`);
        setPublication(response.data);
      } catch (error) {
        setError('Failed to fetch publication details');
        console.error(error);
      }
    };

    fetchPublicationDetails();
  }, [publicationId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!publication) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Название: {publication.title}</h2>
       <p>
  Автор(ы): {publication.authors.map((author, index) => (
    <React.Fragment key={author.id}>
      {index > 0 && ', '}
      <Link to={`/author/${author.id}`}>{author.name}</Link>
    </React.Fragment>
  ))}
</p>



        <p>
          Журнал(ы): {publication.journal ? (
            <React.Fragment>
              {Array.isArray(publication.journal) ? (
                publication.journal.map((journal, index) => (
                  <React.Fragment key={journal.id}>
                    {index > 0 && ', '}
                    <Link to={`/journal/${journal.id}`}>{journal.name}</Link>
                  </React.Fragment>
                ))
              ) : (
                <Link to={`/journal/${publication.journal.id}`}>{publication.journal.name}</Link>
              )}
            </React.Fragment>
          ) : null}
        </p>

      <p>Аннотация: {publication.content}</p>
       <span className={`VerifiedStatus ${publication.is_verified ? 'Yes' : 'No'}`}>
                {publication.is_verified ? 'Подтвержден' : 'Не подтвержден'}
              </span>
      {publication.rinc && (
                <p>
                  <span className={`VerifiedStatus Yes`}>
                    Ринц
                  </span>
                </p>
              )}
      {publication.vac && (
                <p>
                  <span className={`VerifiedStatus Yes`}>
                    Вак
                  </span>
                </p>
              )}
      <p>{publication.keywords}</p>

      {/* Add more details as needed */}
    </div>
  );
}

export default PublicationDetails;
