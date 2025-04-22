import './App.css';
import Button from 'react-bootstrap/Button';
import NavBar from './components/navbar';

function App() {
  return (
    // Importing the NavBar component
    <div className="App">
      <NavBar />
      {/* Using Bootstrap classes for styling */}
      <header className="App-header mt-5">
        <h1 className="App-title">
          Welcome to Reacttoria! We are happy you're here!
        </h1>
        <p className="lead text-white">
          This is a simple React app with Bootstrap styling.
        </p>
      </header>
      <div className="container-sm border bg-dark text-white rounded-3 shadow-sm w-50 mx-auto">
        <div className="row">
          <div className="col-12">
            <h4>Reacttoria</h4>
          </div>
        </div>
        <div className="card-body">
          <p>Reacttoria is a MLB Baseball Stat App!</p>
          <Button
            variant="primary"
            className="mt-3"
            onClick={() => alert('AL Easts best!')}
          >
            Go Yankees!
          </Button>
        </div>
      </div>
    </div>

  );

}



export default App;