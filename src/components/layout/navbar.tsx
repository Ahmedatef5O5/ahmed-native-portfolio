"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [activeHash, setActiveHash] = React.useState("");

  // For hiding header on scroll down
  const [isHidden, setIsHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      // Hide on scroll down, show on scroll up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }

      lastScrollY.current = currentScrollY;

      // Show header if scrolling stops for 3 seconds
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = setTimeout(() => {
        setIsHidden(false);
      }, 3000);

      // Intersection Observer logic for Active Hash
      if (pathname === "/") {
        const sections = ["projects", "about", "contact"];
        let current = "";
        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the top of the section is near the top of the viewport
            if (rect.top <= 200 && rect.bottom >= 200) {
              current = `#${section}`;
            }
          }
        }
        // If we are at the very top, home is active
        if (window.scrollY < 100) {
          current = "";
        }
        // If we are at the very bottom, contact is active
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
          current = "#contact";
        }
        setActiveHash(current);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Trigger once on mount
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500",
        isScrolled ? "py-4" : "py-6",
        isHidden ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <nav
          className={cn(
            "flex items-center justify-between rounded-2xl px-6 py-4 transition-all duration-500",
            isScrolled
              ? "bg-surface/70 backdrop-blur-xl border border-white/5 shadow-2xl shadow-black/20"
              : "bg-transparent border-transparent"
          )}
        >
          {/* Logo */}
          <Link
            href="/"
            className="relative flex items-center justify-center w-10 h-10 rounded-full bg-surface-variant border border-border overflow-hidden group"
          >
            <Image
              src="/assets/profile/profile.webp"
              alt="Ahmed Atef"
              width={40}
              height={40}
              priority
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              // Determine if active
              let isActive = false;
              if (pathname === "/") {
                if (item.href === "/") {
                  isActive = activeHash === "";
                } else {
                  isActive = activeHash === item.href.replace("/", "");
                }
              } else {
                // If we are on a project page, and the link is Projects
                if (pathname.startsWith("/projects") && item.label === "Projects") {
                  isActive = true;
                } else {
                  isActive = pathname === item.href;
                }
              }

              // Update link href for when we're already on home page
              const linkHref = (pathname === "/" && item.href.startsWith("/#"))
                ? item.href.replace("/", "")
                : item.href;

              return (
                <Link
                  key={item.href}
                  href={linkHref}
                  className={cn(
                    "relative text-sm font-medium transition-colors hover:text-primary py-1",
                    isActive ? "text-primary" : "text-text-secondary"
                  )}
                >
                  {item.label}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 right-0 h-px bg-primary rounded-full shadow-[0_0_8px_var(--primary)]" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2.5 rounded-lg text-text-secondary hover:text-text hover:bg-surface-variant/80 border border-transparent hover:border-border/50 transition-all duration-300 flex items-center justify-center w-10 h-10"
              aria-label="Toggle theme"
            >
              {mounted ? (
                theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
              ) : (
                <span className="w-[18px] h-[18px]" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg text-text-secondary hover:text-text hover:bg-surface-variant/80 border border-transparent hover:border-border/50 transition-all duration-300"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Nav */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 right-0 bg-surface/95 backdrop-blur-xl border-b border-border/50 shadow-lg transition-all duration-300 overflow-hidden",
          isMobileMenuOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0 border-transparent"
        )}
      >
        <nav className="flex flex-col gap-2 p-4">
          {navItems.map((item) => {
            let isActive = false;
            if (pathname === "/") {
              if (item.href === "/") {
                isActive = activeHash === "";
              } else {
                isActive = activeHash === item.href.replace("/", "");
              }
            } else {
              if (pathname.startsWith("/projects") && item.label === "Projects") {
                isActive = true;
              } else {
                isActive = pathname === item.href;
              }
            }

            const linkHref = (pathname === "/" && item.href.startsWith("/#"))
              ? item.href.replace("/", "")
              : item.href;

            return (
              <Link
                key={item.href}
                href={linkHref}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/20"
                    : "text-text-secondary hover:bg-surface-variant hover:text-text border border-transparent"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
