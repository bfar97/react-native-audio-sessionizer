package com.audiosessionizer

import android.media.AudioAttributes
import android.media.AudioFocusRequest
import android.media.AudioManager
import android.os.Build
import androidx.annotation.RequiresApi
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class AudioSessionizerModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

  private val audioSession: AudioManager = reactContext.getSystemService(ReactApplicationContext.AUDIO_SERVICE) as AudioManager

  override fun getName(): String {
    return "AudioSessionizer"
  }

  private val focusChangeListener = AudioManager.OnAudioFocusChangeListener { focusChange ->
    when (focusChange) {
      AudioManager.AUDIOFOCUS_GAIN -> {
          // handle the gain of audio focus
      }
      AudioManager.AUDIOFOCUS_LOSS -> {
        // handle the loss of audio focus
      }
      AudioManager.AUDIOFOCUS_LOSS_TRANSIENT -> {
        // handle the transient loss of audio focus
      }
      AudioManager.AUDIOFOCUS_LOSS_TRANSIENT_CAN_DUCK -> {
        // handle the transient loss of audio focus with ducking
      }
    }
  }


  @RequiresApi(Build.VERSION_CODES.O)
  private val audioFocusRequest = AudioFocusRequest.Builder(AudioManager.AUDIOFOCUS_GAIN_TRANSIENT_MAY_DUCK)
    .setAudioAttributes(
      AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_ASSISTANT)
        .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
        .build()
    )
    .setAcceptsDelayedFocusGain(false)
    .build()

  private fun requestAudioFocus() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      audioSession.requestAudioFocus(
        audioFocusRequest
      )
    } else {
      audioSession.requestAudioFocus(
        focusChangeListener,
        AudioManager.STREAM_MUSIC,
        AudioManager.AUDIOFOCUS_GAIN
      )
    }
  }

  @ReactMethod
  fun setActive(state: Boolean, promise: Promise) {
    try {
      if (state) {
        requestAudioFocus()
        promise.resolve("Audio focus requested successfully")
      } else {
        abandonAudioFocus()
        promise.resolve("Audio focus abandoned successfully")
      }
    } catch (e: Exception) {
      promise.reject("Error", e)
    }
  }

  private fun abandonAudioFocus() {
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      val result = audioSession.abandonAudioFocusRequest(audioFocusRequest)
    } else {
      audioSession.abandonAudioFocus(
        focusChangeListener
      )
    }
  }

  companion object {
    const val NAME = "AudioSessionizer"
  }
}
