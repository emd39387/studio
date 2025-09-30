'use server';

/**
 * @fileOverview A code assistant AI agent for learning purposes.
 *
 * - codeAssistantForLearning - A function that handles the code generation, debugging, and explanation process.
 * - CodeAssistantForLearningInput - The input type for the codeAssistantForLearning function.
 * - CodeAssistantForLearningOutput - The return type for the codeAssistantForLearning function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CodeAssistantForLearningInputSchema = z.object({
  programmingLanguage: z
    .string()
    .describe('The programming language for the code snippet.'),
  taskDescription: z
    .string()
    .describe('The description of the coding task or problem.'),
});
export type CodeAssistantForLearningInput = z.infer<
  typeof CodeAssistantForLearningInputSchema
>;

const CodeAssistantForLearningOutputSchema = z.object({
  generatedCode: z.string().describe('The generated code snippet.'),
  explanation: z.string().describe('The explanation of the code snippet.'),
  debugSuggestions: z
    .string()
    .describe('Suggestions for debugging the code.'),
});
export type CodeAssistantForLearningOutput = z.infer<
  typeof CodeAssistantForLearningOutputSchema
>;

export async function codeAssistantForLearning(
  input: CodeAssistantForLearningInput
): Promise<CodeAssistantForLearningOutput> {
  return codeAssistantForLearningFlow(input);
}

const prompt = ai.definePrompt({
  name: 'codeAssistantForLearningPrompt',
  input: {schema: CodeAssistantForLearningInputSchema},
  output: {schema: CodeAssistantForLearningOutputSchema},
  prompt: `You are a code assistant designed to help users learn new coding skills.  Generate code, debug, and explain code snippets. The programming language is {{{programmingLanguage}}}. The task description is {{{taskDescription}}}.  Provide an explanation of the code snippet and suggestions for debugging the code.
`,
});

const codeAssistantForLearningFlow = ai.defineFlow(
  {
    name: 'codeAssistantForLearningFlow',
    inputSchema: CodeAssistantForLearningInputSchema,
    outputSchema: CodeAssistantForLearningOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
