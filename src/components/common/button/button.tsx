import React from 'react';
import './button.css';

interface Props {
  text: string;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({text}) => {
  return <button className={'button'}>
    {text}
  </button>;
};

export default Button;