'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Bot, Code } from "lucide-react";

export default function DashboardPage() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const name = localStorage.getItem('userName');
      setUserName(name || 'there');
    }
  }, []);

  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-primary">
          Welcome, {userName}!
        </h1>
        <p className="text-muted-foreground mt-2">
          What would you like to do today?
        </p>
      </header>
      <div className="grid gap-6 md:grid-cols-2">
        <Link href="/ai-chat" className="group">
          <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                  <Bot className="h-6 w-6 text-primary" />
                  AI Chat
                </CardTitle>
                <CardDescription>
                  Brainstorm ideas and get information.
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>
        <Link href="/code-assistant" className="group">
          <Card className="h-full transition-all group-hover:shadow-lg group-hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between">
              <div className="space-y-1.5">
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-6 w-6 text-primary" />
                  AI Coding Assistant
                </CardTitle>
                <CardDescription>
                  Generate, debug, and learn about code.
                </CardDescription>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
