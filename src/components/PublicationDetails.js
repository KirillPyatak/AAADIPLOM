import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import '../style/PublicationDetails.css'; // Импорт CSS файла

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
    return <div className="error">Error: {error}</div>;
  }

  if (!publication) {
    return <div className="loading">Loading...</div>;
  }

  // Извлечение DOI id из URL
  const doiId = publication.url ? publication.url.match(/id=(\d+)/)[1] : null;

  return (
    <div className="publication-details">
      <div className="row">
        <div className="col-md-7">
          <div className="box box-primary">
            <div className="box-body">
              <h3 className="entity-view-title">
                {publication.url ? (
                  <a href={publication.url} target="_blank" rel="noopener noreferrer">
                    {publication.title}
                  </a>
                ) : (
                  publication.title
                )}
                <p><span className="entity-type-label">{publication.types[0].name}</span></p>
              </h3>

              <table className="table description-table">
                <tbody>
                  <tr>
                    <th>Журнал</th>
                    <td>
                      {publication.journal ? (
                        <>
                          {publication.journal.name}
                          <br />
                          <i>ISSN:</i> {publication.journal.issn}
                        </>
                      ) : null}
                    </td>
                  </tr>
                  <tr>
                    <th>Вых. Данные</th>
                    <td>
                      <span className="article-output-data">
                        <i>Год:</i> {new Date(publication.created_at).getFullYear()},
                      </span>
                      {publication.pages && (
                        <span className="article-output-data">
                          <i>Страниц:</i> {publication.pages}
                        </span>
                      )}
                      {publication.url && (
                        <span className="article-output-data">
                          <i>DOI:</i>{' '}
                          <a href={publication.url} target="_blank" rel="noopener noreferrer">
                            {doiId}
                          </a>
                        </span>
                      )}
                    </td>
                  </tr>
                  <tr>
                    <th>Ключевые слова</th>
                    <td>{publication.keywords.join(', ')}</td>
                  </tr>
                  <tr>
                    <th>Авторы</th>
                    <td>
                      {publication.authors.map((author, index) => (
                        <React.Fragment key={author.id}>
                          {index > 0 && ', '}
                          <Link to={`/author/${author.id}`}>{author.name}</Link>
                        </React.Fragment>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>

              <div className="pub-info">
                <span className="header">Аннотация:</span>
                <div dangerouslySetInnerHTML={{ __html: publication.content }} />
              </div>

              {publication.files.length > 0 && (
                <div className="pub-info">
                  <span className="header">Файл:</span>
                  <ul>
                    {publication.files.map((file, index) => (
                      <li key={index}>
                        <a href={file.url} target="_blank" rel="noopener noreferrer">
                          {file.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-5">
          <div className="box box-primary">
            <div className="box-body">
              <h5>Библиографическая ссылка:</h5>
              <p>
                {publication.authors.map((author, index) => (
                  <React.Fragment key={author.id}>
                    {index > 0 && ', '}
                    <Link to={`/author/${author.id}`}>{author.name}</Link>
                  </React.Fragment>
                ))}
                <p>{publication.title}</p>
                <span className="entity-type-label"></span>
                <p>Идентификаторы БД:</p>
                <p>
                  <i>РИНЦ:</i>{' '}
                  <a href={publication.url} target="_blank" rel="noopener noreferrer">
                    {doiId}
                  </a>
                </p>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicationDetails;
