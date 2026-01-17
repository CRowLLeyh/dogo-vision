import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Champions from "./pages/Champions";
import LiveGame from "./pages/LiveGame";
import MatchDetail from "./pages/MatchDetail";
import Compare from "./pages/Compare";
import PostGame from "./pages/PostGame";
import ChampionSelect from "./pages/ChampionSelect";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="min-h-screen bg-background">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/profile/:summonerName" element={<Profile />} />
              <Route path="/champions" element={<Champions />} />
              <Route path="/live" element={<LiveGame />} />
              <Route path="/match/:matchId" element={<MatchDetail />} />
              <Route path="/post-game/:matchId" element={<PostGame />} />
              <Route path="/champion-select" element={<ChampionSelect />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
