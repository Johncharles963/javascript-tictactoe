import './App.css';
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Play from './components/Play'
import BasePage from './components/BasePage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BasePage />}>
      <Route path="" element={<Home />} />
      <Route path="play" element={<Play />} />
      </Route>
    </Routes>
  );
}

export default App;
