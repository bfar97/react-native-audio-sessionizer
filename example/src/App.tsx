import * as React from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import {
  setActive,
  setCategory,
  setMode,
} from 'react-native-audio-sessionizer';
import {
  AudioSessionCategoryOptions,
  AudioSessionCategoryTypes,
} from '../../src/categoryTypes';
import { AudioSessionModeTypes } from '../../src/modeTypes';

export default function App() {
  const [active, setActiveState] = React.useState(false);

  React.useEffect(() => {
    setCategory(AudioSessionCategoryTypes.Playback, [
      AudioSessionCategoryOptions.DuckOthers,
    ])
      .then(() => {
        console.log('Setting Category was successful');
      })
      .catch((err) => {
        console.log('Setting Category failed', err);
      });

    setMode(AudioSessionModeTypes.VoicePrompt)
      .then(() => {
        console.log('Setting Mode was successful');
      })
      .catch((err) => {
        console.log('Setting Mode failed', err);
      });
    setActive(false)
      .then(() => {
        console.log('Setting Active was successful');
      })
      .catch((err) => {
        console.log('Setting Active failed', err);
      });
  }, []);

  const toggleAudioSession = async () => {
    await setActive(!active);
    setActiveState((p) => !p);
  };

  return (
    <View style={styles.container}>
      <Text>Audio Sessionizer</Text>
      <View style={styles.spacer} />
      <Pressable style={styles.button} onPress={toggleAudioSession}>
        <Text style={styles.text}>Activate Audio Session</Text>
      </Pressable>
      <View style={styles.spacer} />
      <Text>
        {active ? 'Audio Session is active' : 'Audio Session is inactive'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    color: 'white',
  },
  spacer: {
    height: 25,
  },
});
