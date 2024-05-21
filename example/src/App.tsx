import * as React from 'react';

import { StyleSheet, View, Text, Pressable } from 'react-native';
import {
  setAudioSessionState,
  setAudioSessionCategory,
  setAudioSessionMode,
} from 'react-native-audio-sessionizer';
import {
  AudioSessionCategoryOptions,
  AudioSessionCategoryTypes,
} from '../../src/categoryTypes';
import { AudioSessionModeTypes } from '../../src/modeTypes';

export default function App() {
  const [active, setAudioSessionStateState] = React.useState(false);

  React.useEffect(() => {
    setAudioSessionCategory(AudioSessionCategoryTypes.Playback, [
      AudioSessionCategoryOptions.DuckOthers,
    ])
      .then(() => {
        console.log('Setting Category was successful');
      })
      .catch((err) => {
        console.log('Setting Category failed', err);
      });

    setAudioSessionMode(AudioSessionModeTypes.VoicePrompt)
      .then(() => {
        console.log('Setting Mode was successful');
      })
      .catch((err) => {
        console.log('Setting Mode failed', err);
      });
    setAudioSessionState(false)
      .then(() => {
        console.log('Setting Active was successful');
      })
      .catch((err) => {
        console.log('Setting Active failed', err);
      });
  }, []);

  const toggleAudioSession = async () => {
    await setAudioSessionState(!active)
      .then(() => {
        console.log(`Setting Active ${!active} was successful`);
        setAudioSessionStateState((p) => !p);
      })
      .catch((err) => {
        console.log('Setting Active failed', err);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Audio Sessionizer</Text>
      <View style={styles.spacer} />
      <Pressable style={styles.button} onPress={toggleAudioSession}>
        <Text style={styles.textButton}>Activate Audio Session</Text>
      </Pressable>
      <View style={styles.spacer} />
      <Text style={styles.text}>
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
    color: 'black',
  },
  textButton: {
    color: 'white',
  },
  spacer: {
    height: 25,
  },
});
