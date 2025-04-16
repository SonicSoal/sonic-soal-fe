
export default function NotFountPage() {
  return (
  <div className="flex flex-col items-center justify-center text-center py-20">
    <h1 className="text-5xl font-bold text-destructive mb-4">404</h1>
    <p className="text-lg text-muted-foreground mb-6">
      Oops! The page you’re looking for doesn’t exist.
    </p>
    <a
      href="/dashboard"
      className="text-primary underline hover:text-primary/80 transition-colors"
    >
      Return to Dashboard
    </a>
  </div>
  )
}
