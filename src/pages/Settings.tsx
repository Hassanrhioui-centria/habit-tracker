import React, { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CategoryManagement } from "@/components/settings/CategoryManagement";
import { DataManagement } from "@/components/settings/DataManagement";
import { AboutSection } from "@/components/settings/AboutSection";
import { fetchApi } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

interface Category {
  id: string;
  name: string;
  color: string;
}

const SettingsPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const [selectedColor, setSelectedColor] = useState("blue-500");
  const { toast } = useToast();

  useEffect(() => {
    loadCategories();
  }, []);

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

  const addCategory = async () => {
    if (newCategory.trim() === "") return;

    try {
      const response = await fetchApi('/categories', {
        method: 'POST',
        body: JSON.stringify({
          name: newCategory,
          color: selectedColor
        })
      });

      setCategories(prev => [...prev, {
        id: response.id || response._id,
        name: response.name,
        color: response.color
      }]);
      setNewCategory("");
      toast({
        title: 'Category added',
        description: 'New category has been created successfully.'
      });
    } catch (err: any) {
      console.error('Error adding category:', err);
      toast({
        title: 'Error adding category',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await fetchApi(`/categories/${id}`, { method: 'DELETE' });
      setCategories(prev => prev.filter(category => category.id !== id));
      toast({
        title: 'Category deleted',
        description: 'Category has been removed successfully.'
      });
    } catch (err: any) {
      console.error('Error deleting category:', err);
      toast({
        title: 'Error deleting category',
        description: err.message,
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <h1 className="text-3xl font-semibold text-gray-800 mb-2">Settings</h1>
        <p className="text-gray-500 mb-6">Customize your habit tracking experience</p>
        
        <Tabs defaultValue="categories" className="mb-6">
          <TabsList className="mb-6">
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="data">Data</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          
          <TabsContent value="categories">
            <CategoryManagement
              categories={categories}
              onDeleteCategory={deleteCategory}
              newCategory={newCategory}
              setNewCategory={setNewCategory}
              selectedColor={selectedColor}
              setSelectedColor={setSelectedColor}
              onAddCategory={addCategory}
            />
          </TabsContent>
          
          <TabsContent value="data">
            <DataManagement />
          </TabsContent>

          <TabsContent value="about">
            <AboutSection />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
