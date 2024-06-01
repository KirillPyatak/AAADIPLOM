// PublicationListPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PublicationList from '../components/PublicationList';
import FilterPanel from '../components/FilterPanel';
import '../style/PublicationListPage.css';

function PublicationListPage() {
  const [filterData, setFilterData] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [publications, setPublications] = useState([]);
  const [savedPublications, setSavedPublications] = useState([]);
  const isAuthenticated = true; // Предположим, что пользователь аутентифицирован

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

  const savePublication = async (publicationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        window.location.href = '/login'; // Перенаправляем на страницу входа, если пользователь не аутентифицирован
        return;
      }
      // Предполагаем, что запрос к серверу для сохранения публикации возвращает успешный результат
      // и что сохраненные публикации обновляются на сервере соответствующим образом
      setSavedPublications([...savedPublications, publicationId]);
    } catch (error) {
      console.error('Не удалось сохранить публикацию:', error);
    }
  };

  const unsavePublication = async (publicationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        window.location.href = '/login'; // Перенаправляем на страницу входа, если пользователь не аутентифицирован
        return;
      }
      // Предполагаем, что запрос к серверу для удаления публикации из сохраненных возвращает успешный результат
      // и что сохраненные публикации обновляются на сервере соответствующим образом
      setSavedPublications(savedPublications.filter(id => id !== publicationId));
    } catch (error) {
      console.error('Не удалось удалить публикацию из сохраненных:', error);
    }
  };

  const handleFilter = (data) => {
    setFilterData(data);
  };

  return (
    <div className="publication-list-page">
      <div className="filter-panel-container">
        <button className="filter-toggle" onClick={() => setShowFilterPanel(!showFilterPanel)}>
          Фильтры
        </button>
        {showFilterPanel && <FilterPanel onFilter={handleFilter} />}
      </div>
      <PublicationList
        publications={publications}
        isAuthenticated={isAuthenticated}
        savedPublications={savedPublications}
        onSave={savePublication}
        onUnsave={unsavePublication}
      />
    </div>
  );
}

export default PublicationListPage;
