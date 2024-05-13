import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Импорт Link из react-router-dom
import '../style/FilterPanel.css';

function PublicationList({ filterData, searchQuery }) {
  const [publications, setPublications] = useState([]);

  useEffect(() => {
    let url = 'http://127.0.0.1:8000/api/v1/PublicationViewSet/';

    // Формируем параметры запроса на основе filterData
    const params = new URLSearchParams(filterData).toString();
    if (params) {
      url += `?${params}`;
    }

    // Добавляем параметр поиска, если он не пустой
    if (searchQuery && params) {
      url += `&search=${searchQuery}`;
    } else if (searchQuery) {
      url += `?search=${searchQuery}`;
    }

    axios.get(url)
      .then(response => {
        setPublications(response.data);
      })
      .catch(error => console.error(error));
  }, [filterData, searchQuery]);

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
              {/* Используем Link вместо тега <a> */}
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

              <p>{publication.content}</p>
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
            <td>{publication.citation_count}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default PublicationList;
