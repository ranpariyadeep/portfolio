import React from 'react';

export const Button = React.forwardRef(({
  className = '',
  variant = 'default',
  size = 'md',
  disabled = false,
  children,
  asChild = false,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-400 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    default: 'bg-emerald-500 text-white hover:bg-emerald-600',
    outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  };
  
  const variantClass = variants[variant] || variants.default;
  const sizeClass = sizes[size] || sizes.md;
  
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      className: `${baseStyles} ${variantClass} ${sizeClass} ${className}`,
      ...props,
    });
  }

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${variantClass} ${sizeClass} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
