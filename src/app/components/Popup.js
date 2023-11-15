"use client";

import React, { useEffect } from 'react'; 
import PropTypes from "prop-types";
import useScrollLock from '../hooks/useScrollLock';
import styles from '../styles/Popup.module.scss';
import Image from 'next/image'

const Popup = ({ 
  innerClass,
  children, 
  isOpen,
  callback,
  popupId
}) => {
  const [scrollLock] = useScrollLock();

  useEffect(() => {
    if(isOpen) {
      scrollLock();
    } 
  }, [isOpen, scrollLock])

  const handleClick = (e) => {
    e.preventDefault();

    scrollLock(false);
    callback(false);
  }

  return (
    <div className={`${styles.popup} ${isOpen ? styles.popupOpen : ''}`}>
      <div className={styles.overlay} onClick={e => handleClick(e)}></div>
      <div className={`${styles.inner} ${innerClass}`}>
        <div className={`${styles.container} ${popupId === 'privacy' ? styles.containerPrivacy : ''}`}>
          <span 
            className={styles.close} 
            aria-label="Close"
            onClick={e => handleClick(e)}
          >
            <Image
              src="/assets/images/close.svg"
              width={15}
              height={15}
              alt="Close"
              priority={true}
            />
          </span>
          <div className={styles.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}

Popup.propTypes = {
  isOpen: PropTypes.bool
};

export default Popup;
