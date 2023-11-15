"use client"

import React, { useState } from 'react'; 
import styles from '../styles/Input.module.scss'
import PropTypes from "prop-types";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const defaultProps = {
  isRequired: false,
  type: 'text',
  onChange: () => {},
  className: '',
  error: ''
}

const Input = ({
  id,
  placeholder,
  info,
  value,
  className = defaultProps.className,
  type = defaultProps.type,
  isRequired = defaultProps.isRequired,
  onChange = defaultProps.onChange,
  error = defaultProps.error,
  ...props
}) => {
  const [active, setActive] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const handleFocus = () => {
    setActive(true);
  }

  const handleBlur = (e) => {
    if(e.target.value) {
      setActive(true);
    } else {
      setActive(false);
    }
  }
  
  const handleShowPassword = () => {
    setShowPass(!showPass);
  }

  return (
    <div className={styles.wrap}>
      <label className={`${styles.label} ${active || value ? styles.labelActive : ''}`}>
        {placeholder}{isRequired ? '*' : ''}
      </label>
      {type === 'checkbox' ? (
        <span className={`${styles.checkboxWrap} ${value ? styles.checkboxActive : ''}`}>
          <input 
            className={`${className} ${type === 'checkbox' ? styles.checkbox : ''}`} 
            type={type} 
            name={id}
            value={value}
            placeholder=''
            onChange={onChange}
            {...props}
          />
        </span> 
      ) : (
        <input 
          className={`${styles.input} ${className} ${active ? styles.inputActive : error ? styles.inputError : ''}`} 
          type={type === 'password' ? showPass ? 'text' : type : type} 
          name={id}
          value={value}
          placeholder={`${active ? '' : placeholder}${!active && isRequired ? '*' : ''}`} 
          onChange={onChange}
          onFocus={e => handleFocus(e)}
          onBlur={e => handleBlur(e)}
          required={isRequired}
          autoComplete="true"
          {...props}
        />
      )}
      {type === 'password' && (
        <>
          {showPass ? (
            <FaEye className={styles.showPassword} onClick={handleShowPassword} /> 
          ) : (
            <FaEyeSlash className={styles.hidePassword} onClick={handleShowPassword} /> 
          )}
        </>
      )}
      {type !== 'checkbox' && (
        error && (<p className={styles.error}>{error}</p>)
      )}
      {info && (
        <p className={styles.info}>{info}</p>
      )}
    </div>
  )
}

Input.propTypes = {
  type: PropTypes.string,
  id: PropTypes.string.isRequired,
  isRequired: PropTypes.bool,
  placeholder: PropTypes.string,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func
};

export default Input;
