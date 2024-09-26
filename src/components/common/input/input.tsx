import React, { FC } from 'react';
import './input.css'

interface Props {
  label: string,
  type: string,
  name: string,
  value: string | number,
  onClick: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

const Input: FC<Props> = ({ label, type, name, value, onClick }) => (
  <div className='input-container'>
    <label>{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onClick}
    />
  </div>
);

export default Input;