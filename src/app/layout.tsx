import type { Metadata } from "next";
import "./globals.css";

import ScrollRestorationFix from "@/components/ScrollRestorationFix";
import GlobalLogiCopilot from "@/components/GlobalLogiCopilot";

export const metadata: Metadata = {
  title: "First Logic Meta Lab",
  description: "Building highly scalable, unbreakable software architectures.",
  icons: {
    icon: "/FLML-01.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="stylesheet" href={`/instruments.css?v=${Date.now()}`} />
      </head>
      <body className="antialiased min-h-full flex flex-col font-sans bg-black text-white selection:bg-white selection:text-black">
        <ScrollRestorationFix />
        <main className="flex-grow bg-black">
          {children}
        </main>
        {/* Global Logi Site-Wide AI Copilot */}
        <GlobalLogiCopilot />
      </body>
    </html>
  );
}
