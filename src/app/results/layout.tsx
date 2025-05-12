import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Sınav Sonucu | SınavMaster',
  description: 'Sınav sonucunuzu ve kazandığınız ödülü görüntüleyin.',
};

export default function ResultsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
