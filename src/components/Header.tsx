import Link from 'next/link';
import { BookMarked, GraduationCap } from 'lucide-react'; // Added GraduationCap for a more "kolej" feel

export function Header() {
  return (
    <header className="border-b bg-card shadow-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-3 text-2xl font-bold text-primary hover:opacity-90 transition-opacity">
          <GraduationCap className="h-9 w-9" />
          <span className="hidden sm:inline">Vildan Koleji Bilgi Yarışması</span>
          <span className="sm:hidden">Vildan Koleji</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5">
          <Link href="/" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
            Ana Sayfa
          </Link>
          <Link href="/admin" className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
