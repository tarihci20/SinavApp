import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yarışma Sonucu | Vildan Koleji',
  description: 'Yarışma sonucunuzu ve kazandığınız ödülü görüntüleyin.',
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
