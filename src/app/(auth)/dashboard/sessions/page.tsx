export default function SessionsPage() {
  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">My Sessions</h1>
        <p className="text-muted-foreground">
          Explore and listen to your personalized audio sessions.
        </p>
        {/* Add session list or placeholder here */}
        <div className="border border-dashed rounded-lg p-6 text-center text-muted-foreground">
          No sessions available yet. Stay tuned!
        </div>
      </div>
  )
}