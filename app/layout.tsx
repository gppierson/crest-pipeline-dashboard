import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/Sidebar';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });

export const metadata: Metadata = {
  title: 'Crest Pipeline Dashboard',
  description: 'Track your real estate sales pipeline',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans bg-background text-foreground overflow-hidden`}>
        <div className="flex h-screen w-full">
          <Sidebar />
          <main className="flex-1 flex flex-col min-w-0 overflow-hidden bg-background/50 relative">
            {/* Background Gradients/Glows */}
            <div className="absolute top-0 left-0 w-full h-[500px] bg-primary/10 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 opacity-50" />
            <div className="absolute bottom-0 right-0 w-full h-[500px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none translate-y-1/2 opacity-50" />

            <div className="flex-1 overflow-y-auto scroll-smooth">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
