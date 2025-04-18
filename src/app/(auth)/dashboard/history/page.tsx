export default function HistoryPage() {
  return (
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Recently Played</h1>
        <p className="text-muted-foreground">
          Revisit sessions you&apos;ve recently experienced.
        </p>
        {/* History list placeholder */}
        <div className="border border-dashed rounded-lg p-6 text-center text-muted-foreground">
          No history available.
        </div>
      </div>
  )
}