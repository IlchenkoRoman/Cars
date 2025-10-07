import React, { useState } from 'react';
import { useCars } from '../features/cars/lib/hooks/useCars';
import type { Cars } from '../features/cars/api/types';
import './carList.css';

const CarsList: React.FC = () => {
  const { 
    cars, 
    isLoading, 
    error, 
    addCar, 
    deleteCar, 
    updateCar, 
    refresh 
  } = useCars();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formData, setFormData] = useState<Omit<Cars, 'id'>>({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    price: 0,
    latitude: 0,
    longitude: 0
  });

  const handleAddClick = () => {
    setIsAdding(true);
    setFormData({
      name: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      price: 0,
      latitude: 0,
      longitude: 0
    });
  };

  const handleEditClick = (car: Cars) => {
    setEditingId(car.id);
    setFormData({
      name: car.name,
      model: car.model,
      year: car.year,
      color: car.color,
      price: car.price,
      latitude: car.latitude,
      longitude: car.longitude
    });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isAdding) {
      addCar(formData);
      setIsAdding(false);
    } else if (editingId) {
      updateCar({ ...formData, id: editingId });
      setEditingId(null);
    }

    setFormData({
      name: '',
      model: '',
      year: new Date().getFullYear(),
      color: '',
      price: 0,
      latitude: 0,
      longitude: 0
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'latitude' || name === 'longitude' 
        ? Number(value) 
        : value
    }));
  };

  if (isLoading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Загрузка данных...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={refresh} className="btn btn-primary">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="cars-container">
      <div className="cars-header">
        <h1>Управление автомобилями</h1>
        <div className="header-actions">
          <button 
            onClick={handleAddClick} 
            className="btn btn-primary"
            disabled={isAdding || editingId !== null}
          >
            Добавить автомобиль
          </button>
          <button 
            onClick={refresh} 
            className="btn btn-outline"
          >
            Обновить
          </button>
        </div>
      </div>

      {(isAdding || editingId) && (
        <div className="car-form">
          <h2>{isAdding ? 'Добавление' : 'Редактирование'} автомобиля</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>Марка:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Модель:</label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Год:</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleInputChange}
                  min="1900"
                  max={new Date().getFullYear() + 1}
                  required
                />
              </div>
              <div className="form-group">
                <label>Цвет:</label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Цена ($):</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  min="0"
                  step="100"
                  required
                />
              </div>
              <div className="form-group">
                <label>Широта:</label>
                <input
                  type="number"
                  name="latitude"
                  value={formData.latitude}
                  onChange={handleInputChange}
                  step="any"
                  required
                />
              </div>
              <div className="form-group">
                <label>Долгота:</label>
                <input
                  type="number"
                  name="longitude"
                  value={formData.longitude}
                  onChange={handleInputChange}
                  step="any"
                  required
                />
              </div>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {isAdding ? 'Добавить' : 'Сохранить'}
              </button>
              <button type="button" onClick={handleCancel} className="btn btn-outline">
                Отмена
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="cars-grid">
        {cars.length === 0 ? (
          <div className="empty-state">
            <h3>Нет автомобилей</h3>
            <p>Добавьте первый автомобиль или синхронизируйте с API</p>
          </div>
        ) : (
          cars.map(car => (
            <div key={car.id} className="car-card">
              <div className="car-header">
                <h3>{car.name} {car.model}</h3>
                <span className="car-id">ID: {car.id}</span>
              </div>
              
              <div className="car-details">
                <div className="car-info">
                  <span className="info-label">Год:</span>
                  <span className="info-value">{car.year}</span>
                </div>
                <div className="car-info">
                  <span className="info-label">Цвет:</span>
                  <span className="info-value">{car.color}</span>
                </div>
                <div className="car-info">
                  <span className="info-label">Цена:</span>
                  <span className="info-value">${car.price.toLocaleString()}</span>
                </div>
                <div className="car-info">
                  <span className="info-label">Координаты:</span>
                  <span className="info-value">
                    {car.latitude.toFixed(4)}, {car.longitude.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="car-actions">
                <button 
                  onClick={() => handleEditClick(car)}
                  className="btn btn-outline btn-sm"
                  disabled={isAdding || editingId !== null}
                >
                  Редактировать
                </button>
                <button 
                  onClick={() => deleteCar(car.id)}
                  className="btn btn-danger btn-sm"
                  disabled={isAdding || editingId !== null}
                >
                  Удалить
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {cars.length > 0 && (
        <div className="cars-footer">
          <p>Всего автомобилей: {cars.length}</p>
        </div>
      )}
    </div>
  );
};

export default CarsList;