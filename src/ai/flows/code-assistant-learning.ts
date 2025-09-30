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
  taskDescription: z
    .string()
    .describe('The description of the coding task or problem. The user will specify the programming language in this description.'),
});
export type CodeAssistantForLearningInput = z.infer<
  typeof CodeAssistantForLearningInputSchema
>;

const CodeSnippetSchema = z.object({
  language: z.string().describe('The programming language of the code snippet (e.g., html, css, javascript).'),
  code: z.string().describe('The generated code snippet for the specified language.'),
});

const CodeAssistantForLearningOutputSchema = z.object({
  codeSnippets: z.array(CodeSnippetSchema).describe('An array of generated code snippets, especially when multiple languages are requested (e.g., HTML, CSS, JavaScript).'),
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
  prompt: `You are a code assistant designed to help users learn new coding skills. Generate code, debug, and explain code snippets.

The user task description is: {{{taskDescription}}}.

Infer the programming language(s) from the task description. If the user asks for multiple languages (like HTML, CSS, and JavaScript), provide separate code snippets for each language in the 'codeSnippets' array. Each object in the array should contain the language and the corresponding code. If only one language is requested, provide a single entry in the 'codeSnippets' array.

Also provide a clear explanation of the code and suggestions for debugging.
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
