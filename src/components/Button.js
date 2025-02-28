import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ children, onClick, variant = 'primary', disabled = false }) => {
  return (
    <button 
      className={`${styles.button} ${styles[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
