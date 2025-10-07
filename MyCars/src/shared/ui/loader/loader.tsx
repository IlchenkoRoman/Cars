import React from 'react';

export const Loader: React.FC = () => {
  return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Загрузка данных...</p>
    </div>
  );
};