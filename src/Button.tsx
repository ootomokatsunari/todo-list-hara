import React from "react";

type ButtonProps = {
  onClick: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
};

const Button = ({ children, onClick, className = '', type = 'button' }: React.PropsWithChildren<ButtonProps>) => {
  return (
    <button type={type} className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};


export default Button;
