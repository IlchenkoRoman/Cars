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

type SortOption =  'none' | 'price-asc' | 'price-desc' | 'year-asc' | 'year-desc';

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

  const [sortOption, setSortOption] = useState<SortOption>('none');

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

   const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

   const getSortedCars = () => {
    if (sortOption === 'none') return cars;
    const carsToSort = [...cars];
    return carsToSort.sort((a, b) => {
      switch (sortOption) {
        case 'price-asc':
          return a.price - b.price;
        
        case 'price-desc':
          return b.price - a.price;
        
        case 'year-asc':
          return a.year - b.year;
        
        case 'year-desc':
          return b.year - a.year;
        
        default:
          return 0;
      }
    });
  };

  const sortedCars = getSortedCars();

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
      <div className='cars-containers-content'>
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
          {sortedCars.length === 0 ? (
            <div className="empty-state">
              <h3>Нет автомобилей</h3>
              <p>Добавьте первый автомобиль</p>
            </div>
          ) : (
            sortedCars.map(car => (
              <CarCard
                key={car.id}
                car={car}
                onEdit={setEditingCar}
                onDelete={handleDeleteCar}
              />
            ))
          )}
        </div>

        <div className="cars-header">
          <div className="sort-controls">
            <label htmlFor="sort-select" className="sort-label">
              <h3>Сортировка:</h3>
            </label>
            <select 
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="sort-select"
            >
              <option value="none">Без сортировки</option>
              <option value="price-asc">Цена по возрастанию</option>
              <option value="price-desc">Цена по убыванию</option>
              <option value="year-asc">Год по возрастанию</option>
              <option value="year-desc">Год по убыванию</option>
            </select>
          </div>

          <div className="header-actions">
            <button 
              onClick={() => setIsAdding(true)} 
              disabled={isAdding || editingCar !== null}
            >
              Добавить автомобиль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarsList