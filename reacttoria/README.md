# Reactoria - MLB Stats App

A React-based web application for viewing MLB team statistics and standings, now available as an iPhone app!

## Features

- View MLB team standings
- Browse team rosters
- Check recent games
- Responsive design for mobile and desktop
- Native iOS app support

## Development

### Web App
```bash
npm start          
npm run build      
npm run deploy     

### iOS App
```bash
npm run ios       
npm run ios:build  
npm run ios:run    
npm run ios:serve  
```

## iOS App Setup

### Prerequisites
- macOS with Xcode installed
- iOS Simulator or physical iOS device
- CocoaPods installed (`sudo gem install cocoapods`)

### Building for iOS
1. Build the React app: `npm run build`
2. Sync with iOS: `npm run ios:build`
3. Open in Xcode: `npm run ios`
4. Select your target device/simulator
5. Build and run!

### Running on Device
1. Connect your iPhone via USB
2. Open Xcode and select your device
3. Sign the app with your Apple Developer account
4. Build and run

## Project Structure

```
reacttoria/
├── src/                   
│   ├── components/         
│   ├── pages/             
│   └── App.js            
├── ios/                   
│   └── App/              
├── public/               
└── capacitor.config.ts   
```

## Technologies Used

- React 19
- React Router DOM
- Bootstrap 5
- Capacitor (iOS)
- MLB Stats API

## API

This app uses the official MLB Stats API to fetch:
- Team standings
- Team rosters
- Recent games
- Team information

## License

MIT License
