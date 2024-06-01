// PublicationList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SaveButton from './SaveButton';

function PublicationList({ filterData, onSave, onUnsave }) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://127.0.0.1:8000/api/v1/PublicationViewSet/';

        const params = new URLSearchParams(filterData).toString();
        if (params) {
          url += `?${params}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        setPublications(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [filterData]);

  const handleSave = async (publicationId) => {
    try {
      await onSave(publicationId);
      // Отметить публикацию как сохраненную в локальном состоянии
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
      // Отметить публикацию как не сохраненную в локальном состоянии
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
            <td className="PublicationCell">
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
              <p>Types: {publication.types ? publication.types.map(type => type.name).join(', ') : ''}</p>
            </td>
            <td>
              <span className={`VerifiedStatus ${publication.is_verified ? 'Yes' : 'No'}`}>
                {publication.is_verified ? 'Подтвержден' : 'Не подтвержден'}
              </span>
              {publication.vac && (
                <p>
                  <span className={`VerifiedStatus Yes`}>
                    Вак
                  </span>
                </p>
              )}
              {publication.rinc && (
                <p>
                  <span className={`VerifiedStatus Yes`}>
                    Ринц
                  </span>
                </p>
              )}
            </td>
            <td className="save-button-container">
              {publication.citation_count}
              <SaveButton
                isSaved={publication.is_saved} // Pass is_saved status of the publication
                onSave={() => handleSave(publication.id)}
                onUnsave={() => handleUnsave(publication.id)}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PublicationList;
