import PushNotificationIOS, { PushNotification } from "@react-native-community/push-notification-ios";

const subscribeNotification = () => {
  PushNotificationIOS.requestPermissions({
    alert: true,
    badge: true,
    sound: true,
    critical: true,
  }).then(
    (data) => {
      console.log('PushNotificationIOS.requestPermissions', data);
    },
    (data) => {
      console.log('PushNotificationIOS.requestPermissions failed', data);
    },
  );

  const type = 'notification';
  PushNotificationIOS.addEventListener(type, onRemoteNotification);
  // setTimeout(() => {
  //     PushNotificationIOS.addNotificationRequest({
  //     id: new Date().getTime().toString(),
  //     title: 'test'
  //   });
  // }, 1000);
  return () => {
    PushNotificationIOS.removeEventListener(type);
  };
}

const onRemoteNotification = (notification: PushNotification) => {
  console.log('notification fired');
  const isClicked = notification.getData().userInteraction === 1;

  if (isClicked) {
    // Navigate user to another screen
  } else {
    // Do something else with push notification
  }
  // Use the appropriate result based on what you needed to do for this notification
  const result = PushNotificationIOS.FetchResult.NoData;
  notification.finish(result);
};

export default subscribeNotification
