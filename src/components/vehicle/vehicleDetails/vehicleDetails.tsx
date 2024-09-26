import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../../../store/store';
import { deleteVehicle } from '../../../store/thunks';
import { Vehicle } from '../../../types/bom/vehicle';
import './vehicleDetails.scss';

interface Props {
  vehicle: Vehicle;
}

const VehicleDetails: React.FC<Props> = ({
  vehicle,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const onDelete = () => {
    if (vehicle.id) {
      dispatch(deleteVehicle(vehicle.id));
    }
  };

  return (
    <div className="vehicle-details-container">
      <div className="vehicle-name">{`${vehicle.model.manufacturer.name} ${vehicle.model.name}`}</div>
      <ul className="vehicle-details">
        <li>Ціна: {vehicle.price}</li>
        <li>Рік викупску: {vehicle.year}</li>
        <li>Колір: {vehicle.color.name} </li>
        <li>Б/В: {vehicle.used ? 'Так' : 'Ні'}</li>
        <li>В наявності: {vehicle.amount}</li>
      </ul>
      <div className='vehicle-btns'>
        <Link to={`/vehicle/${vehicle.id}`} className="vehicle-btn">
          Update
        </Link>
        <button onClick={onDelete} className="vehicle-btn vehicle-btn--delete">Delete</button>
      </div>
    </div>
  );
};

export default VehicleDetails;