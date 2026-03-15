'use client';

import { usePathname } from 'next/navigation';
import { SidebarTrigger } from '@/components/ui/sidebar';
import ThemeToggle from '@/components/dashboard/theme-toggle';

const titleMap = {
  '/dashboard': 'Overview',
  '/dashboard/packages': 'Packages',
  '/dashboard/account': 'My Account',
  '/dashboard/settings': 'Settings',
};

export default function DashboardTopbar() {
  const pathname = usePathname();
  const title = titleMap[pathname] || 'Dashboard';

  return (
    <header className="flex items-center justify-between border-b border-border/60 bg-background/80 backdrop-blur px-4 py-4 md:px-6">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="hover:!bg-primary/10 hover:text-primary cursor-pointer" />
        <div>
          <h1 className="text-lg font-semibold">{title}</h1>
          <p className="text-xs text-muted-foreground">
            Manage packages and settings
          </p>
        </div>
      </div>
      <ThemeToggle />
    </header>
  );
}
