'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PrizeInfoCard } from '@/components/quiz/PrizeInfoCard';
import { prizes as prizeList } from '@/lib/questions';
import { AlertCircle, ArrowRight, Info, User, Trophy } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function HomePage() {
  const [teacherName, setTeacherName] = useState('');
  const router = useRouter();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teacherName.trim()) {
      toast({
        title: "Hata",
        description: "Lütfen adınızı ve soyadınızı giriniz.",
        variant: "destructive",
      });
      return;
    }
    router.push(`/quiz?teacherName=${encodeURIComponent(teacherName.trim())}`);
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <section className="text-center pt-8 md:pt-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 text-primary">
          Vildan Koleji Ortaokulu Bilgi Yarışması'na Hoş Geldiniz!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Bilginizi ölçün, eğlenin ve harika ödüller kazanın! Yarışmamız 20 sorudan oluşmakta ve her soru için 30 saniye süreniz bulunmaktadır.
        </p>
      </section>

      <Card className="w-full max-w-md mx-auto shadow-xl bg-card border border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2 text-card-foreground">
            <User className="h-6 w-6 text-primary" />
            Öğretmen Bilgileri
          </CardTitle>
          <CardDescription>Lütfen yarışmaya başlamadan önce adınızı ve soyadınızı giriniz.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teacherName" className="text-base font-medium">Ad Soyad</Label>
              <Input
                id="teacherName"
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Örn: Ayşe Yılmaz"
                required
                className="text-base py-2.5"
              />
            </div>
            <Button type="submit" className="w-full text-lg py-3 bg-primary hover:bg-primary/90 text-primary-foreground">
              Yarışmaya Başla <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <section>
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-3 text-foreground">
          <Trophy className="h-8 w-8 text-primary" />
          Yarışma Kuralları ve Ödüller
        </h2>
        <div className="bg-accent/70 p-6 rounded-lg mb-8 shadow-md border border-border">
            <p className="text-center text-accent-foreground text-lg">
                Yarışmada toplam <strong>20 soru</strong> bulunmaktadır. Her soru için <strong>30 saniye</strong> cevaplama süreniz vardır. Başarılar dileriz!
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {prizeList.map((prize) => (
            <PrizeInfoCard key={prize.id} prize={prize} />
          ))}
        </div>
      </section>
    </div>
  );
}
