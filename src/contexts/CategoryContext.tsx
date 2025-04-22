import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchApi } from '@/lib/utils';
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface CategoryContextType {
  categories: Category[];
  loadCategories: () => Promise<void>;
  addCategory: (name: string, color: string) => Promise<Category>;
  deleteCategory: (id: string) => Promise<void>;
}

const CategoryContext = createContext<CategoryContextType | undefined>(undefined);

export function CategoryProvider({ children }: { children: ReactNode }) {
  const [categories, setCategories] = useState<Category[]>([]);
  const { toast } = useToast();

  const loadCategories = async () => {
    try {
      const data = await fetchApi('/categories');
      const formattedCategories = data.map((cat: any) => ({
        id: cat.id || cat._id,
        name: cat.name,
        color: cat.color
      }));
      setCategories(formattedCategories);
    } catch (err: any) {
      console.error('Error loading categories:', err);
      toast({
        title: 'Error loading categories',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  const addCategory = async (name: string, color: string) => {
    try {
      const response = await fetchApi('/categories', {
        method: 'POST',
        body: JSON.stringify({ name, color })
      });

      const newCategory = {
        id: response.id || response._id,
        name: response.name,
        color: response.color
      };

      setCategories(prev => [...prev, newCategory]);
      return newCategory;
    } catch (err: any) {
      console.error('Error adding category:', err);
      toast({
        title: 'Error adding category',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await fetchApi(`/categories/${id}`, { method: 'DELETE' });
      setCategories(prev => prev.filter(category => category.id !== id));
    } catch (err: any) {
      console.error('Error deleting category:', err);
      toast({
        title: 'Error deleting category',
        description: err.message,
        variant: 'destructive'
      });
      throw err;
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{
      categories,
      loadCategories,
      addCategory,
      deleteCategory,
    }}>
      {children}
    </CategoryContext.Provider>
  );
}

export const useCategories = () => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error('useCategories must be used within a CategoryProvider');
  }
  return context;
};