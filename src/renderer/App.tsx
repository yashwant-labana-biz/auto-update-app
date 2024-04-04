import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect } from 'react';

function Hello() {
  const { ipcRenderer } = window.electron;
  useEffect(() => {
    ipcRenderer.once('auto-update-app', (message) => {
      console.log(message);
    });
  }, [ipcRenderer]);
  return <div>Auto Update app</div>;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
