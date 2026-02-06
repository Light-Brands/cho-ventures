import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Cho Ventures Ecosystem',
  description: 'Interactive visualization of the Cho Ventures ecosystem',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen font-sans">{children}</body>
    </html>
  );
}
