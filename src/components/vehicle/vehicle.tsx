import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch, RootState } from '../../store/store';
import { loadVehicleById, loadVehicles } from '../../store/thunks';
import { resetVehicle } from '../../store/vehicleSlice';
import StatusInfo from '../../types/bom/statusInfo';
import CreateVehicle from './createVehicle/createVehicle';
import VehicleDetails from './vehicleDetails/vehicleDetails';
import './vehicle.css';

const VehiclePage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicles, vehicle, loadVehiclesStatus } = useSelector((state: RootState) => state.vehicleSlice);

  const [searchId, setSearchId] = useState(0);

  useEffect(() => {
    dispatch(loadVehicles());
  }, []);

  if (loadVehiclesStatus !== StatusInfo.DONE || !vehicles) {
    return <h1>LOADING</h1>;
  }

  const onSearchById = () => {
    if (!searchId) {
      dispatch(resetVehicle())
      return;
    }

    const numericVehicleId = Number(searchId);
    if (!isNaN(numericVehicleId)) {
      dispatch(loadVehicleById(numericVehicleId));
    }
  }

  return (
    <div className='vehicle-container'>
       <Link to="/auctions">Go to auctions</Link>
      <CreateVehicle/>
      <aside className='vehicle-list'>
          <h2 className='title-2'>Vehicles</h2>
        <div>
          <input type="number" min={1} onChange={e=>setSearchId(Number.parseInt(e.target.value))} />
          <button onClick={onSearchById}>⬅️ Search by ID</button>
        </div>
        {(!vehicle)
          ? vehicles.map((vehicle) => (
            <VehicleDetails key={vehicle.id} vehicle={vehicle} />
          ))
          : <VehicleDetails key={vehicle!.id} vehicle={vehicle!} />}
      </aside>
    </div>
  );
};

export default VehiclePage;