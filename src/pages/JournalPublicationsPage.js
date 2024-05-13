// JournalPublicationsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Импорт useParams для получения параметров маршрута
import PublicationList from '../components/PublicationList'; // Импорт компонента PublicationList

function JournalPublicationsPage() {
  const { journalId } = useParams(); // Получаем параметр журнала из маршрута
  const [publications, setPublications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJournalPublications = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/v1/PublicationViewSet/?journal=${journalId}`);
        setPublications(response.data);
        setLoading(false);
      } catch (error) {
        setError('Failed to fetch journal publications');
        setLoading(false);
        console.error(error);
      }
    };

    fetchJournalPublications();
  }, [journalId]); // Указываем journalId как зависимость, чтобы useEffect вызывался при изменении параметра журнала

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

return (
  <div>
    {publications.length > 0 && publications[0].journal && (
      <h2>{publications.journal.name}</h2>
    )}
    <div>
      <PublicationList publications={publications} />
    </div>
  </div>
);


}

export default JournalPublicationsPage;
