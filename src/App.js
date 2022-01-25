import React from 'react';
import './App.css';

import Navigation from './Components/Navigation';
import Footer from './Components/Footer';
import Router from './Router';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navigation />
        <Router />
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
