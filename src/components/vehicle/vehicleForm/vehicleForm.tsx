import React, { FC } from 'react';
import VehicleType from '../../../types/bom/VehicleType';
import VehicleFormType from '../../../types/vehicleFormType';
import Input from '../../common/input/input';
import './vehicleForm.css'

interface Props {
  label: string;
  formData: VehicleFormType;
  handleChange: (e: React. ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  handleSubmit: (e: React. FormEvent) => void;
  setFormData: (formData: VehicleFormType) => void;
  buttonDisabled: boolean;
  buttonText: string;
}

const VehicleForm: FC<Props> = ({
  label,
  formData,
  handleChange,
  handleSubmit,
  setFormData,
  buttonDisabled,
  buttonText
}) => (
  <div className="vehicle-form-container">
    <h1 className="vehicle-form-container-label">{label}</h1>
    <form onSubmit={handleSubmit} className="vehicle-form-form">
      <div className="vehicle-form-form-inputs">
        <Input label={'Manufacturer'} type={'text'} name={'manufacturer'} value={formData.manufacturer}
               onClick={handleChange} />
        <Input label={'Country'} type={'text'} name={'country'} value={formData.country} onClick={handleChange} />
        <Input label={'Model'} type={'text'} name={'model'} value={formData.model} onClick={handleChange} />
        <Input label={'Amount'} type={'number'} name={'amount'} value={formData.amount} onClick={handleChange} />
        <Input label={'Color'} type={'text'} name={'color'} value={formData.color} onClick={handleChange} />
        <Input label={'Price'} type={'number'} name={'price'} value={formData.price} onClick={handleChange} />
        <Input label={'Year'} type={'number'} name={'year'} value={formData.year} onClick={handleChange} />
        <div className="input-container">
          <label>Is used</label>
          <figcaption>
            <label>
              <input
                type="radio"
                name="used"
                value="true"
                checked={formData.used}
                onChange={() => setFormData({ ...formData, used: true })}
              />
              Yes
            </label>
            <label>
              <input
                type="radio"
                name="used"
                value="false"
                checked={!formData.used}
                onChange={() => setFormData({ ...formData, used: false })}
              />
              No
            </label>
          </figcaption>
        </div>
        <div className="input-container">
          <label>Type</label>
          <select name="type" value={formData.type} onChange={handleChange}>
            <option value={VehicleType.PASSENGER_CAR}>Passenger car</option>
            <option value={VehicleType.TRUCK}>Truck</option>
            <option value={VehicleType.MOTORCYCLE}>Motorcycle</option>
          </select>
        </div>
      </div>
      <button type="submit" disabled={buttonDisabled}>{buttonText}</button>
    </form>
  </div>
);

export default VehicleForm;