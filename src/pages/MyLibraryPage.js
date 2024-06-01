import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import SaveButton from '../components/SaveButton'; // Импортируем компонент кнопок сохранения

function MyLibraryPage() {
  const [selectedTab, setSelectedTab] = useState('saved');
  const [savedPublications, setSavedPublications] = useState([]);
  const [createdPublications, setCreatedPublications] = useState([]); // Добавляем состояние для созданных публикаций
  const [error, setError] = useState(null);
  const [authorSubscriptions, setAuthorSubscriptions] = useState([]);
  const [journalSubscriptions, setJournalSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSavedPublications = async () => {
      try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/SavedPublicationViewSet/my_saved_publications/', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setSavedPublications(response.data);
      } catch (error) {
        setError('Failed to fetch saved publications');
        console.error(error);
      }
    };

    fetchSavedPublications();
  }, []);

  const fetchCreatedPublications = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.get('http://127.0.0.1:8000/api/v1/PublicationViewSet/my_created_publications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setCreatedPublications(response.data);
    } catch (error) {
      setError('Failed to fetch created publications');
      console.error(error);
    }
  };


 const fetchAuthorSubscriptions = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/PublicationViewSet/subs_author/',{
          headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setAuthorSubscriptions(response.data);
    } catch (error) {
      setError('Failed to fetch author subscriptions');
      console.error(error);
    }
  };

  const fetchJournalSubscriptions = async () => {
    try {
        const accessToken = localStorage.getItem('accessToken');
        const response = await axios.get('http://127.0.0.1:8000/api/v1/PublicationViewSet/subs_journal/',{
          headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setJournalSubscriptions(response.data);
    } catch (error) {
      setError('Failed to fetch journal subscriptions');
      console.error(error);
    }
  };



  useEffect(() => {
          if (selectedTab === 'saved') {

          } else if (selectedTab === 'created') {
              fetchCreatedPublications();
          } else if (selectedTab === 'subs_author') {
              fetchAuthorSubscriptions();
          } else if (selectedTab === 'subs_journal') {
              fetchJournalSubscriptions();
          }

      },
      [selectedTab]);

  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  const handleUnsave = async (publicationId) => {
    try {
      // Выполняет отмену сохранения публикации
      const accessToken = localStorage.getItem('accessToken');
      await axios.delete(`http://127.0.0.1:8000/api/v1/SavedPublicationViewSet/${publicationId}/unsave_publication/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      // Обновляет состояние сохраненных публикаций
      setSavedPublications(prevPublications =>
        prevPublications.filter(pub => pub.id !== publicationId)
      );
    } catch (error) {
      console.error('Failed to unsave publication:', error);
    }
  };

  return (
    <div>
      <h2>My Library</h2>
      <div className="tab-buttons">
        <button onClick={() => handleTabChange('saved')} className={selectedTab === 'saved' ? 'active' : ''}>Мои сохраненные</button>
        <button onClick={() => handleTabChange('created')} className={selectedTab === 'created' ? 'active' : ''}>Мои созданные</button>
        <button onClick={() => handleTabChange('subs_author')} className={selectedTab === 'subs_author' ? 'active' : ''}>Подписки на авторов</button>
        <button onClick={() => handleTabChange('subs_journal')} className={selectedTab === 'subs_journal' ? 'active' : ''}>Подписки на журналы</button>
      </div>
      <div>
        {selectedTab === 'saved' && (
          <div>
            <h3>Сохраненные публикации</h3>
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
                {savedPublications.map((publication, index) => (
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
                    <td className="save-button-container">
                      {publication.citation_count}
                      <SaveButton
                        isSaved={publication.is_saved} // Передаем статус сохранения публикации
                        onUnsave={() => handleUnsave(publication.id)}/>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {selectedTab === 'created' && (
          <div>
            <h3>Созданные публикации</h3>
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
                {createdPublications.map((publication, index) => (
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
          </div>
        )}
        {selectedTab === 'subs_author' && (
          <div>
            <h3>Подписки на авторов</h3>
            <ul>
              {authorSubscriptions.map((subscription, index) => (
                <li key={index}>
                  <h4>Подписки на авторов</h4>
                  <ul>
                    {subscription.authors.map((author, index) => (
                      <li key={index}>
                        <Link to={`/author/${author.id}`}>{author.name}</Link>
                        <p>Email: {author.email}</p>
                        {/* Render other author details as needed */}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}
        {selectedTab === 'subs_journal' && (
          <div>
            <h3>Подписки на журналы</h3>
            <ul>
              {journalSubscriptions.map((subscription, index) => (
                <li key={index}>
                  <h4>Подписки на журналы</h4>
                  <ul>
                    {subscription.journals.map((journal, index) => (
                      <li key={index}>
                        <Link to={`/journal/${journal.id}`}>{journal.name}</Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
      {error && <div className="error">Error: {error}</div>}
    </div>
  );
}

export default MyLibraryPage;

