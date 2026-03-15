import { Card } from '@/components/ui/card';

export default function DashboardHomePage() {
  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur p-8">
      <h2 className="text-xl font-semibold mb-2">Welcome back</h2>
      <p className="text-sm text-muted-foreground">
        Use the sidebar to manage travel packages and account settings.
      </p>
    </Card>
  );
}
