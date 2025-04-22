
import React from "react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Flame, Trophy } from "lucide-react";

const InsightsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Progress</h1>
        <p className="text-gray-500 mb-6">Track your habit performance over time</p>
        
        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card className="p-4">
            <h3 className="text-sm text-gray-500 mb-1">Weekly Completion</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">71%</span>
            </div>
            <Progress value={71} className="h-2" />
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm text-gray-500 mb-1">Monthly Completion</h3>
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">17%</span>
            </div>
            <Progress value={17} className="h-2" />
          </Card>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 mb-8">
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center bg-amber-50 p-3 rounded-full mb-3">
              <Flame className="h-5 w-5 text-amber-500" />
            </div>
            <h3 className="font-semibold text-lg">Highest Streak</h3>
            <p className="text-2xl font-bold">2 days</p>
          </Card>
          
          <Card className="p-6 text-center">
            <div className="inline-flex items-center justify-center bg-blue-50 p-3 rounded-full mb-3">
              <Trophy className="h-5 w-5 text-blue-500" />
            </div>
            <h3 className="font-semibold text-lg">Achievements</h3>
            <p className="text-2xl font-bold">2 / 5</p>
          </Card>
        </div>
        
        <Card className="p-6">
          <h2 className="text-lg font-semibold mb-4">Habit Insights</h2>
          <div className="space-y-4 text-gray-600">
            <p>Try to build your streak to at least 3 days for better habit formation.</p>
            <p>Good progress on your weekly habits, aim for more consistency.</p>
          </div>
        </Card>
        
        <Card className="p-6 mt-6">
          <h2 className="text-lg font-semibold mb-4">Quick Tips</h2>
          <ul className="space-y-2 text-gray-600">
            <li>• Track habits consistently for better results</li>
            <li>• Focus on one new habit at a time</li>
            <li>• Small actions daily lead to big changes</li>
            <li>• Use categories to organize related habits</li>
            <li>• Celebrate your achievements as motivation</li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default InsightsPage;
