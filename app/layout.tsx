import "@mantine/core/styles.css";
import "./globals.css";

import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core";
import { theme } from "./theme";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
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
      {...mantineHtmlProps}
      className={`${fraunces.variable} ${inter.variable}`}
    >
      <head>
        <ColorSchemeScript defaultColorScheme="light" />
      </head>
      <body>
        <MantineProvider
          theme={theme}
          defaultColorScheme="light"
          forceColorScheme="light"
        >
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
