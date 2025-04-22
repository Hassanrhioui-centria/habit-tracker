import React from "react";
import { Calendar } from "@/components/ui/calendar";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/button";
import { format } from "date-fns";
import HabitCard from "@/components/HabitCard";
import { useHabitsContext } from "@/contexts/HabitsContext";
import { useCategories } from "@/contexts/CategoryContext";

const ALL_CATEGORY = { id: "all", name: "All", color: "blue" };

const CalendarPage = () => {
  const [date, setDate] = React.useState<Date>(new Date());
  const [selectedCategory, setSelectedCategory] = React.useState("all");
  const { habits, completeHabit, editHabit, deleteHabit } = useHabitsContext();
  const { categories } = useCategories();
  
  // Filter habits for selected date
  const selectedDateStr = format(date, 'yyyy-MM-dd');
  const habitsForDate = habits.filter(habit => {
    const habitDate = habit.date || format(new Date(), 'yyyy-MM-dd');
    return habitDate === selectedDateStr;
  });

  const filteredHabits = selectedCategory === "all"
    ? habitsForDate
    : habitsForDate.filter(habit => habit.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Calendar</h1>
        <p className="text-gray-500 mb-6">Track your habits over time</p>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-1">Monthly Overview</h2>
          <p className="text-gray-500 text-sm mb-4">Track your habit completion over time</p>
          
          <div className="border rounded-md p-4 mb-6">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              className="mx-auto"
            />
          </div>

          <div className="flex items-center justify-between mb-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <h2 className="text-lg font-medium">{format(date, "EEEE, MMMM d, yyyy")}</h2>
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              key={ALL_CATEGORY.id}
              variant="outline"
              className={`rounded-full text-xs px-3 py-1 h-7 ${
                selectedCategory === ALL_CATEGORY.id 
                  ? `bg-gray-200 border-gray-300` 
                  : ""
              }`}
              onClick={() => setSelectedCategory(ALL_CATEGORY.id)}
            >
              {ALL_CATEGORY.name}
            </Button>
            {categories.map(category => (
              <Button
                key={category.id}
                variant="outline"
                className={`rounded-full text-xs px-3 py-1 h-7 ${
                  selectedCategory === category.id 
                    ? `bg-gray-200 border-gray-300` 
                    : ""
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="space-y-3">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit) => (
                <HabitCard
                  key={habit.id}
                  habit={habit}
                  onComplete={completeHabit}
                  onEdit={editHabit}
                  onDelete={deleteHabit}
                />
              ))
            ) : (
              <p className="text-gray-500 text-center py-8">No habits for this date</p>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CalendarPage;
