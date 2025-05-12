'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { submitFeedbackAction } from '@/app/actions/feedbackActions';
import type { TeacherFeedback, AnalyzeSentimentOutput } from '@/lib/types'; // Assuming AnalyzeSentimentOutput will be added or inferred
import { Loader2, MessageSquarePlus, Send, CheckCircle } from 'lucide-react';

interface FeedbackFormProps {
  teacherName: string;
}

export function FeedbackForm({ teacherName }: FeedbackFormProps) {
  const [feedbackText, setFeedbackText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackText.trim()) {
      toast({
        title: 'Uyarı',
        description: 'Lütfen geri bildiriminizi yazınız.',
        variant: 'default',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await submitFeedbackAction(teacherName, feedbackText.trim());

      if (result.success && result.sentimentData) {
        const newFeedback: TeacherFeedback = {
          id: new Date().toISOString() + Math.random().toString(36).substring(2, 9),
          teacherName,
          feedbackText: feedbackText.trim(),
          sentiment: result.sentimentData.sentiment,
          sentimentExplanation: result.sentimentData.explanation,
          date: new Date().toISOString(),
        };

        // Save to localStorage
        const existingFeedbacksString = localStorage.getItem('teacherFeedbacks');
        const existingFeedbacks: TeacherFeedback[] = existingFeedbacksString
          ? JSON.parse(existingFeedbacksString)
          : [];
        localStorage.setItem('teacherFeedbacks', JSON.stringify([...existingFeedbacks, newFeedback]));
        
        toast({
          title: 'Geri Bildirim Gönderildi',
          description: 'Değerli geri bildiriminiz için teşekkür ederiz!',
        });
        setFeedbackText('');
        setIsSubmitted(true);
      } else {
        console.error("Feedback submission error details:", result);
        toast({
          title: 'Hata',
          description: result.error || 'Geri bildirim gönderilemedi. Lütfen tekrar deneyin.',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: 'Hata',
        description: 'Geri bildirim gönderilirken bir sorun oluştu.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8 shadow-lg">
        <CardContent className="pt-6 text-center">
          <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
          <p className="text-lg font-semibold text-primary">Geri bildiriminiz için teşekkür ederiz!</p>
          <p className="text-muted-foreground">Görüşleriniz bizim için değerlidir.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto mt-8 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center gap-2">
          <MessageSquarePlus className="h-6 w-6 text-primary" />
          Geri Bildiriminiz
        </CardTitle>
        <CardDescription>Yarışma hakkındaki düşüncelerinizi bizimle paylaşın.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="feedbackText" className="sr-only">
              Geri Bildirim
            </Label>
            <Textarea
              id="feedbackText"
              value={feedbackText}
              onChange={(e) => setFeedbackText(e.target.value)}
              placeholder="Yarışma hakkındaki düşünceleriniz..."
              rows={4}
              className="text-base"
              disabled={isLoading}
            />
          </div>
          <Button type="submit" className="w-full text-lg py-3" disabled={isLoading || !feedbackText.trim()}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Gönderiliyor...
              </>
            ) : (
              <>
                <Send className="mr-2 h-5 w-5" /> Gönder
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
