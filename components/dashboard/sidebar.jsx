"use client";

import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { LayoutGrid, Package, User, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/components/ui/sidebar";

const navItems = [
  { href: "/dashboard", label: "Overview", icon: LayoutGrid },
  { href: "/dashboard/packages", label: "Packages", icon: Package },
];

const accountItems = [
  { href: "/dashboard/account", label: "Profile", icon: User },
  { href: "/dashboard/settings", label: "Settings", icon: Settings },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const { state, isMobile } = useSidebar();
  const isCollapsed = state === "collapsed" && !isMobile;

  useEffect(() => {
    navItems.concat(accountItems).forEach((item) => {
      router.prefetch(item.href);
    });
  }, [router]);

  return (
    <Sidebar collapsible="icon" className="overflow-x-hidden">
      <SidebarHeader className="px-2 py-5">
        <div className="flex items-center gap-4 min-w-0">
          <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
            <Package className="w-4 h-4 text-primary" />
          </div>
          <div className="leading-tight min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="text-md font-semibold">Travel Admin</p>
            <p className="text-sm text-muted-foreground">Dashboard</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="overflow-x-hidden">
        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-2">
            Management
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="text-white">
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                    className="text-black  dark:text-white data-[active=true]:bg-primary/10 active:bg-primary/10 active:text-primary data-[active=true]:text-primary hover:bg-primary/10 hover:text-primary dark:hover:text-white py-5"
                  >
                    <Link href={item.href} prefetch>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator />

        <SidebarGroup>
          <SidebarGroupLabel className="text-lg mb-2">
            My Account
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    className="text-black dark:text-white data-[active=true]:bg-primary/10 active:bg-primary/10 active:text-primary data-[active=true]:text-primary hover:bg-primary/10 hover:text-primary dark:hover:text-white py-5"
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.label}
                  >
                    <Link href={item.href} prefetch>
                      <item.icon />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="px-3 pb-4 overflow-x-hidden">
        {!isCollapsed ? (
          <div className="px-2 text-md text-muted-foreground truncate">
            {user?.email || "Signed in"}
          </div>
        ) : (
          <div className="px-2 text-xs text-muted-foreground"> </div>
        )}
        <Button
          variant="ghost"
          className="justify-start bg-destructive/10 cursor-pointer text-destructive hover:!bg-destructive/10 hover:text-destructive"
          onClick={() => signOut()}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && <span>Sign out</span>}
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
