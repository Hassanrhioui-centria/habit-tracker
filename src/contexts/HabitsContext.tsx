import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { format } from 'date-fns';
import { useToast } from "@/components/ui/use-toast";
import { fetchApi } from '@/lib/utils';

interface Habit {
  _id?: string;
  id: string;  // Making id required
  title: string;
  description: string;
  category?: string | null;
  completed?: boolean;
  streak?: number;
  date?: string;
}

interface HabitsContextType {
  habits: Habit[];
  addHabit: (habit: { title: string; description: string; category: string | null }) => void;
  completeHabit: (id: string) => void;
  editHabit: (id: string) => void;
  deleteHabit: (id: string) => void;
  editingHabit: Habit | null;
  setEditingHabit: (habit: Habit | null) => void;
  isFormOpen: boolean;
  setIsFormOpen: (isOpen: boolean) => void;
  handleEditHabit: (habitData: { title: string; description: string; category: string | null }) => void;
}

const HabitsContext = createContext<HabitsContextType | undefined>(undefined);

export function HabitsProvider({ children }: { children: ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [editingHabit, setEditingHabit] = useState<Habit | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  // Load habits on mount
  useEffect(() => {
    async function loadHabits() {
      try {
        const data = await fetchApi('/habits');
        console.log('Loaded habits:', data);
        setHabits(data);
      } catch (err: any) {
        console.error('Failed to fetch habits:', err.message);
        toast({ 
          title: 'Error loading habits', 
          description: err.message,
          variant: 'destructive'
        });
      }
    }
    loadHabits();
  }, []);

  const addHabit = async (habitData: { title: string; description: string; category: string | null }) => {
    try {
      console.log('Adding habit:', habitData);
      const newHabit = await fetchApi('/habits', {
        method: 'POST',
        body: JSON.stringify(habitData),
      });
      console.log('New habit response:', newHabit);
      
      // Ensure we have an id to work with
      const habitWithId = {
        ...newHabit,
        id: newHabit.id || newHabit._id,
      };
      
      setHabits(prev => [...prev, habitWithId]);
      toast({ title: 'Habit created', description: 'Your new habit has been saved.' });
    } catch (err: any) {
      console.error('Add habit error:', err.message);
      toast({ 
        title: 'Error creating habit', 
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  const completeHabit = async (id: string) => {
    try {
      const habit = habits.find(h => h.id === id || h._id === id);
      if (!habit) return;

      const updatedHabit = await fetchApi(`/habits/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ completed: !habit.completed }),
      });

      setHabits(prev => prev.map(h => (h.id === id || h._id === id) ? { ...updatedHabit, id: updatedHabit.id || updatedHabit._id } : h));
      toast({
        title: updatedHabit.completed ? 'Habit completed' : 'Marked incomplete',
        description: 'Status updated successfully.',
      });
    } catch (err: any) {
      console.error('Complete habit error:', err.message);
      toast({ 
        title: 'Error updating habit', 
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  const editHabit = (id: string) => {
    const habit = habits.find(h => h.id === id || h._id === id);
    if (habit) {
      setEditingHabit(habit);
      setIsFormOpen(true);
    }
  };

  const handleEditHabit = async (habitData: { title: string; description: string; category: string | null }) => {
    if (!editingHabit || !(editingHabit.id || editingHabit._id)) return;
    try {
      const habitId = editingHabit.id || editingHabit._id;
      const updated = await fetchApi(`/habits/${habitId}`, {
        method: 'PATCH',
        body: JSON.stringify(habitData),
      });

      setHabits(prev => prev.map(h => 
        (h.id === habitId || h._id === habitId) 
          ? { ...updated, id: updated.id || updated._id } 
          : h
      ));
      setEditingHabit(null);
      toast({ title: 'Habit updated', description: 'Changes saved successfully.' });
    } catch (err: any) {
      console.error('Edit habit error:', err.message);
      toast({ 
        title: 'Error updating habit', 
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  const deleteHabit = async (id: string) => {
    try {
      await fetchApi(`/habits/${id}`, { method: 'DELETE' });
      setHabits(prev => prev.filter(h => h.id !== id && h._id !== id));
      toast({ title: 'Habit deleted', variant: 'destructive' });
    } catch (err: any) {
      console.error('Delete habit error:', err.message);
      toast({ 
        title: 'Error deleting habit', 
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <HabitsContext.Provider
      value={{
        habits,
        addHabit,
        completeHabit,
        editHabit,
        deleteHabit,
        editingHabit,
        setEditingHabit,
        isFormOpen,
        setIsFormOpen,
        handleEditHabit,
      }}>
      {children}
    </HabitsContext.Provider>
  );
}

export const useHabitsContext = () => {
  const context = useContext(HabitsContext);
  if (!context) throw new Error('useHabitsContext must be used within a HabitsProvider');
  return context;
};
