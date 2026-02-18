import React from 'react';

export const Input = React.forwardRef(({
  className = '',
  type = 'text',
  ...props
}, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`
        w-full
        px-4
        py-2
        border
        border-gray-300
        rounded-lg
        focus:outline-none
        focus:ring-2
        focus:ring-emerald-400
        focus:border-transparent
        transition-all
        duration-200
        placeholder-gray-400
        ${className}
      `}
      {...props}
    />
  );
});

Input.displayName = 'Input';
