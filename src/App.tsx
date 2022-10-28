/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useEffect, useState, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleProp,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ViewStyle,
} from 'react-native';

import {
  Colors
} from 'react-native/Libraries/NewAppScreen';

import * as beacon from './beacon';
import * as notification from './notification';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [count, setCount] = useState<string>("...");
  useEffect(() => {
    const unSubscribe = beacon.default(setCount);
    return unSubscribe;
  }, [setCount]);

  useEffect(() => {
    const unSubscribe = notification.default();
    return unSubscribe;
  }, []);

  const backgroundStyle: StyleProp<ViewStyle> = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  };

  return (
    <SafeAreaView>
      <View
        style={backgroundStyle}>

        <Text style={{fontSize: 100}}>{count}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
