'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PrizeInfoCard } from '@/components/quiz/PrizeInfoCard';
import { prizes as prizeList } from '@/lib/questions'; // Renamed to avoid conflict
import { AlertCircle, ArrowRight, Info, User } from 'lucide-react';
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
    <div className="container mx-auto px-4 py-8 md:py-12">
      <section className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Vildan Koleji Ortaokulu Bilgi Yarışması'na Hoş Geldiniz!
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Bilginizi ölçün, eğlenin ve harika ödüller kazanın! Yarışmamız 20 sorudan oluşmakta ve her soru için 30 saniye süreniz bulunmaktadır.
        </p>
      </section>

      <Card className="w-full max-w-md mx-auto mb-12 shadow-xl bg-card">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center gap-2">
            <User className="h-6 w-6 text-primary" />
            Öğretmen Bilgileri
          </CardTitle>
          <CardDescription>Lütfen yarışmaya başlamadan önce adınızı ve soyadınızı giriniz.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="teacherName" className="text-base">Ad Soyad</Label>
              <Input
                id="teacherName"
                type="text"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Örn: Ayşe Yılmaz"
                required
                className="text-base"
              />
            </div>
            <Button type="submit" className="w-full text-lg py-3">
              Yarışmaya Başla <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </form>
        </CardContent>
      </Card>
      
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center gap-2">
          <Info className="h-8 w-8 text-primary" />
          Yarışma Kuralları ve Ödüller
        </h2>
        <div className="bg-accent/50 p-6 rounded-lg mb-8 shadow">
            <p className="text-center text-muted-foreground text-lg">
                Yarışmada toplam <strong>20 soru</strong> bulunmaktadır. Her soru için <strong>30 saniye</strong> cevaplama süreniz vardır. Başarılar dileriz!
            </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {prizeList.map((prize) => (
            <PrizeInfoCard key={prize.id} prize={prize} />
          ))}
        </div>
      </section>
    </div>
  );
}
