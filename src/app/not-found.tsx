import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center bg-background px-4">
      <h1 className="text-6xl md:text-9xl font-black text-primary drop-shadow-lg">404</h1>
      <h2 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight text-foreground">
        Page Not Found
      </h2>
      <p className="mt-2 max-w-md text-base text-muted-foreground">
        Oops! The page you are looking for does not exist. It might have been moved or deleted.
      </p>
      <Button asChild className="mt-8" size="lg">
        <Link href="/dashboard">Go to Dashboard</Link>
      </Button>
    </div>
  )
}
