import React from "react";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-background via-background to-primary/10 pt-20 pb-8 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Logo */}
          <div className="lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity mb-2"
            >
              <MapPin className="w-6 h-6 text-primary" />
              <span className="font-bold text-lg text-foreground">
                Tripinit
              </span>
            </Link>

            <p className="text-muted-foreground mb-6 leading-relaxed">
              Generate personalized travel itineraries powered by advanced AI.
              Get day-wise plans.
            </p>

            <div className="space-y-3">
              <a
                href="mailto:infotripinit@gmail.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail size={15} />
                <span>infotripinit@gmail.com</span>
              </a>

              <a
                href="tel:+911234567890"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone size={15} />
                <span>+91 (123) 456-7890</span>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-foreground">Menus</h4>
            <ul className="space-y-3">
              {["Home", "About us", "Packages", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-foreground">
              Resources
            </h4>
            <ul className="space-y-3">
              {["Contact", "Blog", "Privacy Policy", "Terms of Services"].map(
                (item) => (
                  <li key={item}>
                    <a
                      href="#"
                      className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all"
                    >
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-xl font-bold mb-6 text-foreground">Socials</h4>
            <ul className="space-y-3">
              {["Instagram", "Twitter", "Youtube"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-muted-foreground hover:text-primary hover:translate-x-1 inline-block transition-all"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center text-muted-foreground text-sm border-t border-border pt-6">
          <p>
            © 2026 Tripinit. All rights reserved. |{" "}
            <a href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-primary transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
