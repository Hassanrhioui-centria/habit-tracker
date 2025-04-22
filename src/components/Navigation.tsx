
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutGrid, Calendar, Award, LineChart, Settings } from "lucide-react";

const Navigation = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { icon: LayoutGrid, label: "Today", path: "/" },
    { icon: Calendar, label: "Calendar", path: "/calendar" },
    { icon: Award, label: "Achievements", path: "/achievements" },
    { icon: LineChart, label: "Insights", path: "/insights" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 px-4 z-10">
      {navItems.map((item) => (
        <Link
          key={item.path}
          to={item.path}
          className={`flex flex-col items-center p-2 ${isActive(item.path) ? "text-primary" : "text-gray-500"
            }`}
        >
          <item.icon className="h-5 w-5" />
          <span className="text-xs mt-1">{item.label}</span>
        </Link>
      ))}
    </div>
  );
};

export default Navigation;
