// PublicationListPage.js
import React, { useState } from 'react';
import PublicationList from '../components/PublicationList';
import FilterPanel from '../components/FilterPanel';
import '../style/PublicationListPage.css';

function PublicationListPage() {
  const [filterData, setFilterData] = useState({});
  const [showFilterPanel, setShowFilterPanel] = useState(false); // Состояние для отображения фильтр-панели

  const handleFilter = (data) => {
    setFilterData(data);
  };

  return (
    <div className="publication-list-page">
      <div className="filter-panel-container">
        {/* Кнопка для открытия/закрытия фильтр-панели */}
        <button className="filter-toggle" onClick={() => setShowFilterPanel(!showFilterPanel)}>
          Фильтры
        </button>
        {/* Панель фильтров */}
        {showFilterPanel && <FilterPanel onFilter={handleFilter} />}
      </div>
      <PublicationList filterData={filterData} />
    </div>
  );
}

export default PublicationListPage;
