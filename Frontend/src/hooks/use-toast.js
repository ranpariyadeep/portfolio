export const toast = ({ title = '', description = '' }) => {
  // Get or create toast container
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    container.className = 'fixed bottom-4 right-4 z-50 max-w-md pointer-events-none space-y-2';
    document.body.appendChild(container);
  }

  // Create toast element
  const toastElement = document.createElement('div');
  toastElement.className = 'bg-white rounded-lg shadow-lg p-4 border-l-4 border-emerald-500 mb-2 pointer-events-auto animate-in fade-in slide-in-from-right';
  toastElement.innerHTML = `
    <div class="font-semibold text-gray-900">${title}</div>
    ${description ? `<div class="text-sm text-gray-600 mt-1">${description}</div>` : ''}
  `;

  container.appendChild(toastElement);

  // Auto remove after 3 seconds
  setTimeout(() => {
    toastElement.remove();
  }, 3000);
};

export const useToast = () => {
  return { toast };
};
