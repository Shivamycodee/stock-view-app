import './App.css';
import StockDetail from './pages/stockDetailPage'
import StockOverview from './pages/stockOverviewPage'
import React from 'react';
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import WatchlistContextProvider from './Context/watchlistContext';

function App() {
  return (
    <main className="container">
      <WatchlistContextProvider>
        <Router>
          <Routes>
            <Route path="/" element={<StockOverview />}></Route>
            <Route path="/detail/:symbol" element={<StockDetail />}></Route>
          </Routes>
        </Router>
      </WatchlistContextProvider>
    </main>
  );
  
}

export default App;
