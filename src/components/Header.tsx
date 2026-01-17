import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Trophy, Radio, Users, BarChart2 } from "lucide-react";

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
            <span className="font-display font-bold text-lg text-gradient-gold">
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
