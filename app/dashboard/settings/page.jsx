import { Card } from '@/components/ui/card';

export default function SettingsPage() {
  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur p-8">
      <h2 className="text-xl font-semibold mb-2">Settings</h2>
      <p className="text-sm text-muted-foreground">
        Configure preferences and admin settings here.
      </p>
    </Card>
  );
}
