import React from 'react';
import type { Car } from '../../../entities/car';
import './addCarForm.css'

interface AddCarFormProps {
  onSubmit: (carData: Omit<Car, 'id'>) => void;
  onCancel: () => void;
}

export const AddCarForm: React.FC<AddCarFormProps> = ({
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<Omit<Car, 'id'>>({
    name: '',
    model: '',
    year: new Date().getFullYear(),
    color: '',
    price: 0,
    latitude: 55.7558,
    longitude: 37.6173
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'year' || name === 'price' || name === 'latitude' || name === 'longitude' 
        ? Number(value) 
        : value
    }));
  };

  return (
    <div className="car-form">
      <h2>Добавление автомобиля</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Марка: </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Модель: </label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Год: </label>
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
            <label>Цвет: </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Цена (₽): </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="10000"
              required
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit">
            Добавить
          </button>
          <button type="button" onClick={onCancel}>
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};