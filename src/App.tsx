import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import CalendarPage from "./pages/Calendar";
import AchievementsPage from "./pages/Achievements";
import InsightsPage from "./pages/Insights";
import SettingsPage from "./pages/Settings";
import Navigation from "./components/Navigation";
import NotFound from "./pages/NotFound";
import { HabitsProvider } from "./contexts/HabitsContext";
import { CategoryProvider } from "./contexts/CategoryContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CategoryProvider>
        <HabitsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="relative">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/achievements" element={<AchievementsPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Navigation />
            </div>
          </BrowserRouter>
        </HabitsProvider>
      </CategoryProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
