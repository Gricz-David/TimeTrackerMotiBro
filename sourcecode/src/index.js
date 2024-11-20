import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Main from './pages/Main'
import './index.css';

//Needed routing for multiple pages (just two pages this time around)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Main" element={<Main />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
