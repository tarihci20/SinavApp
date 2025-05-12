'use client';

import type { Question } from '@/lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HelpCircle, ListChecks } from 'lucide-react';

interface QuestionDisplayProps {
  question: Question;
  onAnswerSelect: (answer: string) => void;
  selectedAnswer?: string;
  questionNumber: number;
  totalQuestions: number;
}

export function QuestionDisplay({
  question,
  onAnswerSelect,
  selectedAnswer,
  questionNumber,
  totalQuestions,
}: QuestionDisplayProps) {
  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" /> Soru {questionNumber} / {totalQuestions}
          </CardTitle>
          <span className="text-sm font-medium text-primary">{question.points} Puan</span>
        </div>
        <CardDescription className="pt-2 text-base md:text-lg">{question.text}</CardDescription>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer}
          onValueChange={onAnswerSelect}
          className="space-y-3"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-md hover:bg-accent/50 transition-colors cursor-pointer has-[:checked]:bg-accent has-[:checked]:border-primary">
              <RadioGroupItem value={option} id={`q${question.id}-option${index}`} className="h-5 w-5" />
              <Label htmlFor={`q${question.id}-option${index}`} className="text-base flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
