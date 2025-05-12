import type { Metadata } from 'next';
import { Inter } from 'next/font/google'; // Using Inter as a clean sans-serif font
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Header } from '@/components/Header';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans', // Recommended usage for Tailwind with next/font
});

export const metadata: Metadata = {
  title: 'Vildan Koleji Ortaokulu Bilgi Yarışması',
  description: 'Vildan Koleji Ortaokulu öğretmenleri için bilgi yarışması platformu.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={inter.variable}>
      <body className="antialiased flex flex-col min-h-screen bg-background text-foreground">
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          {children}
        </main>
        <Toaster />
        <footer className="py-6 md:px-8 md:py-0 border-t bg-card">
          <div className="container flex flex-col items-center justify-center gap-4 md:h-24 md:flex-row">
            <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
              © {new Date().getFullYear()} Vildan Koleji Ortaokulu. Tüm hakları saklıdır.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
