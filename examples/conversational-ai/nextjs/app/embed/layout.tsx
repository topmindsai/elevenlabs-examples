import '../globals.css';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Using a specific class for the widget embedded view to avoid hydration mismatch
  return (
    <html lang="en" className="h-full w-full">
      <body className={`${inter.className} w-full h-full`}>
        {children}
      </body>
    </html>
  );
} 