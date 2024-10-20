import logo from './logo.svg';
import './App.css';
import Login from './components/login';

function App() {
  return (
    <div className="App">
      <div className='main-container'>
      <header className="App-header">
        <p>Header!!</p>
      </header>
      <Login></Login>
      <footer>
        {/* <p>Footer!!</p> */}
      </footer>
    </div>
    </div>
  );
}

export default App;
