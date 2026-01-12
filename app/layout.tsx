import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cho Ventures Ecosystem | AI-Powered Regenerative Empire',
  description: 'An interactive visualization of the Cho Ventures ecosystem - unifying real estate, regenerative living, thought leadership, and philanthropy through AI-powered intelligence.',
  keywords: ['Cho Ventures', 'Tony Cho', 'regenerative development', 'Metro 1', 'ChoZen', 'ecosystem'],
  authors: [{ name: 'Light Brand Consulting' }],
  openGraph: {
    title: 'Cho Ventures Ecosystem',
    description: 'Visualizing the AI-powered regenerative empire',
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} min-h-screen overflow-hidden`}>
        {children}
      </body>
    </html>
  );
}
