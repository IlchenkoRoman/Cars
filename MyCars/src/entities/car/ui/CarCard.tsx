import React from 'react';
import { type Car } from '../api/types';
import './carCard.css'
import photo from './images/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg'

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
    <div className="car-card" onClick={() => onEdit(car)}>
        <img className='car-photo' src={photo}/>
        <div className='car-info'>
        <div className="car-header">
            <h3>{car.name} {car.model}, {car.year}</h3>
            <h3>{car.price.toLocaleString()} ₽</h3>
        </div>
      <div className="car-details">
          <span>Цвет:</span>
          <span> {car.color}</span>
      </div>

      <div className="car-actions">
        <button 
          onClick={() => onDelete(car.id)}
        >
          Удалить
        </button>
      </div>
      </div>
    </div>
  );
};