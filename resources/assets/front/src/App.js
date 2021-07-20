import logo from './logo.svg';
import './bootstrap.css';
import Rota from './routes';
import Dados from './components/context/context';

function App() {
  return (
    <Dados>
      <div className="App">
        <Rota />
      </div>
    </Dados>
    
  );
}

export default App;
