import Search from './components/Search';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>GitHub User Search</h1>
        <p>Find GitHub users by their username</p>
      </header>

      <main className="main-content">
        <Search />
      </main>
    </div>
  );
}

export default App;