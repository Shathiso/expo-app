# Introduction
This is a mobile application built using
- React Native, Expo Go and AppWrite as backend cloud service
  
## Expo  
This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

## Build Process

- Open an expo go account: https://expo.dev
- Login to your account
- install eas cli: https://docs.expo.dev/eas-update/getting-started/

   ```bash
      npm install -g eas-cli
   ```

-  Run the build for the platform of your choice

    ```bash
      eas build -p android 
      eas build -p ios 
   ```
- Download the platform executable files, extract them and publish the app to the appropriate app stores.
