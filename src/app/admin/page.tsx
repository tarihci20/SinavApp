import { AdminClient } from '@/components/admin/AdminClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Paneli | Vildan Koleji Bilgi Yarışması',
  description: 'Vildan Koleji Bilgi Yarışması - Sınav sonuçlarını ve ödülleri yönetin.',
};

export default function AdminPage() {
  return <AdminClient />;
}
