
import React from "react";
import { Card } from "@/components/ui/card";
import { Award, Trophy, Target, BarChart2 } from "lucide-react";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  unlocked: boolean;
  unlockedDate?: string;
}

const achievements: Achievement[] = [
  {
    id: "1",
    title: "Getting Started",
    description: "Create your first habit",
    icon: Award,
    unlocked: true,
    unlockedDate: "28/03/2025"
  },
  {
    id: "2",
    title: "On a Roll",
    description: "Reach a 3-day streak on any habit",
    icon: BarChart2,
    unlocked: true,
    unlockedDate: "28/03/2025"
  },
  {
    id: "3",
    title: "Consistent",
    description: "Reach a 7-day streak on any habit",
    icon: Trophy,
    unlocked: false
  },
  {
    id: "4",
    title: "Habit Master",
    description: "Reach a 30-day streak on any habit",
    icon: Trophy,
    unlocked: false
  },
  {
    id: "5",
    title: "Diversifying",
    description: "Create habits in 3 different categories",
    icon: Target,
    unlocked: false
  }
];

const AchievementsPage = () => {
  const unlockedAchievements = achievements.filter(a => a.unlocked);
  const lockedAchievements = achievements.filter(a => !a.unlocked);
  
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Achievements</h1>
        <p className="text-gray-500 mb-6">Celebrate your milestones and progress</p>
        
        <h2 className="text-xl font-semibold mb-4">Unlocked ({unlockedAchievements.length}/{achievements.length})</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {unlockedAchievements.map((achievement) => (
            <Card key={achievement.id} className="p-6 bg-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="bg-black rounded-full p-4 mb-3">
                  <achievement.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{achievement.description}</p>
                <p className="text-gray-500 text-xs">Unlocked: {achievement.unlockedDate}</p>
              </div>
            </Card>
          ))}
        </div>
        
        <h2 className="text-xl font-semibold mb-4">Locked</h2>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {lockedAchievements.map((achievement) => (
            <Card key={achievement.id} className="p-6 bg-gray-100">
              <div className="flex flex-col items-center text-center">
                <div className="bg-gray-300 rounded-full p-4 mb-3">
                  <achievement.icon className="h-6 w-6 text-gray-500" />
                </div>
                <h3 className="font-semibold text-lg mb-1">{achievement.title}</h3>
                <p className="text-gray-600 text-sm">{achievement.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsPage;
