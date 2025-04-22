
import React from "react";
import { Card } from "@/components/ui/card";

export const AboutSection = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">About HabitTracker</h2>
      <div className="space-y-2 text-gray-600">
        <p>Version: 1.0.0</p>
        <p className="pt-4">
          HabitTracker is a simple tool to help you build and maintain positive habits.
          Track your progress, set goals, and celebrate achievements.
        </p>
        <div className="pt-4">
          <p className="font-medium">Tech Stack:</p>
          <ul className="list-disc list-inside pl-2 pt-1">
            <li>Frontend: React, Tailwind CSS, Shadcn UI</li>
            <li>Backend: Node.js, Express</li>
            <li>Database: MongoDB</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};
