"use client";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import { MapPin, Menu, LogOut } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import Link from "next/link";
import { useState } from "react";

const Navbar = () => {
  const { user, signOut } = useAuth();
  const [open, setOpen] = useState(false);

  const navlinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Us" },
    { href: "/contact", label: "Contact" },
    { href: "/packages", label: "Packages" },
  ];

  const pathname = usePathname();
  const isActive = (href) => pathname === href;

  return (
    <nav className="w-full border-b border-border bg-background/60 backdrop-blur-xl z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <MapPin className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg text-foreground">Tripinit</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-2">
          {navlinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                {
                  "bg-primary/10 text-primary": isActive(link.href),
                  "text-foreground/70 hover:text-foreground hover:bg-primary/5":
                    !isActive(link.href),
                },
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-primary/10 text-primary font-semibold
                  ring-2 ring-primary/40
                  hover:bg-primary/20 cursor-pointer
                  shadow-md
                  transition-all duration-300"
                >
                  {user.email?.charAt(0).toUpperCase()}
                </Button>
              </DropdownMenuTrigger>

              <DropdownMenuContent>
                <DropdownMenuGroup>
                  <DropdownMenuItem  className=" cursor-pointer data-[highlighted]:bg-primary/10 data-[highlighted]:text-foreground" asChild>
                    <Link href="/my-trips">My Trips</Link>
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onClick={signOut}
                    className="cursor-pointer data-[highlighted]:bg-destructive/10 data-[highlighted]:text-destructive"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/login">
                <Button className="text-sm font-medium bg-transparent text-foreground hover:bg-primary/10 transition-colors">
                  Login
                </Button>
              </Link>

              <Link href="/register">
                <Button className="text-sm font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-foreground">
                <Menu className="w-6 h-6" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <VisuallyHidden>
                <SheetTitle>Navigation Menu</SheetTitle>
                <SheetDescription>
                  Mobile navigation menu with links and account options
                </SheetDescription>
              </VisuallyHidden>

              <div className="flex flex-col px-4 gap-6 mt-12">
                {/* Links */}
                <div className="flex flex-col gap-2">
                  {navlinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-md text-sm font-medium transition-colors",
                        {
                          "bg-primary/10 text-primary": isActive(link.href),
                          "text-foreground/70 hover:text-foreground hover:bg-primary/5":
                            !isActive(link.href),
                        },
                      )}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                {/* Auth */}
                <div className="border-t border-border pt-6 flex flex-col gap-3">
                  {user ? (
                    <>
                      <div className="flex items-center gap-3 px-4 py-2">
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center
                          bg-primary/10 text-primary font-semibold ring-2 ring-primary/40"
                        >
                          {user.email?.charAt(0).toUpperCase()}
                        </div>

                        <span className="text-sm text-foreground/70">
                          {user.email}
                        </span>
                      </div>

                      <Link
                        href="/my-trips"
                        onClick={() => setOpen(false)}
                        className="px-4 py-3 rounded-md text-sm font-medium text-foreground/70 hover:text-foreground hover:bg-primary/5 transition-colors"
                      >
                        My Trips
                      </Link>

                      <Button
                        onClick={() => {
                          signOut();
                          setOpen(false);
                        }}
                        variant="ghost"
                        className="justify-start px-4 text-foreground/70 hover:text-foreground"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/login" onClick={() => setOpen(false)}>
                        <Button className="w-full text-sm font-medium bg-transparent text-foreground hover:bg-primary/10 transition-colors">
                          Login
                        </Button>
                      </Link>

                      <Link href="/register" onClick={() => setOpen(false)}>
                        <Button className="w-full text-sm font-medium bg-gradient-to-r from-primary to-accent text-white hover:shadow-lg hover:shadow-primary/30 transition-all">
                          Sign Up
                        </Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
