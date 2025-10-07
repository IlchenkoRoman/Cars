import { useState, useEffect } from 'react';
import type { Car } from '../../../entities/car'; 
import { carService } from '../../../entities/car';

export const useCars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  const loadCars = async () => {
    try {
      setIsLoading(true);
      setError('');
      const carsData = await carService.getCars();
      setCars(carsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Произошла ошибка');
    } finally {
      setIsLoading(false);
    }
  };

  // Добавить машину
  const addCar = (carData: Omit<Car, 'id'>) => {
    try {
      const newCar = carService.addCar(carData);
      setCars(prev => [...prev, newCar]);
      return newCar;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при добавлении машины');
      throw err;
    }
  };

  // Удалить машину
  const deleteCar = (id: number) => {
    try {
      const success = carService.deleteCar(id);
      if (success) {
        setCars(prev => prev.filter(car => car.id !== id));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при удалении машины');
      return false;
    }
  };

  // Обновить машину
  const updateCar = (updatedCar: Car) => {
    try {
      const success = carService.updateCar(updatedCar);
      if (success) {
        setCars(prev => prev.map(car => 
          car.id === updatedCar.id ? updatedCar : car
        ));
      }
      return success;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка при обновлении машины');
      return false;
    }
  };

  useEffect(() => {
    loadCars();
  }, []);

  return {
    cars,
    isLoading,
    error,
    refresh: loadCars,
    addCar,
    deleteCar,
    updateCar,
  };
};