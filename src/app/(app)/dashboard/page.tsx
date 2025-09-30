import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <div className="p-4 sm:p-6 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight font-headline text-primary">
          Welcome to Zoon AI
        </h1>
        <p className="text-muted-foreground mt-2">
          Your AI-powered creative and productivity assistant.
        </p>
      </header>
      <Card>
        <CardHeader>
          <CardTitle>Dashboard</CardTitle>
          <CardDescription>
            This is your main dashboard. More features coming soon!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            You can start by exploring the features once they are implemented in the upcoming phases.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
