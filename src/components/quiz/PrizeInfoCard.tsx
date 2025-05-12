import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { Prize } from '@/lib/types';
import { Gift } from 'lucide-react';

interface PrizeInfoCardProps {
  prize: Prize;
}

export function PrizeInfoCard({ prize }: PrizeInfoCardProps) {
  return (
    <Card className="w-full shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Gift className="h-8 w-8 text-primary" />
        <div>
          <CardTitle className="text-xl">{prize.name}</CardTitle>
          <CardDescription className="text-primary font-semibold">{prize.condition}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md">
          <Image
            src={prize.imageSrc}
            alt={prize.name}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-105"
            data-ai-hint={prize.imageHint}
          />
        </div>
      </CardContent>
    </Card>
  );
}
