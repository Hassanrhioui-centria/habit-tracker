import React from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";
import { Check, MoreVertical, Pencil, Trash } from "lucide-react";
import { useCategories } from "@/contexts/CategoryContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface HabitCardProps {
  habit: {
    id: string;
    title: string;
    description?: string;
    category?: string;
    completed?: boolean;
    streak?: number;
  };
  onComplete: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const HabitCard = ({ habit, onComplete, onEdit, onDelete }: HabitCardProps) => {
  const { categories } = useCategories();
  
  const categoryName = React.useMemo(() => {
    if (!habit.category) return null;
    const category = categories.find(c => c.id === habit.category);
    return category?.name;
  }, [habit.category, categories]);

  return (
    <Card className="p-4 hover:shadow-md transition-shadow duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex items-center gap-3">
          <Button
            variant={habit.completed ? "default" : "outline"}
            size="icon"
            onClick={() => onComplete(habit.id)}
            className={`h-8 w-8 rounded-full ${
              habit.completed ? "bg-primary text-primary-foreground" : "border-gray-300"
            }`}
          >
            {habit.completed && <Check className="h-4 w-4" />}
          </Button>
          <div>
            <h3 className={`font-medium text-base ${habit.completed ? "line-through text-gray-500" : "text-gray-800"}`}>
              {habit.title}
            </h3>
            {categoryName && (
              <span className="text-xs text-gray-500 mt-0.5 inline-block">
                {categoryName} {habit.streak && `• ${habit.streak} days`}
              </span>
            )}
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-gray-500"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(habit.id)}>
              <Pencil className="mr-2 h-4 w-4" />
              <span>Edit</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => onDelete(habit.id)}
              className="text-red-600 focus:text-red-600"
            >
              <Trash className="mr-2 h-4 w-4" />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Card>
  );
};

export default HabitCard;
