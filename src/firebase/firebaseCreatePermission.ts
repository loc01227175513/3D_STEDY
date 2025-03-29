import { requestForToken } from './firebaseMessaging';

const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      await requestForToken();
    }
  } else {
    // console.log('The browser does not support notifications.');
    return;
  }

  if (Notification.permission === 'granted') {
    // console.log('Notification permission has been granted.');
    await requestForToken();
    return;
  }

  if (Notification.permission === 'denied') {
    // console.log(
    //   'You have blocked notifications. Please go to your browser settings to re-enable notification permissions.'
    // );
    return;
  }

  // If permission is 'default', request permission again
  const permission = await Notification.requestPermission();
  if (permission === 'granted') {
    // console.log('Notification permission has been granted.');
    await requestForToken();
  } else {
    // console.log('Notification permission was denied.');
  }
};

export default requestNotificationPermission;
