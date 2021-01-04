import React from 'react';
import refreshIcon from '../assets/icons/refresh.svg';

const Controls = () => {
  return (
    <div className='controls'>
      <button className='change'>
        <img className='refresh' src={refreshIcon} alt='refresh'></img>
      </button>
      <select className='lang'>
        <option>RU</option>
        <option>EN</option>
      </select>
      <div className='sub-controls'>
        <button className='farengate inactive'>&deg;F</button>
        <button className='celsius'>&deg;C</button>
      </div>
    </div>
  )
}

export default Controls;