import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { Prize } from '@/lib/types';
import { Award } from 'lucide-react';

interface PrizeWonDisplayProps {
  prize?: Prize; // Prize can be undefined if no prize is won or score is somehow invalid
  teacherName: string;
  score: number;
}

export function PrizeWonDisplay({ prize, teacherName, score }: PrizeWonDisplayProps) {
  return (
    <Card className="w-full max-w-md mx-auto text-center shadow-xl">
      <CardHeader>
        <Award className="h-16 w-16 text-primary mx-auto mb-4" />
        <CardTitle className="text-3xl font-bold">Tebrikler, {teacherName}!</CardTitle>
        <CardDescription className="text-xl text-muted-foreground">
          Sınav Puanınız: <span className="font-bold text-primary">{score}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {prize ? (
          <>
            <h3 className="text-2xl font-semibold mb-2 text-accent-foreground">{prize.name} Kazandınız!</h3>
            <div className="relative aspect-[3/2] w-full max-w-xs mx-auto overflow-hidden rounded-lg shadow-md my-4">
              <Image
                src={prize.imageSrc}
                alt={prize.name}
                layout="fill"
                objectFit="contain" // Use contain to ensure full image is visible
                data-ai-hint={prize.imageHint}
              />
            </div>
            <p className="text-muted-foreground">{prize.condition}</p>
          </>
        ) : (
          <p className="text-xl text-muted-foreground mt-4">
            Bu puanla bir ödül kazanamadınız. Bir dahaki sefere bol şans!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
