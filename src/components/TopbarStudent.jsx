import React from "react";
import { Bell } from "lucide-react";

export default function TopbarStudent() {
  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b flex justify-end items-center px-6 shadow-sm z-40">
      <button className="relative p-2 hover:bg-gray-100 rounded-full transition">
        <Bell size={22} />
        <span className="absolute top-1 right-1 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
          2
        </span>
      </button>
    </div>
  );
}
