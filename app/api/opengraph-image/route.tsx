import { ImageResponse } from "next/og";

export const dynamic = "force-dynamic";

export async function GET() {
  return new ImageResponse(
    (
      <div
        tw="w-full h-full flex flex-col items-center justify-center text-white"
        style={{
          background:
            "linear-gradient(to bottom right, #fcd34d, #f87171, #fb7185)",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <h1 tw="text-8xl font-extrabold drop-shadow-md">Say GM ☀️</h1>
        <p tw="text-4xl mt-6 text-white/90 text-center max-w-3xl">
          Remind your frens to say GM on Farcaster. Start your day right.
        </p>
        <p tw="absolute bottom-12 text-2xl text-white/60">
          say.gm • a farcaster miniapp
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
