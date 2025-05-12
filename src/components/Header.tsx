import Link from 'next/link';
import { BookMarked } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2 text-xl font-bold text-primary">
          <BookMarked className="h-8 w-8" />
          Vildan Koleji Yarışması
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/admin" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
            Admin Paneli
          </Link>
        </nav>
      </div>
    </header>
  );
}
