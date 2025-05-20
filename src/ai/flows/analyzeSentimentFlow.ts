'use server';
/**
 * @fileOverview A Genkit flow to analyze the sentiment of teacher feedback.
 *
 * - analyzeFeedbackSentiment - A function that analyzes the sentiment of a given text.
 * - AnalyzeSentimentInput - The input type for the analyzeFeedbackSentiment function.
 * - AnalyzeSentimentOutput - The return type for the analyzeFeedbackSentiment function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit'; // Changed from 'genkit/zod'

export const AnalyzeSentimentInputSchema = z.object({
  feedbackText: z.string().min(1).describe('The feedback text to be analyzed.'),
});
export type AnalyzeSentimentInput = z.infer<typeof AnalyzeSentimentInputSchema>;

export const AnalyzeSentimentOutputSchema = z.object({
  sentiment: z.enum(["positive", "negative", "neutral", "mixed"])
    .describe("The overall sentiment of the feedback. Can be 'positive', 'negative', 'neutral', or 'mixed' if multiple sentiments are strongly present."),
  explanation: z.string()
    .describe("A brief explanation of why this sentiment was chosen, based on the feedback text.")
    .optional(),
});
export type AnalyzeSentimentOutput = z.infer<typeof AnalyzeSentimentOutputSchema>;

export async function analyzeFeedbackSentiment(input: AnalyzeSentimentInput): Promise<AnalyzeSentimentOutput> {
  return analyzeSentimentFlow(input);
}

const analyzeSentimentPrompt = ai.definePrompt({
  name: 'analyzeSentimentPrompt',
  input: { schema: AnalyzeSentimentInputSchema },
  output: { schema: AnalyzeSentimentOutputSchema },
  prompt: `You are an expert sentiment analysis AI. Analyze the sentiment of the following teacher feedback.
Classify the sentiment as "positive", "negative", "neutral", or "mixed".
Provide a brief explanation for your classification.

Feedback:
{{{feedbackText}}}
`,
  // Example configuration with safety settings if needed
  // config: {
  //   safetySettings: [
  //     {
  //       category: 'HARM_CATEGORY_HARASSMENT',
  //       threshold: 'BLOCK_MEDIUM_AND_ABOVE',
  //     },
  //   ],
  // },
});

const analyzeSentimentFlow = ai.defineFlow(
  {
    name: 'analyzeSentimentFlow',
    inputSchema: AnalyzeSentimentInputSchema,
    outputSchema: AnalyzeSentimentOutputSchema,
  },
  async (input) => {
    const { output } = await analyzeSentimentPrompt(input);
    if (!output) {
      // Fallback or error handling if output is null/undefined
      // This might happen if the model fails to generate a valid response according to the schema
      // For example, if safety filters block the response
      console.error('Sentiment analysis failed to produce an output or was blocked.');
      return {
        sentiment: "neutral",
        explanation: "Could not determine sentiment or an error occurred.",
      };
    }
    return output;
  }
);
