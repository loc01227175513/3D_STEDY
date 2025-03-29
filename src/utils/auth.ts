import { LogoutInput } from '@/graphql/type.interface';

import { removeAllToken } from './storage';

type ToastMessageType = (type: 'success' | 'error' | 'info' | 'warning', message: string) => void;

interface LogoutOptions {
  setUser?: (user: undefined) => void;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  navigate?: (path: number | string) => void;
  ToastMessage?: ToastMessageType;
}

/**
 * Handles the logout process with a mutation
 * @param logoutMutation Function to execute the logout mutation
 * @param options Configuration options for logout behavior
 */
export const handleLogout = async (
  logoutMutation: (variables: { input: LogoutInput }) => Promise<{ success: boolean }>,
  options: LogoutOptions = {}
) => {
  const { setUser, onSuccess, onError, navigate, ToastMessage } = options;

  try {
    await logoutMutation({
      input: { deviceToken: '' }, // Provide the required input for logout
    });

    // Clear tokens
    removeAllToken();

    // Update user state if provided
    if (setUser) {
      setUser(undefined);
    }

    // Show success message if toast functionality provided
    if (ToastMessage) {
      ToastMessage('success', 'Logout successfully');
    }

    // Refresh the page or navigate if provided
    if (navigate) {
      navigate(0);
    }

    // Call additional success callback if provided
    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    // Handle errors
    if (ToastMessage && error instanceof Error) {
      ToastMessage('error', error.message);
    }

    // Call error callback if provided
    if (onError && error instanceof Error) {
      onError(error);
    }
  }
};
