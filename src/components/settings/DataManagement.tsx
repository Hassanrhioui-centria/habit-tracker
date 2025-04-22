import React from "react";
import { Card } from "@/components/ui/card";
import Button from "@/components/ui/button";

export const DataManagement = () => {
  return (
    <Card className="p-6">
      <h2 className="text-xl font-semibold mb-4">Data Management</h2>
      <p className="text-gray-500 mb-6">Manage your habit tracking data</p>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-medium mb-2">Export Data</h3>
          <Button variant="outline">Export as CSV</Button>
        </div>
        
        <div className="pt-4 border-t">
          <h3 className="font-medium mb-2 text-red-600">Danger Zone</h3>
          <Button variant="destructive">Reset All Data</Button>
        </div>
      </div>
    </Card>
  );
};
