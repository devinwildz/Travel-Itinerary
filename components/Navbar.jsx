"use client";
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation';
import { MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext"; // path adjust
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut } from "lucide-react";
import Link from "next/link";


const Navbar = () => {
    const { user, signOut } = useAuth();
    const navlinks = [
        { href: '/', label: 'Home' },
        { href: '/about', label: 'About Us' },
        { href: '/contact', label: "Contact" },
        { href: '/packages', label: "Packages" },
    ]
    const pathname = usePathname();
    const isActive = (href) => pathname === href;

    return (
        <nav className="w-full border-b border-slate-600 bg-transparent backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <MapPin className="w-6 h-6 text-accent" />
                    <span className="font-bold text-lg text-foreground">Tripinit</span>
                </Link>

                {/* Desktop Menu */}
                <div className="flex items-center gap-2">
                    {navlinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "px-4 py-2 rounded-md text-sm font-medium transition-colors",
                                {
                                    "bg-accent/10 text-accent": isActive(link.href),
                                    "text-foreground/70 hover:text-foreground hover:bg-accent/5": !isActive(link.href)
                                }
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="w-9 h-9 rounded-full flex items-center justify-center
                               bg-slate-900/60 text-white font-semibold
                                 ring-2 ring-cyan-400/70
                                 hover:bg-slate-800
                                 shadow-[0_0_12px_rgba(34,211,238,0.6)]
                                 cursor-pointer select-none hover:shadow-[0_0_18px_rgba(34,211,238,0.9)]
                                 transition-all duration-300">
                                        {user.email?.charAt(0).toUpperCase()}
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Link href="/my-trips">
                                                My Trips
                                            </Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={signOut}
                                            className="cursor-pointer"
                                        >
                                            <LogOut className="w-4 h-4 " />
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </>
                    ) : (
                        <>
                            <Link href="/login">
                                <Button className=" text-sm font-medium bg-transparent cursor-pointer text-foreground hover:bg-accent/10 transition-colors">
                                    Login
                                </Button>
                            </Link>

                            <Link href="/register">
                                <Button className="text-sm cursor-pointer font-medium bg-linear-to-r from-primary to-purple-600 text-slate-200 hover:shadow-lg hover:shadow-primary/50 transition-all">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    )}
                </div>

            </div>
        </nav>
    );
};

export default Navbar;
