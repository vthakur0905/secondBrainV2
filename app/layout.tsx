import type { Metadata } from "next";
import { Geist, Geist_Mono, Bebas_Neue, Goldman} from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const goldmanFont = Goldman({
  variable: "--font-goldman",
  subsets: ["latin"],
  weight : '400'
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400", // Only one weight available
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Second Brain",
  description: "Capture ideas, manage tasks, and organize knowledge.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable}  ${geistMono.variable} ${geistSans.variable} ${goldmanFont.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
