import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Trophy, Radio, Swords, Users, BarChart2 } from "lucide-react";

const navItems = [
  { path: "/", label: "Busca", icon: Search },
  { path: "/champions", label: "Tier List", icon: Trophy },
  { path: "/compare", label: "Comparar", icon: Users },
  { path: "/live", label: "Live", icon: Radio },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="container py-3">
        <div className="floating-header flex items-center gap-2 max-w-fit mx-auto">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 px-3 group">
            <div className={cn(
              "w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-gold-glow",
              "flex items-center justify-center",
              "shadow-[0_0_20px_-5px_hsl(var(--gold))]",
              "group-hover:shadow-[0_0_30px_-5px_hsl(var(--gold))]",
              "transition-all duration-300 group-hover:scale-105"
            )}>
              <Swords className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-gradient-gold hidden md:block">
              DOGO
            </span>
          </Link>

          {/* Divider */}
          <div className="w-px h-6 bg-border/50" />

          {/* Navigation */}
          <nav className="flex items-center gap-0.5">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all",
                    isActive 
                      ? "text-primary-foreground bg-gradient-to-r from-primary to-gold-glow shadow-sm" 
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
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
