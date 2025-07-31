# gm-gm 🌅

A demo Farcaster miniapp that helps you say "gm" (good morning) to your friends on Farcaster with style!

## 🎯 About

**gm-gm** is a Farcaster miniapp that demonstrates the core features and best practices for building engaging miniapps on the Farcaster protocol. It showcases user authentication, context awareness, and seamless integration with the Farcaster ecosystem.

## ✨ Features

### 🟢 Core Features (Demo & v1)

#### 1. **User Greeting**
- Pulls Farcaster context: `fid`, `username`, `pfpUrl`
- Displays personalized greeting: `"gm, @username 👋"`
- Shows user's profile picture for visual recognition

#### 2. **"Say GM" Button**
- Large primary button: `Say GM 🌅`
- Triggers cast composition with pre-filled text: `"gm 🌅 from a MiniApp"`
- Provides feedback with toast/message after successful cast

#### 3. **Daily Reminder Logic**
- Soft-check for whether user has already said GM today
- Conditional UI display:
  - ✅ "You've already said GM today"
  - ❌ "Don't forget to GM your frens"

#### 4. **Bookmark Button**
- `📌 Pin this MiniApp` functionality
- Uses `sdk.actions.addFrame()` for easy app saving
- Allows users to quickly access the app later

#### 5. **Profile Viewer**
- Secondary action for viewing user profiles
- Uses `sdk.actions.viewProfile(fid)` for social context
- Enhances user discovery and engagement

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Vercel account (for deployment)
- Neynar API key (optional, for enhanced features)

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd gm-gm
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Test in Warpcast**
   - The dev script will provide a tunnel URL
   - Use the Warpcast Mini App Developer Tools: https://warpcast.com/~/developers
   - Enter your tunnel URL to preview the miniapp

## 🛠️ Configuration

### Environment Variables

Create a `.env.local` file in the root directory:

```env
# Required
NEXT_PUBLIC_URL=https://your-app-url.vercel.app
NEXT_PUBLIC_MINI_APP_NAME=gm-gm
NEXT_PUBLIC_MINI_APP_BUTTON_TEXT=Say GM

# Optional - Neynar Integration
NEYNAR_API_KEY=your_neynar_api_key
NEYNAR_CLIENT_ID=your_client_id

# Optional - Sign In With Neynar (SIWN)
SEED_PHRASE=your_seed_phrase
SPONSOR_SIGNER=true
NEXTAUTH_SECRET=your_nextauth_secret
```

## 📚 Resources

- [Farcaster Miniapp Documentation](https://docs.farcaster.xyz/)
- [Warpcast Developer Tools](https://warpcast.com/~/developers)
- [Neynar API Docs](https://docs.neynar.com/)
- [Next.js Documentation](https://nextjs.org/docs)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- Join the Farcaster developer community
- Check the [Farcaster documentation](https://docs.farcaster.xyz/)
- Review example miniapps for best practices

---

**Happy GM-ing! 🌅**

*Built with ❤️ for a Demo*
