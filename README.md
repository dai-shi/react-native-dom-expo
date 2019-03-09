# react-native-dom-expo
A patch library to make Expo work with react-native-dom

## Motivation
It's exciting to see [react-native-dom](https://github.com/vincentriemer/react-native-dom). What if we can use it with Expo with the simplest possible steps.

This is a newly born project driven by the community
to fill in the missing pieces to make Expo work with react-native-dom.
If you are interested in contributing, please jump in.

## How to run
```bash
npx expo-cli init -t tabs --name expo-rndom --non-interactive expo-rndom
cd expo-rndom
npm install react-native-dom react-native-dom-expo
npx init-rndom-expo
npm run rndom
```

Then, open <http://localhost:8081/dom/> in your browser.

## Status

- Mostly working :point_right: :white_check_mark:
- Partially working :point_right: :ballot_box_with_check:
- Some implemented :point_right: :heavy_check_mark:
- Hacked :point_right: :radio_button:
- Not applicable :point_right: :black_medium_square:

### Environment
- :white_check_mark: Dev
- :white_medium_square: Build

### Expo API
- :black_medium_square: AR
- :white_medium_square: Accelerometer
- :white_medium_square: Admob
- :white_medium_square: Amplitude
- :white_medium_square: AppAuth
- :white_check_mark: AppLoading
- :white_medium_square: ART
- :ballot_box_with_check: Asset
- :white_medium_square: Audio
- :white_medium_square: AuthSession
- :white_medium_square: AV
- :white_medium_square: BackgroundFetch
- :white_medium_square: BarCodeScanner
- :white_medium_square: Barometer
- :white_check_mark: BlurView
- :white_medium_square: Branch
- :white_medium_square: Brightness
- :white_medium_square: Calendar
- :white_medium_square: Camera
- :heavy_check_mark: Constants
- :white_medium_square: Contacts
- :white_medium_square: DeviceMotion
- :white_medium_square: DocumentPicker
- :white_medium_square: ErrorRecovery
- :radio_button: FacebookAds
- :white_medium_square: Facebook
- :white_medium_square: FaceDetector
- :radio_button: FileSystem
- :white_check_mark: Font
- :ballot_box_with_check: GestureHandler
- :white_medium_square: GLView
- :white_medium_square: GoogleSignIn
- :white_medium_square: Google
- :white_medium_square: Gyroscope
- :white_medium_square: Haptic
- :white_medium_square: Haptics
- :white_medium_square: ImageManipulator
- :white_medium_square: ImagePicker
- :white_medium_square: IntentLauncherAndroid
- :white_medium_square: Overview
- :white_medium_square: KeepAwake
- :white_check_mark: LinearGradient
- :white_medium_square: Linking
- :white_medium_square: LocalAuthentication
- :white_medium_square: Localization
- :white_medium_square: Location
- :white_medium_square: Lottie
- :white_medium_square: Magnetometer
- :white_medium_square: MailComposer
- :white_medium_square: MapView
- :white_medium_square: MediaLibrary
- :radio_button: Notifications
- :white_medium_square: Payments
- :white_medium_square: Pedometer
- :white_medium_square: Permissions
- :white_medium_square: Print
- :white_medium_square: registerRootComponent
- :white_medium_square: ScreenOrientation
- :radio_button: SecureStore
- :white_medium_square: Segment
- :white_medium_square: Sensors
- :white_medium_square: SMS
- :radio_button: Speech
- :white_check_mark: SplashScreen
- :white_medium_square: SQLite
- :white_medium_square: StoreReview
- :white_medium_square: Svg
- :white_medium_square: takeSnapshotAsync
- :white_medium_square: TaskManager
- :white_medium_square: Updates
- :white_medium_square: Video
- :heavy_check_mark: WebBrowser
