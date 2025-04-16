import { Separator } from "@/components/ui/separator";
import { AudioWaveformIcon } from "lucide-react";

export const metadata = {
  title: 'Dashboard | SonicSoal',
  description: 'Manage your frequency audio experience',
};

export default function DashboardPage() {
  return (
    <div>
     <div className="flex items-center space-x-4 mb-6">
        <AudioWaveformIcon className="w-8 h-8 text-primary" />
        <h1 className="bg-gradient-to-r from-[#14D9C4] to-[#A46EFF] text-transparent bg-clip-text text-3xl">
          Welcome to SonicSoal
        </h1>
      </div>
      <p className="text-muted-foreground max-w-xl">
        Explore healing sound sessions, track your progress, and align your inner harmony. More features coming soon!
      </p>
      <Separator className="my-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Dashboard Cards Placeholder */}
        <div className="rounded-2xl bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2 text-foreground">Latest Sessions</h3>
          <p className="text-muted-foreground text-sm">Check out the most recent healing tracks available to you.</p>
        </div>
        <div className="rounded-2xl bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2 text-foreground">Your Feedback</h3>
          <p className="text-muted-foreground text-sm">View what you’ve shared and help improve the experience.</p>
        </div>
        <div className="rounded-2xl bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
          <h3 className="font-semibold text-lg mb-2 text-foreground">Coming Features</h3>
          <p className="text-muted-foreground text-sm">Sneak peek into upcoming features we’re vibing on.</p>
        </div>
      </div>
    </div>
  );
}
