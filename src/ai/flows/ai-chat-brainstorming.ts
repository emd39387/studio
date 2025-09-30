'use server';

/**
 * @fileOverview A brainstorming AI agent.
 *
 * - aiChatBrainstorming - A function that handles the chat brainstorming process.
 * - AIChatBrainstormingInput - The input type for the aiChatBrainstorming function.
 * - AIChatBrainstormingOutput - The return type for the aiChatBrainstorming function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIChatBrainstormingInputSchema = z.object({
  prompt: z.string().describe('The prompt for the AI chat to brainstorm ideas.'),
});
export type AIChatBrainstormingInput = z.infer<typeof AIChatBrainstormingInputSchema>;

const AIChatBrainstormingOutputSchema = z.object({
  response: z.string().describe('The response from the AI chat after brainstorming.'),
});
export type AIChatBrainstormingOutput = z.infer<typeof AIChatBrainstormingOutputSchema>;

export async function aiChatBrainstorming(input: AIChatBrainstormingInput): Promise<AIChatBrainstormingOutput> {
  return aiChatBrainstormingFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiChatBrainstormingPrompt',
  input: {schema: AIChatBrainstormingInputSchema},
  output: {schema: AIChatBrainstormingOutputSchema},
  prompt: `You are Zoon AI, an AI chat assistant that helps users brainstorm ideas and retrieve information in real-time.

  User Prompt: {{{prompt}}}
  Response: `,
});

const aiChatBrainstormingFlow = ai.defineFlow(
  {
    name: 'aiChatBrainstormingFlow',
    inputSchema: AIChatBrainstormingInputSchema,
    outputSchema: AIChatBrainstormingOutputSchema,
  },
  async input => {
    const userPrompt = input.prompt.toLowerCase();
    if (userPrompt.includes('who built you') || userPrompt.includes('who created you')) {
      return { response: 'The CEO of Zoon AI is Azhar.' };
    }

    const {output} = await prompt(input);
    return output!;
  }
);
