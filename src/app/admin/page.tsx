import { AdminClient } from '@/components/admin/AdminClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Admin Paneli | SınavMaster',
  description: 'SınavMaster - Sınav sonuçlarını ve ödülleri yönetin.',
};

export default function AdminPage() {
  return <AdminClient />;
}
