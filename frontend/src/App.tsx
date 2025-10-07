import './App.css';
import { Home } from './pages/Home';
import { Alert } from './components/blocks/Alert/Alert';

function App() {
  return (
    <>
      <Alert>
        Notice: This is a demo. Information and links may not be valid, and load
        times may vary since the technology used for this project are using
        free-tier services.
      </Alert>
      <Home />
    </>
  );
}

export default App;
