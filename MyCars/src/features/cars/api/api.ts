import { type Cars} from "./types";

const API_URL = 'https://ofc-test-01.tspb.su/test-task/vehicles'
const STORAGE_KEY = 'cars_data';

class CarsService {
    async getCars(): Promise<Cars[]> {
        const cachedCars = this.getCarsFromStorage();
        if (cachedCars.length > 0) {
            return cachedCars;
        }

        const response = await fetch(`${API_URL}`);
        
        if (!response.ok) {
            throw new Error(`Ошибка API: ${response.status}`);
        }

        const cars: Cars[] = await response.json();
        
        this.saveCarsToStorage(cars);
        
        return cars;
    }

    // Добавить машину
    addCar(car: Omit<Cars, 'id'>): Cars {
        const cars = this.getCarsFromStorage();
        const newCar: Cars = {
            ...car,
            id: this.generateId(cars)
        };
        
        const updatedCars = [...cars, newCar];
        this.saveCarsToStorage(updatedCars);
        
        return newCar;
    }

    // Удалить машину
    deleteCar(id: number): boolean {
        const cars = this.getCarsFromStorage();
        const updatedCars = cars.filter(car => car.id !== id);
        
        if (updatedCars.length === cars.length) {
            return false
        }
        
        this.saveCarsToStorage(updatedCars);
        return true
    }

    // Обновить 
    updateCar(updatedCar: Cars): boolean {
        const cars = this.getCarsFromStorage();
        const index = cars.findIndex(car => car.id === updatedCar.id);
        
        if (index === -1) {
            return false;
        }
        
        const updatedCars = [...cars];
        updatedCars[index] = updatedCar;
        this.saveCarsToStorage(updatedCars);
        
        return true;
    }

    getCarsFromStorage(): Cars[] {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    }

    saveCarsToStorage(cars: Cars[]): void {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cars));
    }

private generateId(cars: Cars[]): number {
    if (cars.length === 0) {
        return 1;
    }
    const maxId = Math.max(...cars.map(car => car.id));
    return maxId + 1;
}
}

export const carService = new CarsService();

