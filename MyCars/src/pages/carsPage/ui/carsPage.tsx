import React from 'react';
import CarsList from '../../../widgets/CarList';
import { useCars } from '../../../features/carsList';
import Header from '../../../shared/ui/header/header';

export const CarsPage: React.FC = () => {
  const {
    cars,
    isLoading,
    error,
    refresh,
    addCar,
    deleteCar,
    updateCar,
  } = useCars();

  return (
    <div className='cars-page'>
      <Header />
      <CarsList
        cars={cars}
        isLoading={isLoading}
        error={error}
        onRefresh={refresh}
        onAddCar={addCar}
        onDeleteCar={deleteCar}
        onUpdateCar={updateCar}
      />
    </div>
  );
};