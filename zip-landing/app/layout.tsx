import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { TutorialProvider } from './components/tutorial/TutorialContext';
import FixedTutorialSystem from './components/tutorial/FixedTutorialOverlay';

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "ZIP ON PLASMA - Zero-fee tips for the decentralized social web",
  description: "Zero-fee stablecoin tipping platform for Twitter/X. Join the decentralized social web with ZIP on Plasma.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} font-sans antialiased`}
        suppressHydrationWarning={true}
      >
        <TutorialProvider>
          {children}
          <FixedTutorialSystem />
        </TutorialProvider>
      </body>
    </html>
  );
}
