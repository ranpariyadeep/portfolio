import React from 'react';

export const Badge = ({
  className = '',
  variant = 'default',
  children,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center px-3 py-1 rounded-full font-medium text-sm';
  
  const variants = {
    default: 'bg-emerald-100 text-emerald-700',
    secondary: 'bg-gray-100 text-gray-700',
    outline: 'border border-gray-300 text-gray-700',
  };
  
  const variantClass = variants[variant] || variants.default;
  
  return (
    <span
      className={`${baseStyles} ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};

Badge.displayName = 'Badge';
