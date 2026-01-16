import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Trophy, Radio, Swords } from "lucide-react";

const navItems = [
  { path: "/", label: "Busca", icon: Search },
  { path: "/champions", label: "Tier List", icon: Trophy },
  { path: "/live", label: "Live", icon: Radio },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container py-4">
        <div className="floating-header flex items-center gap-4 max-w-fit mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-2 group">
            <div className={cn(
              "w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-gold-glow",
              "flex items-center justify-center",
              "shadow-[0_0_20px_-5px_hsl(var(--gold))]",
              "group-hover:shadow-[0_0_30px_-5px_hsl(var(--gold))]",
              "transition-all duration-300 group-hover:scale-105"
            )}>
              <Swords className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-lg text-gradient-gold hidden sm:block">
              DOGO
            </span>
          </Link>

          {/* Navigation */}
          <nav className="pill-nav">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "pill-nav-item",
                    isActive 
                      ? "text-primary-foreground bg-gradient-to-r from-primary to-gold-glow rounded-xl shadow-md" 
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
