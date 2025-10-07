import React from 'react';
import { type Car } from '../api/types';

interface CarCardProps {
  car: Car;
  onEdit: (car: Car) => void;
  onDelete: (id: number) => void; 
}

export const CarCard: React.FC<CarCardProps> = ({
  car,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="car-card">
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
            {car.latitude}, {car.longitude}
          </span>
        </div>
      </div>

      <div className="car-actions">
        <button 
          onClick={() => onEdit(car)}
          className="btn btn-outline btn-sm"
        >
          Редактировать
        </button>
        <button 
          onClick={() => onDelete(car.id)}
          className="btn btn-danger btn-sm"
        >
          Удалить
        </button>
      </div>
    </div>
  );
};