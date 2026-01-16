import { Clock, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecentSearchesProps {
  searches: string[];
  onSelect: (search: string) => void;
  onRemove: (search: string) => void;
  className?: string;
}

export function RecentSearches({ 
  searches, 
  onSelect, 
  onRemove,
  className 
}: RecentSearchesProps) {
  if (searches.length === 0) return null;

  return (
    <div className={cn("animate-fade-in", className)}>
      <div className="flex items-center gap-2 mb-3">
        <Clock className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm text-muted-foreground">Buscas recentes</span>
      </div>
      <div className="flex flex-wrap gap-2">
        {searches.map((search) => (
          <div 
            key={search}
            className="group flex items-center gap-2 px-3 py-1.5 
                       bg-secondary/50 rounded-full border border-border/50
                       hover:border-primary/50 hover:bg-secondary transition-all cursor-pointer"
            onClick={() => onSelect(search)}
          >
            <span className="text-sm text-foreground">{search}</span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(search);
              }}
              className="p-0.5 rounded-full hover:bg-muted opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <X className="w-3 h-3 text-muted-foreground" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
