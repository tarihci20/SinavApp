'use client'; // Required for useSearchParams

import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { PrizeWonDisplay } from '@/components/quiz/PrizeWonDisplay';
import { FeedbackForm } from '@/components/feedback/FeedbackForm';
import { getPrizeForScore } from '@/lib/questions';
import { Home, RotateCcw } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

function ResultsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const teacherName = searchParams.get('teacherName');
  const scoreString = searchParams.get('score');
  const score = scoreString ? parseInt(scoreString, 10) : null;

  if (!teacherName || score === null || isNaN(score)) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-semibold mb-4 text-destructive">Sonuçlar Görüntülenemiyor</h1>
        <p className="text-muted-foreground mb-6">Gerekli bilgiler eksik. Lütfen sınavı tekrar başlatın.</p>
        <Button onClick={() => router.push('/')} variant="outline">
          <Home className="mr-2 h-4 w-4" /> Ana Sayfaya Dön
        </Button>
      </div>
    );
  }

  const prize = getPrizeForScore(score);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <PrizeWonDisplay teacherName={teacherName} score={score} prize={prize} />
      <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Button onClick={() => router.push(`/quiz?teacherName=${encodeURIComponent(teacherName)}`)} className="flex-1 text-lg py-3" variant="outline">
          <RotateCcw className="mr-2 h-5 w-5" /> Tekrar Dene
        </Button>
        <Button onClick={() => router.push('/')} className="flex-1 text-lg py-3">
          <Home className="mr-2 h-5 w-5" /> Ana Sayfaya Dön
        </Button>
      </div>
      <Separator className="my-8 md:my-12 max-w-md" />
      <FeedbackForm teacherName={teacherName} />
    </div>
  );
}

export default function ResultsPage() {
  return (
    <Suspense fallback={<ResultsSkeleton />}>
      <ResultsContent />
    </Suspense>
  );
}

function ResultsSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
      <div className="w-full max-w-md mx-auto text-center">
        <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
        <Skeleton className="h-8 w-3/4 mx-auto mb-2" />
        <Skeleton className="h-6 w-1/2 mx-auto mb-6" />
        
        <Skeleton className="h-6 w-1/3 mx-auto mb-2" />
        <Skeleton className="h-48 w-full max-w-xs mx-auto rounded-lg my-4" />
        <Skeleton className="h-4 w-1/4 mx-auto" />
      </div>
       <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full max-w-md">
        <Skeleton className="h-12 flex-1" />
        <Skeleton className="h-12 flex-1" />
      </div>
      <Separator className="my-8 md:my-12 max-w-md" />
      <div className="w-full max-w-md">
        <Skeleton className="h-10 w-1/2 mb-2" />
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-24 w-full mb-4" />
        <Skeleton className="h-12 w-full" />
      </div>
    </div>
  );
}
