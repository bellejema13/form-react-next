'use client'

import styles from '../styles/Button.module.scss'
import PropTypes from "prop-types";
import Link from 'next/link'

const defaultProps = {
  type: 'submit',
  onClick: () => {},
  disabled: false,
  isLink: false,
  className: ''
}

const Button = ({
  label,
  href,
  className = defaultProps.className,
  type = defaultProps.type,
  onClick = defaultProps.onClick,
  disabled = defaultProps.disabled,
  isLink = defaultProps.isLink,
  ...props
}) => {

  return (
    <>
      {isLink ? (
        <Link 
          href={href}
          className={`${styles.button} ${styles.buttonLink} ${className}`}
        >
          <span>{label}</span>
        </Link>
      ) : (
        <button 
          className={`${styles.button} ${className}`}
          onClick={onClick}
          type={type}
          disabled={disabled}
          {...props}
        >
          <span>{label}</span>
        </button>
      )}
    </>
  )
}

Button.propTypes = {
  type: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  isLink: PropTypes.bool
};

export default Button;
