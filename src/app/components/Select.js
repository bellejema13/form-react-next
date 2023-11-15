'use client'

import React, { useState } from 'react'; 
import styles from '../styles/Select.module.scss'
import PropTypes from "prop-types";
import Image from 'next/image'

const defaultProps = {
  isRequired: false,
  onChange: () => {},
  error: ''
}

const Select = ({
  options,
  id,
  defaultOption,
  placeholder,
  callback,
  isRequired = defaultProps.isRequired,
  error = defaultProps.error
}) => {
  const [active, setActive] = useState(false);
  const [value, setValue] = useState(defaultOption);

  const handleChange = (e) => {
    e.persist();
    setValue(e.target.value);
    callback(e);
    if(e.target.value) {
      setActive(true);
    }
  }

  const handleClick = (e) => {
    if(!e.target.value) {
      setActive(false);
    }
  }
  
  return (
    <>
      <div className={styles.wrap}>
        <label className={`${styles.label} ${active || value ? styles.labelActive : ''}`}>{placeholder}{isRequired ? '*' : ''}</label>
        <select 
          className={`${styles.select} ${active || value ? styles.selectActive : error ? styles.selectError : ''}`} 
          required={isRequired} 
          name={id}
          value={value}
          onChange={e => handleChange(e)}
          onClick={e => handleClick(e)}
        >
          <option value='' disabled hidden>{placeholder}{isRequired ? '*' : ''}</option>
          {options && options.map((item, key) => ( 
            <option 
              value={item.value} 
              key={key}
            >
              {item.label}
            </option>
          ))}
        </select>
        <span className={styles.arrow}>
          <Image
            src="/assets/images/arrow.svg"
            width={18}
            height={18}
            alt="Arrow"
          />
        </span>
      </div>
      {error && (<p className={styles.error}>{error}</p>)}
    </>
  )
}

Select.propTypes = {
  options: PropTypes.array,
  id: PropTypes.string,
  defaultOption: PropTypes.string,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  error: PropTypes.string
};
  
export default Select;
