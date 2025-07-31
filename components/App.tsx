"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Pin } from "lucide-react";
import sdk, { Context } from "@farcaster/miniapp-sdk";

export default function App() {
  const [hasGMedToday, setHasGMedToday] = useState(false);
  const [appContext, setAppContext] = useState<Context.MiniAppContext>();

  useEffect(() => {
    async function setupThings() {
      const context = await sdk.context;
      if (context) {
        setAppContext(context);
      }

      // NOTICE: get app ready IMPORTANT
      sdk.actions.ready();
    }

    setupThings();
  }, []);
  const handleSayGM = () => {
    setHasGMedToday(true);
    // TODO: Here you would integrate with Farcaster API to post the GM cast
  };

  const handleAddMiniApp = () => {
    // TODO: Here you would integrate with Farcaster API to add a new MiniApp
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 max-w-sm mx-auto">
      {/* Profile Picture */}
      <div className="mb-8">
        <Avatar className="w-20 h-20 border-2 border-gray-100">
          <AvatarImage src={appContext?.user?.pfpUrl} alt="Profile" />
          <AvatarFallback className="text-xl font-bold bg-gray-50">
            {appContext?.user?.username?.charAt(0)?.toUpperCase() ?? ""}
          </AvatarFallback>
        </Avatar>
      </div>

      {/* Greeting */}
      <div className="mb-12 text-center">
        <h1 className="text-2xl font-bold text-black font-sans">
          gm, @{appContext?.user?.username} 👋
        </h1>
      </div>

      {/* GM Button */}
      <div className="mb-8 w-full">
        <Button
          onClick={handleSayGM}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-orange-300 via-orange-200 to-pink-200 hover:from-orange-400 hover:via-orange-300 hover:to-pink-300 text-black border-0 shadow-lg transition-all duration-200 hover:shadow-xl"
          disabled={hasGMedToday}
        >
          Say GM 🌅
        </Button>
      </div>

      {/* Status Message */}
      <div className="mb-12 text-center">
        <p className="text-sm text-gray-600">
          {hasGMedToday ? (
            <span className="flex items-center justify-center gap-1">
              ✅ You already said GM today
            </span>
          ) : (
            <span className="flex items-center justify-center gap-1">
              ❌ Don't forget to GM your frens
            </span>
          )}
        </p>
      </div>

      {/* Pin Button */}
      <div className="mt-auto">
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700 text-xs font-medium rounded-full px-4 py-2 hover:bg-gray-50"
          onClick={handleAddMiniApp}
        >
          <Pin className="w-3 h-3 mr-1" />
          Pin this MiniApp
        </Button>
      </div>
    </div>
  );
}
