# EventPlanner App

A cross-platform event planning app built with React Native and Expo. Plan your perfect event in 5 minutes and connect with curated vendors.

## Features

- 🎉 Quick event planning (5-minute flow)
- 📱 Native apps for iOS, Android, and Web
- 🏛️ Multiple event types (Birthday, Wedding, Corporate, etc.)
- 👥 Curated vendor marketplace
- 💰 Budget tracking
- 📊 Event summary and management

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```bash
cd client
npm install
```

### Running the App

```bash
# Start Expo development server
npm start

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web
```

## Project Structure

```
client/
├── App.tsx                 # Main app entry with navigation
├── src/
│   └── screens/
│       ├── HomeScreen.tsx              # Landing page
│       ├── EventTypeScreen.tsx         # Event type selection
│       ├── EventDetailsScreen.tsx      # Event details form
│       ├── VendorSelectionScreen.tsx   # Vendor marketplace
│       ├── SummaryScreen.tsx           # Event summary
│       ├── MyEventsScreen.tsx          # User's events list
│       └── ProfileScreen.tsx           # User profile
├── package.json
└── app.json
```

## Tech Stack

- React Native 0.74
- Expo 51
- React Navigation 6
- TypeScript

## Next Steps

- Add backend integration
- Implement authentication
- Connect real vendor data
- Add payment processing
- Implement real-time chat with vendors
- Add calendar integration
- Push notifications
