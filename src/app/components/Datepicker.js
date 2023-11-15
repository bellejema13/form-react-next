"use client";

import React, { useState } from 'react'; 
import styles from '../styles/Datepicker.module.scss';
import PropTypes from "prop-types";

const defaultProps = {
  isRequired: false,
  error: ''
}

const Datepicker = ({
  id,
  label,
  callback,
  isRequired = defaultProps.isRequired,
  error = defaultProps.error
}) => {
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    if(e.target.value) {
      callback({
        "name": id,
        "value": e.target.value
      })
      setValue(e.target.value);
    }
  }

  return (
    <div className={styles.wrap}>
      <label className={styles.label}>{label}{isRequired ? '*' : ''}</label>
      <input 
        name={id}
        className={styles.input} 
        onChange={(e) => handleChange(e)}
        type={'date'}
        value={value}
      />
      {error && (<p className={styles.error}>{error}</p>)}
    </div>
  )
}

Datepicker.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  isRequired: PropTypes.bool
};

export default Datepicker;
