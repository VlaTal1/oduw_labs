import React, { FC, useState } from 'react';
import './createVehicle.css';
import { useDispatch, useSelector } from 'react-redux';
import { formVehicle } from '../../../functions/functions';
import { AppDispatch, RootState } from '../../../store/store';
import { saveVehicle } from '../../../store/thunks';
import StatusInfo from '../../../types/bom/statusInfo';
import VehicleType from '../../../types/bom/VehicleType';
import VehicleFormType from '../../../types/vehicleFormType';
import VehicleForm from '../vehicleForm/vehicleForm';

const vehicleInitialValue = {
  manufacturer: '',
  country: '',
  model: '',
  amount: 0,
  color: '',
  price: 0,
  year: 0,
  used: false,
  type: VehicleType.PASSENGER_CAR,
};

const CreateVehicle: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [formData, setFormData] = useState<VehicleFormType>(vehicleInitialValue);
  const { saveVehicleStatus } = useSelector((state: RootState) => state.vehicleSlice);

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
    dispatch(saveVehicle(vehicle));
    setFormData(vehicleInitialValue);
    console.log('Vehicle Data:', vehicle);
  };

  return (
    <VehicleForm
      label="Create vehicle"
      formData={formData}
                 handleChange={handleChange}
                 handleSubmit={handleSubmit}
                 setFormData={setFormData}
                 buttonDisabled={saveVehicleStatus != StatusInfo.NOT_LOADED}
                 buttonText="Create"
    />
  );
};

export default CreateVehicle;
