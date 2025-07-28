# Reactoria iOS App Development Guide

## Quick Start

### Prerequisites
- macOS with Xcode 14+ installed
- iOS Simulator or physical iOS device
- CocoaPods installed: `sudo gem install cocoapods`

### Development Workflow

1. **Build and Sync**
   ```bash
   npm run build          
   npx cap sync ios       
   ```

2. **Open in Xcode**
   ```bash
   npm run ios            
   ```

3. **Run on Simulator/Device**
   - In Xcode, select your target device
   - Click the Play button or press Cmd+R

### Available Scripts

- `npm run ios` - Build, sync, and open in Xcode
- `npm run ios:build` - Build and sync only
- `npm run ios:run` - Run on iOS simulator
- `npm run ios:serve` - Run with live reload

## iOS-Specific Features

### Mobile Optimizations
- Touch-friendly buttons (44px minimum)
- iOS-safe area support
- Smooth scrolling with `-webkit-overflow-scrolling: touch`
- Prevent zoom on input focus
- Native iOS styling with backdrop filters

### App Configuration
- App Name: "Reactoria"
- Bundle ID: `com.reactoria.app`
- iOS Deployment Target: 14.0+

## Troubleshooting

### Common Issues

1. **Build fails**
   - Clean Xcode build folder (Product → Clean Build Folder)
   - Delete derived data (Xcode → Preferences → Locations → Derived Data → Delete)
   - Run `npx cap sync ios` again

2. **Simulator not working**
   - Reset simulator (Device → Erase All Content and Settings)
   - Check Xcode → Window → Devices and Simulators

3. **Live reload not working**
   - Ensure you're using `npm run ios:serve`
   - Check that your device/simulator is on the same network

### Debugging
- Use Safari Web Inspector for iOS Simulator
- Use Xcode console for native logs
- Check Capacitor logs in Xcode console

## Deployment

### App Store Preparation
1. Update version in `package.json`
2. Update build number in Xcode
3. Configure signing with your Apple Developer account
4. Archive and upload to App Store Connect

### TestFlight
1. Archive the app in Xcode
2. Upload to App Store Connect
3. Add testers in TestFlight

## File Structure

```
reacttoria/
├── ios/                   
│   └── App/               
│       ├── App.xcodeproj/ 
│       ├── App/           
│       │   ├── AppDelegate.swift
│       │   ├── Info.plist
│       │   └── Assets.xcassets/
│       └── Podfile        
├── src/                  
├── public/                
└── capacitor.config.ts    
```

## Tips for iOS Development

1. **Performance**
   - Use `React.memo()` for expensive components
   - Implement lazy loading for large lists
   - Optimize images for mobile

2. **User Experience**
   - Follow iOS Human Interface Guidelines
   - Use native iOS gestures
   - Implement proper loading states

3. **Testing**
   - Test on multiple device sizes
   - Test in different orientations
   - Test with different iOS versions

## Resources

- [Capacitor Documentation](https://capacitorjs.com/docs)
- [iOS Human Interface Guidelines](https://developer.apple.com/design/human-interface-guidelines/)
- [React Native iOS Development](https://reactnative.dev/docs/platform-specific-code#ios-specific-code) 