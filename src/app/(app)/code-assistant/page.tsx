'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2, Code, Wand2, Clipboard, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { codeAssistantForLearning } from '@/ai/flows/code-assistant-learning';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  programmingLanguage: z.string().min(1, { message: 'Please select a language.' }),
  taskDescription: z.string().min(1, { message: 'Please describe the task.' }),
});

type CodeSnippet = {
  language: string;
  code: string;
};

type CodeAssistantOutput = {
  codeSnippets: CodeSnippet[];
  explanation: string;
  debugSuggestions: string;
};

export default function CodeAssistantPage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<CodeAssistantOutput | null>(null);
  const [copiedStates, setCopiedStates] = useState<Record<number, boolean>>({});

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      programmingLanguage: 'typescript',
      taskDescription: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOutput(null);
    setCopiedStates({});
    try {
      const result = await codeAssistantForLearning(values);
      setOutput(result);
    } catch (error) {
      console.error('Error with code assistant:', error);
      setOutput({
        codeSnippets: [],
        explanation: 'Sorry, I encountered an error. Please try again.',
        debugSuggestions: '',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleCopy = (code: string, index: number) => {
    navigator.clipboard.writeText(code);
    setCopiedStates((prev) => ({ ...prev, [index]: true }));
    toast({ title: 'Copied to clipboard!' });
    setTimeout(() => {
      setCopiedStates((prev) => ({ ...prev, [index]: false }));
    }, 2000);
  };

  return (
    <div className="p-4 sm:p-6 md:p-8 grid md:grid-cols-2 gap-8 h-full items-start">
      <Card className="sticky top-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-6 w-6 text-primary" /> AI Coding Assistant
          </CardTitle>
          <CardDescription>
            Generate, debug, and learn about code.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="programmingLanguage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Programming Language</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a language" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="html">HTML</SelectItem>
                        <SelectItem value="css">CSS</SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="typescript">TypeScript</SelectItem>
                        <SelectItem value="python">Python</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="taskDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Task Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Create a login form with HTML, CSS, and JS"
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Wand2 className="mr-2" />
                Generate
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="space-y-8 pr-4">
          {isLoading && (
            <Card>
              <CardContent className="p-6 text-center">
                 <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary" />
                 <p className="mt-4 text-muted-foreground">Generating...</p>
              </CardContent>
            </Card>
          )}

          {!isLoading && !output && (
             <Card className="flex items-center justify-center h-64">
              <CardContent className="p-6 text-center">
                 <p className="text-muted-foreground">Your code will appear here.</p>
              </CardContent>
            </Card>
          )}

          {output && (
            <>
              {output.codeSnippets && output.codeSnippets.length > 0 && (
                 <Card>
                  <CardHeader>
                    <CardTitle>Generated Code</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     {output.codeSnippets.map((snippet, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                           <Badge variant="secondary" className="capitalize">{snippet.language}</Badge>
                           <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleCopy(snippet.code, index)}
                          >
                            {copiedStates[index] ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="bg-muted p-4 rounded-md overflow-x-auto">
                          <code className="font-code text-sm whitespace-pre-wrap">
                            {snippet.code}
                          </code>
                        </pre>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )}
              {output.explanation && (
                <Card>
                  <CardHeader>
                    <CardTitle>Explanation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm dark:prose-invert max-w-full">
                      {output.explanation}
                    </div>
                  </CardContent>
                </Card>
              )}
              {output.debugSuggestions && (
                 <Card>
                  <CardHeader>
                    <CardTitle>Debugging Suggestions</CardTitle>
                  </CardHeader>
                  <CardContent>
                     <div className="prose prose-sm dark:prose-invert max-w-full">
                      {output.debugSuggestions}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
