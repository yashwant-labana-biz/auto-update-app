import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useEffect, useState } from 'react';

function Hello() {
  const [message, setMessage] = useState('');
  const [version, setVersion] = useState('');
  const [isUpdateAvailable, setIsUpdateAvailable] = useState(false);
  useEffect(() => {
    window.electron.ipcRenderer.on('auto-update-message', (args) => {
      const msg = args as string;
      setMessage(msg);
    });
    window.electron.ipcRenderer.sendMessage('get-version');
    window.electron.ipcRenderer.on('get-version', (args) => {
      const ver = args as string;
      setVersion(ver);
    });
  }, []);
  const handleDownloadUpdate = () => {
    window.electron.ipcRenderer.sendMessage('download-update');
  };
  useEffect(() => {
    window.electron.ipcRenderer.on('update-available', (args) => {
      const response = args as boolean;
      setIsUpdateAvailable(response);
    });
  }, []);
  return (
    <div>
      :Auto Update app:
      <p>Version:{version}</p>
      <p>Message:{message}</p>
      {isUpdateAvailable ? (
        <div>
          <p>Update Available</p>
          <button
            type="button"
            onClick={() => {
              handleDownloadUpdate();
            }}
          >
            Download
          </button>{' '}
        </div>
      ) : (
        <div>No Update available</div>
      )}
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
