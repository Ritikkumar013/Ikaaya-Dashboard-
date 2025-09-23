import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell } from "lucide-react";

export default function DashboardHeader() {
  return (
    <header className="flex items-center justify-end border-b border-gray-200 p-5 min-h-[81px]">

      {/* Actions Section */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" className="relative p-2 rounded-full">
          <Bell className="w-6 h-6 text-gray-600" />
          {/* Optional notification dot */}
          <span className="absolute top-1 right-1 inline-block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
        </Button>

        <Avatar>
          <AvatarImage src="https://avatars.githubusercontent.com/u/9919?s=200&v=4" alt="User Avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
