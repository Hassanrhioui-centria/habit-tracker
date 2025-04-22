import React, { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import HabitCard from "@/components/HabitCard";
import HabitForm from "@/components/HabitForm";
import { format } from "date-fns";
import { useHabitsContext } from "@/contexts/HabitsContext";
import { useCategories } from "@/contexts/CategoryContext";

const ALL_CATEGORY = { id: "all", name: "All", color: "gray" };

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentDate] = useState(new Date());
  const { categories } = useCategories();
  const { 
    habits, 
    completeHabit, 
    editHabit, 
    deleteHabit,
    editingHabit,
    setEditingHabit,
    isFormOpen,
    setIsFormOpen,
    addHabit,
    handleEditHabit
  } = useHabitsContext();

  const filteredHabits = selectedCategory === "all"
    ? habits
    : habits.filter((habit) => habit.category === selectedCategory);

  const completedHabits = habits.filter((habit) => habit.completed).length;
  const totalHabits = habits.length;
  const completionPercentage = totalHabits ? (completedHabits / totalHabits) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div>
          <h1 className="text-3xl font-semibold text-gray-800">Today</h1>
          <p className="text-gray-500 mt-1">{format(currentDate, "EEEE, MMMM d, yyyy")}</p>
        </div>

        <Card className="p-4 mt-6 mb-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-medium">Today's Progress</h2>
            <span className="text-sm text-gray-500">
              {completedHabits > 0 ? `${completionPercentage.toFixed(0)}% completed` : "No habits completed"}
            </span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </Card>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Habits</h2>
          <Button
            onClick={() => {
              setEditingHabit(null);
              setIsFormOpen(true);
            }}
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            Add Habit
          </Button>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <Button
            key={ALL_CATEGORY.id}
            variant="outline"
            size="sm"
            className={`rounded-full text-xs px-3 py-1 h-7 ${
              selectedCategory === ALL_CATEGORY.id 
                ? "bg-gray-200 border-gray-300" 
                : ""
            }`}
            onClick={() => setSelectedCategory(ALL_CATEGORY.id)}
          >
            {ALL_CATEGORY.name}
          </Button>
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="outline"
              size="sm"
              className={`rounded-full text-xs px-3 py-1 h-7 ${
                selectedCategory === category.id 
                  ? "bg-gray-200 border-gray-300" 
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </Button>
          ))}
        </div>

        <div className="space-y-3">
          {filteredHabits.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onComplete={completeHabit}
              onEdit={editHabit}
              onDelete={deleteHabit}
            />
          ))}

          {filteredHabits.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No habits found for this category.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setEditingHabit(null);
                  setIsFormOpen(true);
                }}
              >
                Create your first habit
              </Button>
            </div>
          )}
        </div>

        <HabitForm
          isOpen={isFormOpen}
          onClose={() => {
            setIsFormOpen(false);
            setEditingHabit(null);
          }}
          onSubmit={editingHabit ? handleEditHabit : addHabit}
          initialData={editingHabit || undefined}
          categories={categories}
        />
      </div>
    </div>
  );
};

export default Index;
