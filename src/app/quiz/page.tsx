import { QuizClient } from '@/components/quiz/QuizClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Bilgi Yarışması | Vildan Koleji',
  description: 'Vildan Koleji - Bilginizi ölçün ve ödüller kazanın!',
};

export default function QuizPage() {
  return (
    // Suspense boundary could be added here if QuizClient fetched data server-side initially
    // For now, QuizClient handles its own loading state for teacherName.
    <QuizClient />
  );
}
