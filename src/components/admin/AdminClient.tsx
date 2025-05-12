'use client';

import { useState, useEffect } from 'react';
import { Button, buttonVariants } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, TableCaption } from '@/components/ui/table';
import type { QuizResult, TeacherFeedback } from '@/lib/types';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Eye, EyeOff, KeyRound, LogIn, ShieldCheck, Trash2, Users, MessageSquare, Smile, Frown, Meh, Info } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';


const ADMIN_PASSWORD = 'aci2406717';

export function AdminClient() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [quizResults, setQuizResults] = useState<QuizResult[]>([]);
  const [teacherFeedbacks, setTeacherFeedbacks] = useState<TeacherFeedback[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadResults();
      loadFeedbacks();
    }
  }, [isAuthenticated]);
  
  const loadResults = () => {
    try {
      const resultsString = localStorage.getItem('quizResults');
      if (resultsString) {
        const parsedResults: QuizResult[] = JSON.parse(resultsString);
        parsedResults.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setQuizResults(parsedResults);
      } else {
        setQuizResults([]);
      }
    } catch (error) {
      console.error("Failed to load results from localStorage:", error);
      toast({
        title: "Veri Yükleme Hatası",
        description: "Sınav sonuçları yüklenirken bir sorun oluştu.",
        variant: "destructive",
      });
      setQuizResults([]);
    }
  };

  const loadFeedbacks = () => {
    try {
      const feedbacksString = localStorage.getItem('teacherFeedbacks');
      if (feedbacksString) {
        const parsedFeedbacks: TeacherFeedback[] = JSON.parse(feedbacksString);
        parsedFeedbacks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        setTeacherFeedbacks(parsedFeedbacks);
      } else {
        setTeacherFeedbacks([]);
      }
    } catch (error) {
      console.error("Failed to load feedbacks from localStorage:", error);
      toast({
        title: "Veri Yükleme Hatası",
        description: "Geri bildirimler yüklenirken bir sorun oluştu.",
        variant: "destructive",
      });
      setTeacherFeedbacks([]);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Giriş Başarılı",
        description: "Admin paneline hoş geldiniz.",
      });
    } else {
      toast({
        title: "Giriş Başarısız",
        description: "Yanlış şifre. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
      setPassword('');
    }
  };
  
  const handleDeleteResult = (resultId: string) => {
    try {
      const updatedResults = quizResults.filter(result => result.id !== resultId);
      localStorage.setItem('quizResults', JSON.stringify(updatedResults));
      setQuizResults(updatedResults);
      toast({
        title: "Sonuç Silindi",
        description: "Seçili sınav sonucu başarıyla silindi.",
      });
    } catch (error) {
      console.error("Failed to delete result from localStorage:", error);
      toast({
        title: "Silme Hatası",
        description: "Sonuç silinirken bir sorun oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAllResults = () => {
     try {
      localStorage.removeItem('quizResults');
      setQuizResults([]);
      toast({
        title: "Tüm Sonuçlar Silindi",
        description: "Tüm sınav sonuçları başarıyla silindi.",
      });
    } catch (error) {
      console.error("Failed to delete all results from localStorage:", error);
      toast({
        title: "Silme Hatası",
        description: "Sonuçlar silinirken bir sorun oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteFeedback = (feedbackId: string) => {
    try {
      const updatedFeedbacks = teacherFeedbacks.filter(fb => fb.id !== feedbackId);
      localStorage.setItem('teacherFeedbacks', JSON.stringify(updatedFeedbacks));
      setTeacherFeedbacks(updatedFeedbacks);
      toast({
        title: "Geri Bildirim Silindi",
        description: "Seçili geri bildirim başarıyla silindi.",
      });
    } catch (error) {
      console.error("Failed to delete feedback from localStorage:", error);
      toast({
        title: "Silme Hatası",
        description: "Geri bildirim silinirken bir sorun oluştu.",
        variant: "destructive",
      });
    }
  };

  const handleDeleteAllFeedbacks = () => {
     try {
      localStorage.removeItem('teacherFeedbacks');
      setTeacherFeedbacks([]);
      toast({
        title: "Tüm Geri Bildirimler Silindi",
        description: "Tüm geri bildirimler başarıyla silindi.",
      });
    } catch (error) {
      console.error("Failed to delete all feedbacks from localStorage:", error);
      toast({
        title: "Silme Hatası",
        description: "Geri bildirimler silinirken bir sorun oluştu.",
        variant: "destructive",
      });
    }
  };

  const getSentimentIcon = (sentiment: TeacherFeedback['sentiment']) => {
    switch (sentiment) {
      case 'positive': return <Smile className="h-5 w-5 text-green-500" />;
      case 'negative': return <Frown className="h-5 w-5 text-red-500" />;
      case 'neutral': return <Meh className="h-5 w-5 text-yellow-500" />;
      case 'mixed': return <Info className="h-5 w-5 text-blue-500" />; // Or a different icon for mixed
      default: return <Meh className="h-5 w-5 text-gray-500" />;
    }
  };


  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)] p-4">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <KeyRound className="h-6 w-6 text-primary" />
              Admin Girişi
            </CardTitle>
            <CardDescription>Lütfen devam etmek için admin şifresini girin.</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Şifre</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full">
                <LogIn className="mr-2 h-4 w-4" /> Giriş Yap
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold flex items-center justify-center gap-2">
            <ShieldCheck className="h-8 w-8 text-primary" /> Admin Paneli
        </h1>
      </div>

      {/* Quiz Results Section */}
      <section className="mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="h-7 w-7 text-primary" /> Sınav Sonuçları
          </h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={quizResults.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" /> Tüm Sonuçları Sil
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu işlem tüm sınav sonuçlarını kalıcı olarak silecektir. Bu eylem geri alınamaz.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAllResults} className={buttonVariants({variant: "destructive"})}>
                  Evet, Tümünü Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        
        {quizResults.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Henüz kaydedilmiş sınav sonucu bulunmamaktadır.</p>
            </CardContent>
          </Card>
        ) : (
        <Card className="shadow-lg">
          <CardContent className="p-0">
            <Table>
              <TableCaption>Toplam {quizResults.length} sınav sonucu bulunmaktadır.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Öğretmen Adı</TableHead>
                  <TableHead className="text-center">Puan</TableHead>
                  <TableHead>Kazanılan Ödül</TableHead>
                  <TableHead>Tarih</TableHead>
                  <TableHead className="text-right">İşlemler</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizResults.map((result) => (
                  <TableRow key={result.id}>
                    <TableCell className="font-medium">{result.teacherName}</TableCell>
                    <TableCell className="text-center">{result.score}</TableCell>
                    <TableCell>{result.prizeName}</TableCell>
                    <TableCell>{format(new Date(result.date), 'dd MMMM yyyy HH:mm', { locale: tr })}</TableCell>
                    <TableCell className="text-right">
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive-foreground hover:bg-destructive/90">
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Sonucu Sil</span>
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Bu sonucu silmek istediğinizden emin misiniz?</AlertDialogTitle>
                            <AlertDialogDescription>
                              "{result.teacherName}" adlı öğretmenin ({result.score} puan) sonucunu sileceksiniz. Bu işlem geri alınamaz.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>İptal</AlertDialogCancel>
                            <AlertDialogAction onClick={() => handleDeleteResult(result.id)} className={buttonVariants({variant: "destructive"})}>
                              Evet, Sil
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        )}
      </section>

      <Separator className="my-8" />

      {/* Teacher Feedback Section */}
      <section>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <MessageSquare className="h-7 w-7 text-primary" /> Öğretmen Geri Bildirimleri
          </h2>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="sm" disabled={teacherFeedbacks.length === 0}>
                <Trash2 className="mr-2 h-4 w-4" /> Tüm Geri Bildirimleri Sil
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Emin misiniz?</AlertDialogTitle>
                <AlertDialogDescription>
                  Bu işlem tüm öğretmen geri bildirimlerini kalıcı olarak silecektir. Bu eylem geri alınamaz.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>İptal</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteAllFeedbacks} className={buttonVariants({variant: "destructive"})}>
                  Evet, Tümünü Sil
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>

        {teacherFeedbacks.length === 0 ? (
          <Card>
            <CardContent className="pt-6 text-center">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-xl text-muted-foreground">Henüz kaydedilmiş öğretmen geri bildirimi bulunmamaktadır.</p>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg">
            <CardContent className="p-0">
              <Table>
                <TableCaption>Toplam {teacherFeedbacks.length} geri bildirim bulunmaktadır.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[200px]">Öğretmen Adı</TableHead>
                    <TableHead>Geri Bildirim</TableHead>
                    <TableHead className="text-center">Duygu</TableHead>
                    <TableHead>Açıklama</TableHead>
                    <TableHead>Tarih</TableHead>
                    <TableHead className="text-right">İşlemler</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teacherFeedbacks.map((fb) => (
                    <TableRow key={fb.id}>
                      <TableCell className="font-medium align-top">{fb.teacherName}</TableCell>
                      <TableCell className="align-top max-w-xs whitespace-pre-wrap break-words">{fb.feedbackText}</TableCell>
                      <TableCell className="text-center align-top">
                        <div className="flex items-center justify-center gap-1">
                         {getSentimentIcon(fb.sentiment)}
                          <Badge variant={
                            fb.sentiment === 'positive' ? 'default' : 
                            fb.sentiment === 'negative' ? 'destructive' : 
                            'secondary'
                          } className="capitalize">
                            {fb.sentiment}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="align-top max-w-xs whitespace-pre-wrap break-words">{fb.sentimentExplanation || '-'}</TableCell>
                      <TableCell className="align-top">{format(new Date(fb.date), 'dd MMMM yyyy HH:mm', { locale: tr })}</TableCell>
                      <TableCell className="text-right align-top">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive-foreground hover:bg-destructive/90">
                              <Trash2 className="h-4 w-4" />
                              <span className="sr-only">Geri Bildirimi Sil</span>
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Bu geri bildirimi silmek istediğinizden emin misiniz?</AlertDialogTitle>
                              <AlertDialogDescription>
                                "{fb.teacherName}" adlı öğretmenin geri bildirimini sileceksiniz. Bu işlem geri alınamaz.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>İptal</AlertDialogCancel>
                              <AlertDialogAction onClick={() => handleDeleteFeedback(fb.id)} className={buttonVariants({variant: "destructive"})}>
                                Evet, Sil
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </section>
    </div>
  );
}
