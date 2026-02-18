import React from 'react';

// Simple toast notification component
export const Toaster = () => {
  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-md pointer-events-none" id="toast-container">
      {/* Toasts will be dynamically added here by the toast hook */}
    </div>
  );
};

Toaster.displayName = 'Toaster';
