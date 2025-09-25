package com.cardsdkreactnative

import android.content.Context
import android.util.Log
import android.view.LayoutInflater
import android.view.View
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.google.firebase.FirebaseApp
import com.google.firebase.FirebaseOptions
import company.tap.tapcardformkit.open.TapCardStatusDelegate
import company.tap.tapcardformkit.open.web_wrapper.TapCardConfiguration
import company.tap.tapcardformkit.open.web_wrapper.TapCardKit

class CardSdkReactNativeViewManager : SimpleViewManager<View>() {
  val GENERATE_TOKEN = 3

  lateinit var customView: TapCardKit
  override fun getName() = "CardSdkReactNativeView"

  override fun createViewInstance(reactContext: ThemedReactContext): View {
    // init view
    // add as subview
     var testView = LayoutInflater.from(reactContext).inflate(R.layout.cardview, null)
    customView = testView.findViewById(R.id.tapCardForm)
    Log.e("configTest", "render")
    return testView
  }


  override fun getCommandsMap(): MutableMap<String, Int>? {
        return MapBuilder.of(
      "generateToken",
          GENERATE_TOKEN
    );
  }


  override fun receiveCommand(root: View, commandId: Int, args: ReadableArray?) {
    Log.e("configTest","receiveCommand")
    if( commandId == GENERATE_TOKEN) {
      customView.generateTapToken()
    }
  }


  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any>? {
    return MapBuilder.builder<String, Any>()
    .put("onHeightChange", MapBuilder.of("registrationName", "onHeightChange"))
    .put("onSuccess", MapBuilder.of("registrationName", "onSuccess"))
    .put("onReadyCallback", MapBuilder.of("registrationName", "onReadyCallback"))
    .put("onFocusCallback", MapBuilder.of("registrationName", "onFocusCallback"))
    .put("onBinIdentification", MapBuilder.of("registrationName", "onBinIdentification"))
    .put("onInvalidInput", MapBuilder.of("registrationName", "onInvalidInput"))
    .put("onError", MapBuilder.of("registrationName", "onError"))
    .put("onChangeSaveCard", MapBuilder.of("registrationName", "onChangeSaveCard"))
    .build()
  }
  @ReactProp(name = "config")
  fun setConfig(view: View, config: ReadableMap) {
    print(config.toString())
    initializeFirebase(view.context.getApplicationContext());

    val configMap = config.toHashMap().filterValues { it != null } as HashMap<String, Any>
    TapCardConfiguration.configureWithTapCardDictionaryConfiguration(view.context, customView ,configMap, object : TapCardStatusDelegate{

      override fun onHeightChange(heightChange: String) {
//        view.layoutParams.height = 95
//        var webview = customView.webViewFrame.findViewById<WebView>(R.id.webview)
//        webview.layoutParams.height = 95
//
//        Log.e("configTest webview",webview.height.toString())
//
//        val newHeight =95
//        val params: ViewGroup.LayoutParams? = customView.webViewFrame.layoutParams
//        params?.height = customView.webViewFrame.context.getDimensionsInDp(newHeight?.toInt() ?: 95)
//        webview.layoutParams = params

//        Log.e("configTest webview",webview.height.toString())

        Log.e("configTest",heightChange.toString())
        val event = Arguments.createMap().apply {
          putInt("data", heightChange.toInt())
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onHeightChange", event)
      }

      override fun onBindIdentification(data: String) {
        val event = Arguments.createMap().apply {
          putString("data", data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onBinIdentification", event)
        Log.e("configTest", data)
      }

      override fun onCardError(error: String) {
        val event = Arguments.createMap().apply {
          putString("data", error)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onError", event)
        Log.e("configTest", error)
      }

      override fun onCardFocus() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onFocusCallback", event)
        Log.e("configTest", "onFocus")
      }

      override fun onCardReady() {
        val event = Arguments.createMap().apply {
          putString("data","")
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onReadyCallback", event)
        Log.e("configTest", "onReady")
      }

      override fun onCardSuccess(data: String) {
        val event = Arguments.createMap().apply {
          putString("data",data)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onSuccess", event)
        Log.e("configTest", data)
      }

      override fun onValidInput(isValid: String) {
        Log.e("configTest", isValid)
        val event = Arguments.createMap().apply {
          putBoolean("data",!isValid.toBoolean())
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onInvalidInput", event)
//        customView.generateTapToken()
      }

      override fun onChangeSaveCard(enabled: Boolean) {
        Log.e("configTest", enabled.toString())
        val event = Arguments.createMap().apply {
          putBoolean("data",enabled)
        }
        val reactContext = view.context as ReactContext
        reactContext
          .getJSModule(RCTEventEmitter::class.java)
          .receiveEvent(view.id, "onChangeSaveCard", event)
//        customView.generateTapToken()
      }

    })
//    customView.init()
//    view.setBackgroundColor(Color.parseColor(color))
  }
  private fun initializeFirebase(context: Context) {
    try {
      if (FirebaseApp.getApps(context).isEmpty()) {
        val options = FirebaseOptions.Builder()
          .setApiKey("AIzaSyDHnW6NQ3bifZsmzGdyVLd2t6f8U1lSqlE")
          .setApplicationId("com.example.tapcardwebsdk")
          .setProjectId("your-project-id")
          .build()
        FirebaseApp.initializeApp(context, options)
        println("Firebase initialized manually")
      }
    } catch (e: Exception) {
      System.err.println("Error initializing Firebase: " + e.message)
    }
  }
}
