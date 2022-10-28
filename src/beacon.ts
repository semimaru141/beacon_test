import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Beacons from 'react-native-beacons-manager'

const region = {
  identifier: 'Estimotes',
  uuid: 'E2C56DB5-DFFB-48D2-B060-D0F5A71096E0'
};

const func = (f: (n: string) => void) => {
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

  // Request for authorization while the app is open
  Beacons.requestAlwaysAuthorization();
  Beacons.requestWhenInUseAuthorization();
  // @ts-ignore
  Beacons.allowsBackgroundLocationUpdates(true);
  Beacons.shouldDropEmptyRanges(true);

  // // @ts-ignore
  // const subscription = Beacons.BeaconsEventEmitter.addListener(
  //   'beaconsDidRange',
  //   // @ts-ignore
  //   (data) => {
  //     // Alert.alert(data.region.uuid);
  //     console.log('beaconsDidRange', data);
  //   }
  // );

  // @ts-ignore
  const ssubscription = Beacons.BeaconsEventEmitter.addListener(
    'regionDidEnter',
    // @ts-ignore
    (data) => {
      console.log("regionDidEnter", data);
      PushNotificationIOS.addNotificationRequest({
        id: new Date().getTime().toString(),
        body: 'didEnter'
      });
      f("ビーコン検知")
      setTimeout(() => {
        f("検知中");
      }, 3000);
      // Alert.alert(data.region.uuid);
    }
  );

  // @ts-ignore
  const sssubscription = Beacons.BeaconsEventEmitter.addListener(
    'regionDidExit',
    // @ts-ignore
    (data) => {
      console.log("regionDidExit", data);
      PushNotificationIOS.addNotificationRequest({
        id: new Date().getTime().toString(),
        body: 'didExit'
      });
      f("ビーコン消失検知")
      setTimeout(() => {
        f("探索中");
      }, 3000);
      // Alert.alert(data.region.uuid);
    }
  );

  setTimeout(() => {
    Beacons.startMonitoringForRegion(region);
    Beacons.startUpdatingLocation();
  }, 100);

  return () => {
    Beacons
    .stopMonitoringForRegion(region)
    .then(() => console.log('Beacons monitoring stopped succesfully'))
    .catch(error => console.log(`Beacons monitoring not stopped, error: ${error}`));
    // stop updating locationManager:
    Beacons.stopUpdatingLocation();
    // subscription.remove()
    ssubscription.remove();
    sssubscription.remove();
  }
}

export default func
