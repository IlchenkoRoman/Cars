import './App.css'
import { CarsPage } from '../pages/carsPage/ui/CarsPage';

const App: React.FC = () => {
  return (
      <main className='app-main'>
        <div className='container'>  
          <CarsPage />
        </div>
      </main>
  );
};

export default App;
