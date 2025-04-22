import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface HabitFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (habit: { title: string; description: string; category: string | null }) => void;
  initialData?: {
    title: string;
    description: string;
    category?: string | null;
  };
  categories: Category[];
}

const HabitForm = ({ isOpen, onClose, onSubmit, initialData, categories }: HabitFormProps) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [category, setCategory] = useState(initialData?.category || null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      console.log('Submitting habit:', { 
        title: title.trim(), 
        description: description.trim(),
        category 
      });
      
      await onSubmit({ 
        title: title.trim(), 
        description: description.trim(),
        category 
      });
      
      // Reset form
      setTitle("");
      setDescription("");
      setCategory(null);
      onClose();
    } catch (error: any) {
      console.error('Error submitting habit:', error);
      toast({
        title: "Error creating habit",
        description: error.response?.data?.message || error.message || "Something went wrong",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit Habit" : "Add New Habit"}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Habit title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full"
              required
              disabled={isSubmitting}
            />
          </div>
          <div>
            <Textarea
              placeholder="Description (optional)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full"
              disabled={isSubmitting}
            />
          </div>
          <div>
            <div className="text-sm font-medium mb-2">Category</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.id}
                  type="button"
                  variant={category === cat.id ? "default" : "outline"}
                  className={`rounded-full text-xs px-3 py-1 h-auto ${
                    category === cat.id ? "bg-" + cat.color + "-500 border-" + cat.color + "-500" : ""
                  }`}
                  onClick={() => setCategory(cat.id)}
                  disabled={isSubmitting}
                >
                  {cat.name}
                </Button>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting 
                ? "Saving..." 
                : initialData 
                  ? "Update" 
                  : "Create"
              }
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default HabitForm;
