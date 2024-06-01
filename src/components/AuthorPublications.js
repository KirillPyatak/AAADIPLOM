import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import SaveButton from "./SaveButton";

function AuthorPublications({ authorId, onSave, onUnsave }) {
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublicationsByAuthor = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/PublicationViewSet/?authors_id=${authorId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setPublications(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch user profile');
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

  const handleSave = async (publicationId) => {
    try {
      await onSave(publicationId);
      setPublications(prevPublications =>
        prevPublications.map(pub =>
          pub.id === publicationId ? { ...pub, is_saved: true } : pub
        )
      );
    } catch (error) {
      console.error('Failed to save publication:', error);
    }
  };

  const handleUnsave = async (publicationId) => {
    try {
      await onUnsave(publicationId);
      setPublications(prevPublications =>
        prevPublications.map(pub =>
          pub.id === publicationId ? { ...pub, is_saved: false } : pub
        )
      );
    } catch (error) {
      console.error('Failed to unsave publication:', error);
    }
  };

  return (
    <div>
      <table className="PublicationTable">
        <thead>
          <tr>
            <th>No.</th>
            <th>Публикация</th>
            <th>Статус</th>
            <th>Citations</th>
          </tr>
        </thead>
        <tbody>
          {publications.map((publication, index) => (
            <tr key={publication.id}>
              <td>{index + 1}</td>
              <td>
                <Link to={`/publication/${publication.id}`} className="PublicationTitle">{publication.title}</Link>
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
                      <Link to={`/journal/${publication.journal.id}`}>{publication.journal.name}</Link>
                    </React.Fragment>
                  ) : null}
                </p>
                <p>{publication.content}</p>
                <p>Types: {publication.types ? publication.types.map(type => type.name).join(', ') : ''}</p>
              </td>
              <td>
                <span className={`VerifiedStatus ${publication.is_verified ? 'Yes' : 'No'}`}>
                  {publication.is_verified ? 'Подтвержден' : 'Не подтвержден'}
                </span>
                {publication.vac && (
                  <p>
                    <span className={`VerifiedStatus Yes`}>Вак</span>
                  </p>
                )}
                {publication.rinc && (
                  <p>
                    <span className={`VerifiedStatus Yes`}>Ринц</span>
                  </p>
                )}
              </td>
              <td className="save-button-container">
                {publication.citation_count}
                <SaveButton
                  isSaved={publication.is_saved}
                  onSave={() => handleSave(publication.id)}
                  onUnsave={() => handleUnsave(publication.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AuthorPublications;
