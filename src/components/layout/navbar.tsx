"use client";

import * as React from "react";
import { useSyncExternalStore } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

function subscribeNoop() {
  return () => {};
}
function getClientSnapshot() {
  return true;
}
function getServerSnapshot() {
  return false;
}

function isNavItemActive(
  item: { href: string; label: string },
  pathname: string,
  activeHash: string
): boolean {
  if (pathname === "/") {
    if (item.href === "/") return activeHash === "";
    if (item.href === "/projects" && activeHash === "#projects") return true;
    return activeHash === item.href.replace("/", "");
  }
  if (pathname.startsWith("/projects") && item.label === "Projects") return true;
  return pathname === item.href;
}

const navItems = [
  { label: "Home", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const [activeHash, setActiveHash] = React.useState("");

  // For hiding header on scroll down
  const [isHidden, setIsHidden] = React.useState(false);
  const lastScrollY = React.useRef(0);
  const scrollTimeout = React.useRef<NodeJS.Timeout | null>(null);

  // IntersectionObserver-based active section tracking (decoupled from scroll)
  React.useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["projects", "about", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHash(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-200px 0px -60% 0px" }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [pathname]);

  // Throttled scroll listener using requestAnimationFrame
  React.useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
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

        // Lightweight top/bottom edge cases when on home page
        if (pathname === "/") {
          if (currentScrollY < 100) {
            setActiveHash("");
          } else if (window.innerHeight + currentScrollY >= document.body.offsetHeight - 50) {
            setActiveHash("#contact");
          }
        }

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
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
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => {
              const isActive = isNavItemActive(item, pathname, activeHash);

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
            const isActive = isNavItemActive(item, pathname, activeHash);

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
