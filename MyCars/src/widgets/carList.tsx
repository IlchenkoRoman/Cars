import React, { useState } from 'react';
import type { Car } from '../entities/car';
import { CarCard } from '../entities/car';
import { AddCarForm } from '../features/addCar';
import { EditCarForm } from '../features/editCar';
import { Loader } from '../shared/ui/loader/loader';
import "./carList.css"

interface CarsListProps {
  cars: Car[];
  isLoading: boolean;
  error: string;
  onRefresh: () => void;
  onAddCar: (carData: Omit<Car, 'id'>) => void;
  onDeleteCar: (id: number) => void;
  onUpdateCar: (car: Car) => void;
}

export const CarsList: React.FC<CarsListProps> = ({
  cars,
  isLoading,
  error,
  onRefresh,
  onAddCar,
  onDeleteCar,
  onUpdateCar,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [editingCar, setEditingCar] = useState<Car | null>(null);

  const handleAddCar = (carData: Omit<Car, 'id'>) => {
    onAddCar(carData);
    setIsAdding(false);
  };

  const handleEditCar = (car: Car) => {
    onUpdateCar(car);
    setEditingCar(null);
  };

  const handleDeleteCar = (id: number) => {
    onDeleteCar(id);
  };


  const handleCancel = () => {
    setIsAdding(false);
    setEditingCar(null);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Ошибка</h2>
        <p>{error}</p>
        <button onClick={onRefresh} className="btn btn-primary">
          Попробовать снова
        </button>
      </div>
    );
  }

  return (
    <div className="cars-container">
      <h1>Управление автомобилями</h1>
      <div className="cars-header">
        <div className="header-actions">
          <button 
            onClick={() => setIsAdding(true)} 
            className="btn btn-primary"
            disabled={isAdding || editingCar !== null}
          >
            Добавить автомобиль
          </button>
        </div>
      </div>

      {isAdding && (
        <div className="modal-overlay">
          <div className="modal-content">
            <AddCarForm
              onSubmit={handleAddCar}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      {editingCar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <EditCarForm
              car={editingCar}
              onSubmit={handleEditCar}
              onCancel={handleCancel}
            />
          </div>
        </div>
      )}

      <div className="cars-grid">
        {cars.length === 0 ? (
          <div className="empty-state">
            <h3>Нет автомобилей</h3>
            <p>Добавьте первый автомобиль</p>
          </div>
        ) : (
          cars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              onEdit={setEditingCar}
              onDelete={handleDeleteCar}
            />
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

export default CarsList