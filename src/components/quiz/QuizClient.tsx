'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { questions as allQuestions, getPrizeForScore } from '@/lib/questions';
import type { Question, QuizResult } from '@/lib/types';
import { QuestionDisplay } from './QuestionDisplay';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { ArrowRight, CheckCircle, Info, Loader2, Timer, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QUESTION_TIME_LIMIT = 30; // seconds

export function QuizClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [teacherName, setTeacherName] = useState<string>('');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME_LIMIT);
  const [quizFinished, setQuizFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showTimeUpDialog, setShowTimeUpDialog] = useState(false);

  useEffect(() => {
    const name = searchParams.get('teacherName');
    if (name) {
      setTeacherName(name);
      setIsLoading(false);
    } else {
      toast({
        title: "Hata",
        description: "Öğretmen adı bulunamadı. Lütfen ana sayfadan tekrar başlayın.",
        variant: "destructive",
      });
      router.replace('/'); // Redirect if no teacher name
    }
  }, [searchParams, router, toast]);

  const currentQuestion = allQuestions[currentQuestionIndex];

  const resetTimer = useCallback(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);
  }, []);
  
  useEffect(() => {
    if (isLoading || quizFinished || !currentQuestion) return;

    if (timeLeft === 0) {
      setShowTimeUpDialog(true);
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isLoading, quizFinished, currentQuestion]);

  const handleTimeUpDialogClose = () => {
    setShowTimeUpDialog(false);
    handleNextQuestion(true); // forceNext = true to indicate time is up
  };

  const handleAnswerSelect = (answer: string) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestion.id]: answer,
    }));
  };

  const handleNextQuestion = (forceNext: boolean = false) => {
    if (!forceNext && !answers[currentQuestion.id]) {
       toast({
        title: "Uyarı",
        description: "Lütfen bir cevap seçin veya süreniz dolduysa 'Tamam'a basın.",
        variant: "default",
      });
      return;
    }

    if (answers[currentQuestion.id] === currentQuestion.correctAnswer) {
      setScore((prevScore) => prevScore + currentQuestion.points);
    }

    if (currentQuestionIndex < allQuestions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      resetTimer();
    } else {
      setQuizFinished(true);
      // The useEffect for quizFinished will handle navigation and saving.
    }
  };

  useEffect(() => {
    if (quizFinished && teacherName) {
      const finalScore = score; // Use the score calculated up to this point
      const prize = getPrizeForScore(finalScore);
      
      const result: QuizResult = {
        id: new Date().toISOString() + Math.random().toString(36).substring(2,9), // simple unique id
        teacherName,
        score: finalScore,
        prizeName: prize?.name || 'Ödül Yok',
        date: new Date().toISOString(),
      };

      try {
        const existingResultsString = localStorage.getItem('quizResults');
        const existingResults: QuizResult[] = existingResultsString ? JSON.parse(existingResultsString) : [];
        localStorage.setItem('quizResults', JSON.stringify([...existingResults, result]));
      } catch (error) {
        console.error("Failed to save results to localStorage:", error);
        toast({
          title: "Saklama Hatası",
          description: "Sonuçlarınız kaydedilemedi. Lütfen internet bağlantınızı kontrol edin veya yönetici ile iletişime geçin.",
          variant: "destructive",
        });
      }
      
      router.push(`/results?teacherName=${encodeURIComponent(teacherName)}&score=${finalScore}`);
    }
  }, [quizFinished, score, teacherName, router, toast]);


  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <p className="text-xl text-muted-foreground">Sınav yükleniyor...</p>
      </div>
    );
  }

  if (!currentQuestion && !quizFinished) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <XCircle className="h-12 w-12 text-destructive mb-4" />
        <p className="text-xl text-destructive-foreground">Sorular yüklenemedi. Lütfen daha sonra tekrar deneyin.</p>
        <Button onClick={() => router.push('/')} className="mt-4">Ana Sayfaya Dön</Button>
      </div>
    );
  }
  
  if (quizFinished) {
     return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] text-center p-4">
        <CheckCircle className="h-12 w-12 text-primary mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Sınav Tamamlandı!</h2>
        <p className="text-muted-foreground mb-4">Sonuçlarınız hesaplanıyor ve yönlendiriliyorsunuz...</p>
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  const progressPercentage = ((currentQuestionIndex + 1) / allQuestions.length) * 100;

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col items-center max-w-2xl">
      <div className="w-full mb-6 p-4 bg-accent rounded-lg shadow">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold text-accent-foreground">Öğretmen: {teacherName}</h2>
          <div className="flex items-center gap-2 text-lg font-medium text-primary">
            <Timer className="h-6 w-6" />
            <span>Süre: {timeLeft}sn</span>
          </div>
        </div>
        <Progress value={progressPercentage} className="w-full h-3" />
        <p className="text-sm text-muted-foreground text-center mt-1">İlerleme: {currentQuestionIndex + 1} / {allQuestions.length}</p>
      </div>

      {currentQuestion && (
        <QuestionDisplay
          question={currentQuestion}
          onAnswerSelect={handleAnswerSelect}
          selectedAnswer={answers[currentQuestion.id]}
          questionNumber={currentQuestionIndex + 1}
          totalQuestions={allQuestions.length}
        />
      )}

      <Button onClick={() => handleNextQuestion(false)} className="mt-8 w-full md:w-auto text-lg px-8 py-6 self-end">
        {currentQuestionIndex === allQuestions.length - 1 ? 'Sınavı Bitir' : 'Sonraki Soru'}
        <ArrowRight className="ml-2 h-5 w-5" />
      </Button>

      <AlertDialog open={showTimeUpDialog} onOpenChange={setShowTimeUpDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><Info className="text-destructive"/>Süre Doldu!</AlertDialogTitle>
            <AlertDialogDescription>
              Bu soru için süreniz doldu. Bir sonraki soruya geçilecek.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleTimeUpDialogClose}>Tamam</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
