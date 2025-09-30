'use server';

/**
 * @fileOverview Flow for generating blog posts and articles with tailored tone and style.
 *
 * - generateBlogPosts - A function that generates blog posts based on user preferences.
 * - GenerateBlogPostsInput - The input type for the generateBlogPosts function.
 * - GenerateBlogPostsOutput - The return type for the generateBlogPosts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBlogPostsInputSchema = z.object({
  topic: z.string().describe('The topic of the blog post.'),
  tone: z.enum(['professional', 'casual', 'creative']).describe('The tone of the blog post.'),
  style: z.string().describe('The writing style for the blog post (e.g., informative, persuasive).'),
  length: z.enum(['short', 'medium', 'long']).describe('The desired length of the blog post.'),
});

export type GenerateBlogPostsInput = z.infer<typeof GenerateBlogPostsInputSchema>;

const GenerateBlogPostsOutputSchema = z.object({
  title: z.string().describe('The title of the generated blog post.'),
  content: z.string().describe('The full content of the generated blog post.'),
});

export type GenerateBlogPostsOutput = z.infer<typeof GenerateBlogPostsOutputSchema>;

export async function generateBlogPosts(input: GenerateBlogPostsInput): Promise<GenerateBlogPostsOutput> {
  return generateBlogPostsFlow(input);
}

const generateBlogPostsPrompt = ai.definePrompt({
  name: 'generateBlogPostsPrompt',
  input: {schema: GenerateBlogPostsInputSchema},
  output: {schema: GenerateBlogPostsOutputSchema},
  prompt: `You are an expert blog post writer. Please generate a blog post based on the following criteria:

Topic: {{{topic}}}
Tone: {{{tone}}}
Style: {{{style}}}
Length: {{{length}}}

Make sure the blog post is engaging and well-written.`,
});

const generateBlogPostsFlow = ai.defineFlow(
  {
    name: 'generateBlogPostsFlow',
    inputSchema: GenerateBlogPostsInputSchema,
    outputSchema: GenerateBlogPostsOutputSchema,
  },
  async input => {
    const {output} = await generateBlogPostsPrompt(input);
    return output!;
  }
);
