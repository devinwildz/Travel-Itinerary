import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar';
import DashboardSidebar from '@/components/dashboard/sidebar';
import DashboardTopbar from '@/components/dashboard/topbar';
import { Toaster } from '@/components/ui/sonner';

export default function DashboardLayout({ children }) {
  return (
    <SidebarProvider defaultOpen className="min-h-svh overflow-x-hidden">
      <DashboardSidebar />
      <SidebarInset className="min-h-svh overflow-hidden">
        <DashboardTopbar />
        <div className="p-4 md:p-6 pb-10">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  );
}
