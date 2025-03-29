importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'AIzaSyCl59pG3xG7nXSpbqZkOI-UnaUd0EsjnG0',
  authDomain: 'subme-notification.firebaseapp.com',
  projectId: 'subme-notification',
  storageBucket: 'subme-notification.firebasestorage.app',
  messagingSenderId: '440687272819',
  appId: '1:440687272819:web:17ecbc4d93f794b0511b06',
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();
console.log(messaging);

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
