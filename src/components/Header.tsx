import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Search, Trophy, Swords, Radio } from "lucide-react";

const navItems = [
  { path: "/", label: "Busca", icon: Search },
  { path: "/champions", label: "Tier List", icon: Trophy },
  { path: "/live", label: "Live Game", icon: Radio },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-gold-glow 
                          flex items-center justify-center shadow-[0_0_15px_-3px_hsl(var(--gold))]
                          group-hover:shadow-[0_0_25px_-3px_hsl(var(--gold))] transition-shadow">
            <Swords className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-display font-bold text-xl text-gradient-gold">
            DOGO STATS
          </span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
