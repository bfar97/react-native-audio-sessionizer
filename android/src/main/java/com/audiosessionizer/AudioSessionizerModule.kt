package com.audiosessionizer

import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.Promise

class AudioSessionizerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val audioSession: AudioManager = reactContext.getSystemService(ReactApplicationContext.AUDIO_SERVICE) as AudioManager
  private val audioSessionAttributes: AudioAttributes = AudioAttributes.Builder()
    .setUsage(AudioAttributes.USAGE_MEDIA)
    .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
    .build()
  @RequiresApi(Build.VERSION_CODES.O)
  private val audioFocusRequestObject = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN)
    .setAudioAttributes(audioSessionAttributes)
    .setAcceptsDelayedFocusGain(true)
    .setWillPauseWhenDucked(false)
    .build()
  override fun getName(): String {
    return "AudioSessionizer"
  }

  @RequiresApi(Build.VERSION_CODES.O)
  @ReactMethod
  fun requestAudioFocus(promise: Promise) {
    val result = audioSession.requestAudioFocus(audioFocusRequestObject)
    if (result == AudioManager.AUDIOFOCUS_REQUEST_GRANTED) {
      promise.resolve(true)
    } else {
      promise.reject("AUDIO_FOCUS_REQUEST_FAILED", "Audio focus request failed.")
    }
  }

  @RequiresApi(Build.VERSION_CODES.O)
  @ReactMethod
  fun abandonAudioFocus(promise: Promise) {
    val result = audioSession.abandonAudioFocusRequest(audioFocusRequestObject)
  }

  companion object {
    const val NAME = "AudioSessionizer"
  }
}
