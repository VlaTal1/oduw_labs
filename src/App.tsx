import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuctionDetails from './components/auction/auctionDetails/auctionDetails';
import Auctions from './components/auction/auctions/auctions';
import UpdateVehicle from './components/vehicle/updateVehicle/updateVehicle';
import VehiclePage from './components/vehicle/vehicle';
import './index.css';

const App: React.FC = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<VehiclePage />} />
          <Route path="/vehicle/:vehicleId" element={<UpdateVehicle />} />
          <Route path="/auctions" element={<Auctions />} />
          <Route path="/auction/:auctionId" element={<AuctionDetails />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
