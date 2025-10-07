import React, { useState } from 'react';
import { type Car } from '../api/types';
import './carCard.css'
import { YMaps, Map, Placemark } from '@iminside/react-yandex-maps';
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
  const [showMapModal, setShowMapModal] = useState(false);

  const handleShowMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMapModal(true);
  };

  const handleCloseMap = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowMapModal(false);
  };

  return (
    <>
    <div className='car-card' onClick={() => onEdit(car)}>
        <img className='car-photo' src={photo}/>
        <div className='car-info'>
        <div className='car-header'>
            <h3>{car.name} {car.model}, {car.year}</h3>
            <h3>{car.price.toLocaleString()} ₽</h3>
        </div>
      <div className='car-details'>
          <span>Цвет:</span>
          <span> {car.color}</span>
      </div>

      <div className='car-actions'>
            <a 
              onClick={handleShowMap}
              className='view-map-link'
            >
              Посмотреть на карте
            </a>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onDelete(car.id)}}
        >
          Удалить
        </button>
      </div>
      </div>
    </div>

      {showMapModal && (
        <div className='modal-overlay-map' onClick={handleCloseMap}>
          <div className='modal-content-map' onClick={(e) => e.stopPropagation()}>
            <div className='modal-header-map'>
              <h2>{car.name} {car.model} - Местоположение</h2>
              <button 
                className='modal-close-btn-map'
                onClick={handleCloseMap}
              >
                ×
              </button>
            </div>
            
            <div className='map-container-map'>
              <YMaps query={{ apikey: '1eb4c462-1b13-43ff-becb-696e771a4ff1' }}>
                <Map 
                  defaultState={{ center: [car.latitude, car.longitude], zoom: 13 }} 
                  width='100%'
                  height='500px'
                >
                  <Placemark
                    geometry={[car.latitude, car.longitude]}
                    options={{
                      preset: 'islands#redAutoIcon',
                      draggable: false
                    }}
                    properties={{
                      hintContent: `${car.name} ${car.model}`,
                      balloonContent: `
                        <strong>${car.name} ${car.model}</strong><br/>
                        Год: ${car.year}<br/>
                        Цвет: ${car.color}<br/>
                        Цена: ${car.price.toLocaleString()} ₽<br/>
                        Координаты: ${car.latitude.toFixed(4)}, ${car.longitude.toFixed(4)}
                      `
                    }}
                  />
                </Map>
              </YMaps>
            </div>

            <div className='modal-footer-map'>
              <div className='coordinates-info-map'>
                Координаты: {car.latitude.toFixed(6)}, {car.longitude.toFixed(6)}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};