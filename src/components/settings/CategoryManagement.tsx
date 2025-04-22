import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Button from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryManagementProps {
  categories: Category[];
  onDeleteCategory: (id: string) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  onAddCategory: () => void;
}

const colors = [
  "blue-500",
  "green-500",
  "red-500",
  "yellow-500",
  "purple-500",
  "pink-500",
  "indigo-500",
  "orange-500",
  "lime-500",
  "cyan-500"
];

export const CategoryManagement = ({
  categories,
  onDeleteCategory,
  newCategory,
  setNewCategory,
  selectedColor,
  setSelectedColor,
  onAddCategory,
}: CategoryManagementProps) => {
  return (
    <div className="grid gap-8 md:grid-cols-2">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-1">Manage Categories</h2>
        <p className="text-gray-500 text-sm mb-4">Create and manage categories for organizing your habits</p>
        
        <div className="grid gap-4 md:grid-cols-2">
          {categories.map((category) => (
            <div 
              key={category.id}
              className="flex items-center justify-between p-3 border rounded-md"
            >
              <div className="flex items-center gap-2">
                <div 
                  className={`w-4 h-4 rounded-full bg-${category.color}`}
                  style={{ backgroundColor: `var(--${category.color})` }}
                ></div>
                <span>{category.name}</span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDeleteCategory(category.id)}
                className="h-8 w-8 text-gray-400 hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </Card>
      
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-1">Add New Category</h2>
        <p className="text-gray-500 text-sm mb-4">Create a new category for your habits</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Category Name
            </label>
            <Input
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g., Fitness"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Color</label>
            <div className="flex flex-wrap gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setSelectedColor(color)}
                  className={`w-8 h-8 rounded-full ${
                    selectedColor === color ? 'ring-2 ring-offset-2 ring-black' : ''
                  }`}
                  style={{ backgroundColor: `var(--${color})` }}
                ></button>
              ))}
            </div>
          </div>
          
          <Button 
            onClick={onAddCategory}
            className="w-full"
            disabled={!newCategory.trim()}
          >
            Add Category
          </Button>
        </div>
      </Card>
    </div>
  );
};
