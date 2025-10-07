import './App.css'
import CarsList from '../widgets/carList';

const App: React.FC = () => {
  return (
      <main className="app-main">
        <div className="container">
          <CarsList />
        </div>
      </main>
  );
};

export default App;
