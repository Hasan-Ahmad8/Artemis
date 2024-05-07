import logo from './logo.svg';
import './App.css';
import { IndexView } from './components/IndexView.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <IndexView/>
      </BrowserRouter>
    </div>
  );
}

export default App;
