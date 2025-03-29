import { toast, ToastOptions } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

// Default toast configuration
const defaultOptions: ToastOptions = {
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

/**
 * Toast message utility to display success, error, info, or warning messages
 * @param type The type of toast message
 * @param message The message to display
 * @param options Optional toast configuration options
 */
export const ToastMessage = (
  type: 'success' | 'error' | 'info' | 'warning',
  message: string,
  options: ToastOptions = {}
): void => {
  const toastOptions = { ...defaultOptions, ...options };

  switch (type) {
    case 'success':
      toast.success(message, toastOptions);
      break;
    case 'error':
      toast.error(message, toastOptions);
      break;
    case 'info':
      toast.info(message, toastOptions);
      break;
    case 'warning':
      toast.warning(message, toastOptions);
      break;
    default:
      toast(message, toastOptions);
  }
};
