import React from 'react';

const Card = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-lg p-6 shadow-sm ${className}`}>{children}</div>
  );
};

export default Card;
