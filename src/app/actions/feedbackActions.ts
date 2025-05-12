'use server';

import { analyzeFeedbackSentiment, AnalyzeSentimentInputSchema, AnalyzeSentimentOutputSchema, type AnalyzeSentimentOutput } from '@/ai/flows/analyzeSentimentFlow';
import type { ZodError } from 'zod';

interface SubmitFeedbackResult {
  success: boolean;
  sentimentData?: AnalyzeSentimentOutput;
  error?: string;
  validationErrors?: Record<string, string[]>;
}

export async function submitFeedbackAction(
  teacherName: string, // Included for potential future use (e.g. logging with teacher name)
  feedbackText: string
): Promise<SubmitFeedbackResult> {
  try {
    const validatedInput = AnalyzeSentimentInputSchema.safeParse({ feedbackText });
    if (!validatedInput.success) {
      const zodError = validatedInput.error as ZodError<typeof AnalyzeSentimentInputSchema>;
      const errors: Record<string, string[]> = {};
      zodError.errors.forEach(err => {
        errors[err.path.join('.')] = errors[err.path.join('.')] || [];
        errors[err.path.join('.')].push(err.message);
      });
      return { success: false, validationErrors: errors, error: "Validation failed." };
    }

    if (!teacherName || teacherName.trim() === '') {
        return { success: false, error: "Teacher name is required." };
    }

    const analysisResult = await analyzeFeedbackSentiment(validatedInput.data);
    
    if (!analysisResult || !analysisResult.sentiment) {
        return { success: false, error: "Sentiment analysis failed to return a valid result." };
    }

    return { success: true, sentimentData: analysisResult };

  } catch (error) {
    console.error('Error in submitFeedbackAction:', error);
    let errorMessage = 'An unexpected error occurred during feedback submission.';
    if (error instanceof Error) {
        errorMessage = error.message;
    }
    return { success: false, error: errorMessage };
  }
}
