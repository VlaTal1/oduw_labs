import React, {FC} from 'react';
import './input.css'

interface Props {
    label?: string,
    type: string,
    name: string,
    value?: string | number,
    onChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => void;
    placeholder?: string;
    required?: boolean;
}

const Input: FC<Props> = ({label, type, name, value, onChange, placeholder, required}) => (
    <div className='input-container'>
        {label && <label>{label}</label>}
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className='input'
            placeholder={placeholder}
            required={required}
        />
    </div>
);

export default Input;