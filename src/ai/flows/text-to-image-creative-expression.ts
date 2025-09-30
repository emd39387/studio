'use server';

/**
 * @fileOverview Generates images from text prompts using DALL-E with style and size options.
 *
 * - generateCreativeImage - A function that generates an image based on a text prompt and style/size options.
 * - GenerateCreativeImageInput - The input type for the generateCreativeImage function.
 * - GenerateCreativeImageOutput - The return type for the generateCreativeImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const GenerateCreativeImageInputSchema = z.object({
  textPrompt: z.string().describe('The text prompt to generate the image from.'),
  style: z.enum(['realistic', 'artistic', 'cartoon']).describe('The style of the image.'),
  size: z.enum(['square', 'portrait', 'landscape']).describe('The size of the image.'),
});

export type GenerateCreativeImageInput = z.infer<typeof GenerateCreativeImageInputSchema>;

const GenerateCreativeImageOutputSchema = z.object({
  imageUrl: z.string().describe('The URL of the generated image as a data URI.'),
});

export type GenerateCreativeImageOutput = z.infer<typeof GenerateCreativeImageOutputSchema>;

export async function generateCreativeImage(input: GenerateCreativeImageInput): Promise<GenerateCreativeImageOutput> {
  return generateCreativeImageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCreativeImagePrompt',
  input: {schema: GenerateCreativeImageInputSchema},
  output: {schema: GenerateCreativeImageOutputSchema},
  prompt: `Generate an image based on the following text prompt with the specified style and size.\n\nText Prompt: {{{textPrompt}}}\nStyle: {{{style}}}\nSize: {{{size}}}`,
});

const generateCreativeImageFlow = ai.defineFlow(
  {
    name: 'generateCreativeImageFlow',
    inputSchema: GenerateCreativeImageInputSchema,
    outputSchema: GenerateCreativeImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/imagen-4.0-fast-generate-001',
      prompt: input.textPrompt,
    });

    if (!media || !media.url) {
      throw new Error('Failed to generate image.');
    }

    return {imageUrl: media.url};
  }
);
