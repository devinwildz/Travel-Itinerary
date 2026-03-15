import { Card } from '@/components/ui/card';

export default function AccountPage() {
  return (
    <Card className="border-border/60 bg-card/80 backdrop-blur p-8">
      <h2 className="text-xl font-semibold mb-2">My Account</h2>
      <p className="text-sm text-muted-foreground">
        Profile management and account settings will live here.
      </p>
    </Card>
  );
}
