import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UpdateVehicle from './components/vehicle/updateVehicle/updateVehicle';
import VehiclePage from './components/vehicle/vehicle';
import './index.css'

const App: React.FC = () => {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<VehiclePage />} />
          <Route path="/vehicle/:vehicleId" element={<UpdateVehicle />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
