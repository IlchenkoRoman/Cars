import React from 'react';
import type { Car } from '../../../entities/car';
import './editCarForm.css'

interface EditCarFormProps {
  car: Car;
  onSubmit: (car: Car) => void;
  onCancel: () => void;
}

export const EditCarForm: React.FC<EditCarFormProps> = ({
  car,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = React.useState<Omit<Car, 'id'>>({
    name: car.name,
    model: car.model,
    year: car.year,
    color: car.color,
    price: car.price,
    latitude: car.latitude,
    longitude: car.longitude
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...formData, id: car.id });
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
      <h2>Редактирование автомобиля</h2>
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
              disabled
            />
          </div>
          <div className="form-group">
            <label>Цвет: </label>
            <input
              type="text"
              name="color"
              value={formData.color}
              onChange={handleInputChange}
              disabled
            />
          </div>
          <div className="form-group">
            <label>Цена ($): </label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              min="0"
              step="100"
              disabled
            />
          </div>
        </div>
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Сохранить
          </button>
          <button type="button" onClick={onCancel} className="btn btn-outline">
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};