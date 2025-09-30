import { ZoonLogo } from '@/components/icons';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background p-4">
      <div className="mb-8 flex items-center gap-3 text-foreground">
        <ZoonLogo className="h-10 w-10 text-primary" />
        <h1 className="text-3xl font-bold font-headline">Zoon AI</h1>
      </div>
      {children}
    </main>
  );
}
