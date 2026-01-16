import { Search, X } from "lucide-react";
import { useState } from "react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSearch: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function SearchInput({ 
  value, 
  onChange, 
  onSearch, 
  placeholder = "Buscar jogador... (Nome#TAG)",
  className = ""
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSearch(value.trim());
    }
  };

  const handleClear = () => {
    onChange("");
  };

  return (
    <form onSubmit={handleSubmit} className={`relative group ${className}`}>
      <div 
        className={`
          relative flex items-center gap-3 px-5 py-4 
          bg-secondary/50 rounded-2xl border transition-all duration-300
          ${isFocused 
            ? 'border-primary/50 shadow-[0_0_30px_-10px_hsl(var(--gold)/0.4)]' 
            : 'border-border/50 hover:border-border'
          }
        `}
      >
        <Search 
          className={`w-5 h-5 transition-colors duration-300 ${
            isFocused ? 'text-primary' : 'text-muted-foreground'
          }`} 
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-foreground placeholder:text-muted-foreground 
                     focus:outline-none text-lg font-medium"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="p-1 rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        )}
        <button
          type="submit"
          className="px-4 py-2 bg-primary text-primary-foreground rounded-xl
                     font-semibold text-sm transition-all duration-300
                     hover:bg-primary/90 hover:shadow-[0_0_20px_-5px_hsl(var(--gold)/0.5)]
                     active:scale-95"
        >
          Buscar
        </button>
      </div>
    </form>
  );
}
