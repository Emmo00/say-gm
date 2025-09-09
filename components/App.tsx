"use client";

import { useState, useEffect } from "react";
import { Button } from "./ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Pin, Share } from "lucide-react";
import sdk, { Context } from "@farcaster/miniapp-sdk";
import { GM_NFT_ABI, GM_NFT_CONTRACT_ADDRESS } from "../lib/constants";
import { useWriteContract } from "wagmi";
import { base } from "viem/chains";
import { useAccount, useConnect } from "wagmi";
import { readContract } from "@wagmi/core";
import { config } from "./providers/WagmiProvider";

export default function App() {
  const [gmNFTTokenId, setGmNFTTokenId] = useState<string | null>(null);
  const [hasGMedToday, setHasGMedToday] = useState(false);
  const [appContext, setAppContext] = useState<Context.MiniAppContext>();
  const {
    writeContractAsync,
    data: mintTransactionHash,
    isPending: isMinting,
    isError: errorWhileMinting,
    error: mintingError,
  } = useWriteContract({});
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    async function setupThings() {
      const context = await sdk.context;
      if (context) {
        setAppContext(context);
      }

      // NOTICE: get app ready IMPORTANT
      // sdk.actions.ready();
      // sdk.actions.addMiniApp();
    }

    setupThings();
  }, []);

  const fetchGmNFTTokenId = async () => {
    const tokenId = await readContract(config, {
      address: GM_NFT_CONTRACT_ADDRESS,
      abi: GM_NFT_ABI,
      functionName: "tokenOfOwnerByIndex",
      args: [address, 0],
      chainId: base.id,
    });

    setGmNFTTokenId(
      tokenId !== undefined && tokenId !== null ? String(tokenId) : null
    );
  };

  useEffect(() => {
    if (mintTransactionHash) {
      console.log("Mint transaction hash:", mintTransactionHash);
    }
    if (errorWhileMinting) {
      console.error("Error while minting NFT:", mintingError);
    }
  }, [mintTransactionHash, errorWhileMinting]);

  const handleSayGM = async () => {
    setHasGMedToday(true);
    // TODO: Here you would integrate with Farcaster API to post the GM cast
    await sdk.actions.composeCast({
      text: "GM frens! 🌅",
    });
  };

  const handleAddMiniApp = async () => {
    // TODO: Here you would integrate with Farcaster API to add a new MiniApp
    await sdk.actions.addMiniApp();
  };

  const handleShareMiniApp = async () => {
    // TODO: Here you would integrate with Farcaster API to share the MiniApp
    await sdk.actions.composeCast({
      text: `Don't forget to Say GM 🌅`,
      embeds: ["https://say-gm-eta.vercel.app/"],
    });
  };

  const handleMintGMNFT = async () => {
    if (!isConnected) {
      // Prompt user to connect wallet
      connect({ connector: connectors[0] });
      return;
    }

    // switch chain to base if not already
    try {
      await sdk.wallet.ethProvider.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: base.id.toString() }],
      });
    } catch (error) {
      console.error("Failed to switch chain:", error);
      return;
    }

    const resultHash = await writeContractAsync({
      address: GM_NFT_CONTRACT_ADDRESS,
      abi: GM_NFT_ABI,
      functionName: "mintGM",
      chainId: base.id,
      chain: base,
      account: address,
    });

    setTimeout(() => {
      fetchGmNFTTokenId();
    }, 100);

    console.log("Minting GM NFT transaction hash:", resultHash);
  };

  useEffect(() => {
    if (address) {
      // Fetch user's GM NFT token ID

      fetchGmNFTTokenId();
    }
  }, [address]);

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

      <div className="mt-auto flex flex-col items-center gap-4 w-full">
        {/* Mint GM NFT */}
        {gmNFTTokenId ? (
          <a
            href={`https://basescan.org/nft/${GM_NFT_CONTRACT_ADDRESS}/${gmNFTTokenId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full"
          >
            <Button className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 hover:from-blue-400 hover:via-blue-300 hover:to-blue-200 text-black border-0 shadow-lg transition-all duration-200 hover:shadow-xl">
              See GM NFT
            </Button>
          </a>
        ) : (
          <Button
            className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-blue-300 via-blue-200 to-blue-100 hover:from-blue-400 hover:via-blue-300 hover:to-blue-200 text-black border-0 shadow-lg transition-all duration-200 hover:shadow-xl"
            onClick={handleMintGMNFT}
            disabled={isMinting}
          >
            Mint GM NFT
          </Button>
        )}

        {/* Share MiniApp Button */}
        <Button
          onClick={handleShareMiniApp}
          className="w-full h-14 text-lg font-semibold rounded-2xl bg-gradient-to-r from-pink-300 via-orange-200 to-orange-200 hover:from-orange-400 hover:via-orange-300 hover:to-pink-300 text-black border-0 shadow-lg transition-all duration-200 hover:shadow-xl"
        >
          <Share className="w-4 h-4 mr-2 inline-block font-bold" />
          Share MiniApp
        </Button>

        {/* Pin Button */}
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
