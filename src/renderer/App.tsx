import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

function Hello() {
  const [message, setMessage] = useState('');
  const [version, setVersion] = useState('');
  useEffect(() => {
    window.electron.ipcRenderer.on('auto-update-message', (msg) => {
      const msg1 = msg as string;
      console.log(msg1);
      alert(msg1);
      setMessage(msg1);
    });
    window.electron.ipcRenderer.sendMessage('get-version');
    window.electron.ipcRenderer.on('get-version', (args) => {
      const ver = args as string;
      setVersion(ver);
    });
  }, []);
  return (
    <div>
      :Auto Update app:{message}
      <p>Version:{version}</p>
    </div>
  );
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
