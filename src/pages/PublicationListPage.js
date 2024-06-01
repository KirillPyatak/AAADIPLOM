// PublicationListPage.js
import React, { useState } from 'react';
import axios from 'axios';
import PublicationList from '../components/PublicationList';
import FilterPanel from '../components/FilterPanel';
import SaveButton from '../components/SaveButton'; // Импортируем кнопку сохранения
import '../style/PublicationListPage.css';

function PublicationListPage() {
  const [filterData, setFilterData] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [savedPublications, setSavedPublications] = useState([]);

  const handleFilter = (data) => {
    setFilterData(data);
  };

  const savePublication = async (publicationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        window.location.href = '/login'; // Замените на ваш путь к странице входа
        return;
      }
      await axios.post(`http://127.0.0.1:8000/api/v1/SavedPublicationViewSet/${publicationId}/save_publication/`, {}, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

    } catch (error) {
      console.error('Failed to save publication:', error);
    }
  };

  const unsavePublication = async (publicationId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (!accessToken) {
        // Если пользователь не аутентифицирован, перенаправляем на страницу входа
        window.location.href = '/login'; // Замените на ваш путь к странице входа
        return;
      }
      await axios.delete(`http://127.0.0.1:8000/api/v1/SavedPublicationViewSet/${publicationId}/unsave_publication/`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    } catch (error) {
      console.error('Failed to unsave publication:', error);
    }
  };

  return (
    <div className="publication-list-page">
      <div className="filter-panel-container">
        <button className="filter-toggle" onClick={() => setShowFilterPanel(!showFilterPanel)}>
          Фильтры
        </button>
        {showFilterPanel && <FilterPanel onFilter={handleFilter} />}

      </div>
      <div className="publication-list-container">
        <PublicationList
        filterData={filterData}
        savedPublications={savedPublications}
        onSave={savePublication}
        onUnsave={unsavePublication}/>
      </div>
    </div>
  );
}

export default PublicationListPage;
