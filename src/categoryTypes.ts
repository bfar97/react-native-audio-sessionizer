export enum AudioSessionCategoryOptions {
  MixWithOthers = 1,
  DuckOthers = 2,
  AllowBluetooth = 4,
  DefaultToSpeaker = 8,
  InterruptSpokenAudioAndMixWithOthers = 16,
  AllowBluetoothA2DP = 32,
  AllowAirPlay = 64,
  OverrideMutedMicrophoneInterruption = 128,
}

export enum AudioSessionCategoryTypes {
  Ambient = 'ambient',
  SoloAmbient = 'soloAmbient',
  Playback = 'playback',
  Record = 'record',
  PlayAndRecord = 'playAndRecord',
}
