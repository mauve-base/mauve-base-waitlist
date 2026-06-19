import "./globals.css";

import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { Provider } from "./provider";

// Display: Space Grotesk (geometric sans). Body: Inter.
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mauve Base — Reach businesses the moment they're ready to buy",
  description:
    "Mauve Base turns real buying signals and trusted vendor relationships into warm introductions, so your outreach starts with a yes. Request early access.",
  openGraph: {
    title: "Mauve Base — Reach businesses the moment they're ready to buy",
    description:
      "Ground-level market intelligence for vendors selling into small businesses. Request early access.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body suppressHydrationWarning>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
