import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { formVehicle } from '../../../functions/functions';
import { AppDispatch, RootState } from '../../../store/store';
import { loadVehicleById, updateVehicle } from '../../../store/thunks';
import { resetVehicle } from '../../../store/vehicleSlice';
import VehicleFormType from '../../../types/vehicleFormType';
import VehicleForm from '../vehicleForm/vehicleForm';

const UpdateVehicle: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { vehicleId } = useParams<Record<string, string>>();
  const [formData, setFormData] = useState<VehicleFormType>({} as VehicleFormType);
  const { loadVehicleStatus, vehicle } = useSelector((state: RootState) => state.vehicleSlice);
  const navigate = useNavigate();

  useEffect(() => {
    if (vehicleId) {
      const numericVehicleId = Number(vehicleId);
      if (!isNaN(numericVehicleId)) {
        dispatch(loadVehicleById(numericVehicleId));
      }
    }
  }, []);

  useEffect(() => {
    if (vehicle) {
      setFormData({
        manufacturer: vehicle.model.manufacturer.name,
        country: vehicle.model.manufacturer.country.name,
        model: vehicle.model.name,
        amount: vehicle.amount,
        color: vehicle.color.name,
        price: vehicle.price,
        year: vehicle.year,
        used: vehicle.used,
        type: vehicle.type,
      });
    }
  }, [vehicle]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (e.target instanceof HTMLInputElement && (e.target.type === 'checkbox' || e.target.type === 'radio')) {
      setFormData({
        ...formData,
        [name]: e.target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const vehicle = formVehicle(formData);
    vehicle.id = Number(vehicleId);
    dispatch(updateVehicle(vehicle));
    dispatch(resetVehicle())
    navigate('/');
  };

  return (
    <VehicleForm label={'Update vehicle'}
                 formData={formData}
                 handleChange={handleChange}
                 handleSubmit={handleSubmit}
                 setFormData={setFormData}
                 buttonDisabled={false}
                 buttonText="Update" />
  );
};

export default UpdateVehicle;