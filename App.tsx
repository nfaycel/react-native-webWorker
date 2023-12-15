/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';
import {Worklets} from 'react-native-worklets-core';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const [isLoading, setIsLoading] = useState(false);

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const sayHello = () => {
    'worklet';

    for (let index = 0; index < 100000000; index++) {
      const element = index * index - index;
    }
    console.log('Hello from the Worklet Thread!');
    return 'ok';
  };

  const sayHello2 = async () => {
    for (let index = 0; index < 100000000; index++) {
      const element = index * index - index;
    }
    console.log("hello from mono thread 1")
    return 'ok';
  };

  const worklet = Worklets.createRunInContextFn(sayHello);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <View style={{marginTop: 20, marginBottom: 20}}>
            <Text>Hello worker ;-)</Text>
            <Button
              title="multi thread"
              onPress={async () => {
                setIsLoading(true);
                let result = await worklet().then(r => {
                  setIsLoading(false);
                  console.log(r);
                });
                //worklet()
              }}
            />

            <Button
              title="mono thread"
              onPress={async () => {
                setIsLoading(true);
                sayHello2().then(r => {
                  setIsLoading(false);
               
                  console.log(r);
                });
              }}
            />
            <Button
              title="say Hello"
              onPress={() => console.log('another main thread is free :-)')}
            />
            {isLoading && <ActivityIndicator size="large" color="#00ff00" />}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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
