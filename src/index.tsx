import { NativeModules, Platform } from 'react-native';
import {
  AudioSessionCategoryOptions,
  AudioSessionCategoryTypes,
} from './categoryTypes';
import type { AudioSessionModeTypes } from './modeTypes';

const LINKING_ERROR =
  `The package 'react-native-audio-sessionizer' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n' +
  '- You are not using Expo Go\n';

const AudioSessionizer = NativeModules.AudioSessionizer
  ? NativeModules.AudioSessionizer
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export const setAudioSessionCategory = (
  category: AudioSessionCategoryTypes,
  options: AudioSessionCategoryOptions[]
): Promise<void> => {
  const optionValues = options.map((option) => option.valueOf());
  return AudioSessionizer.setCategory(category.valueOf(), optionValues);
};

export const setAudioSessionMode = (
  mode: AudioSessionModeTypes
): Promise<void> => {
  return AudioSessionizer.setMode(mode);
};

export const setAudioSessionState = (active: boolean): Promise<void> => {
  return AudioSessionizer.setActive(active);
};
