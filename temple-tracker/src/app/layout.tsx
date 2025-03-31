import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from './components/navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    template: '%s | Temple Tracker',
    default: 'Temple Tracker',
  },
  description: 'Track your temple attendance and goals',
  icons: {
    icon: '/images/logo.jpg',
    // You can also specify different sizes if needed
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#1c0f0a]`}>
        <Navbar />
        <main>{children}</main> 
      </body>
    </html>
  );
}
