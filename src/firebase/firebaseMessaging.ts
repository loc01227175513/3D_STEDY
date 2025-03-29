import { getMessaging, getToken, onMessage } from 'firebase/messaging';

import firebaseApp from './firebaseApp';

let messaging: ReturnType<typeof getMessaging> | null = null;

if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
  messaging = getMessaging(firebaseApp);
}
export const requestForToken = async (): Promise<string | null> => {
  if (!messaging) {
    console.log('FCM messaging is not available.');
    return null;
  }
  if ('serviceWorker' in navigator && typeof window !== 'undefined') {
    try {
      const registration = await navigator.serviceWorker.register('/firebase-messaging-sw.js');
      const token = await getToken(messaging, {
        vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
        serviceWorkerRegistration: registration,
      });
      if (token) {
        return token;
      }
      console.warn('Not found token.');
    } catch (error) {
      console.error('error service worker:', error);
    }
  }
  return null;
};

export const onMessageListener = (navigate: () => void) => {
  if (!messaging) return;
  onMessage(messaging, (payload) => {
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      if (payload.notification) {
        console.log(navigate);
        // updateNotificationCount();
      }
    } else {
      console.log('Background');
    }
  });
};
