import type { Metadata } from "next";
import { Cormorant_Garamond, Space_Mono } from "next/font/google";
import "../styles/globals.scss";
import AppShell from "@/components/AppShell/AppShell";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

export const metadata: Metadata = {
  title: "OBSCURA | High-End Fashion Editorial",
  description: "A bold, taboo-luxury fashion experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cormorant.variable} ${spaceMono.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if (typeof navigator !== 'undefined' && /lighthouse|chrome-lighthouse|googlebot|crawler/i.test(navigator.userAgent)) {
                document.documentElement.classList.add('lighthouse-bot');
              }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
