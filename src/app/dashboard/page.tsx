"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  User,
  ClipboardList,
  Edit,
  CheckSquare,
  Menu,
  X,
  LogOut,
} from "lucide-react";

import Profile from "@/components/adminpanelcomponents/Profile";
import Users from "@/components/adminpanelcomponents/Users";
import ResidentialProperties from "@/components/adminpanelcomponents/ResidentialProperties";
import Amenities from "@/components/adminpanelcomponents/Amenities";
import PropertyInquiries from "@/components/adminpanelcomponents/PropertyInquiries";
import DashboardHeader from "@/components/adminpanelcomponents/DashboardHeader";
import { useRouter } from "next/navigation";
// import { signOut } from "firebase/auth";
import CommercialProperties from "@/components/adminpanelcomponents/CommercialProperties";
import ContactFormInquiries from "@/components/adminpanelcomponents/ContactFormInquiries";

// Sidebar item type
interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

// Sidebar items list with icons
const sidebarItems: SidebarItem[] = [
  { id: "profile", label: "Profile", icon: <User className="w-5 h-5" /> },
  { id: "users", label: "Users", icon: <LayoutDashboard className="w-5 h-5" /> },
  { id: "residentialproperties", label: "Residential Properties", icon: <ClipboardList className="w-5 h-5" /> },
  { id: "commercialproperties", label: "Commercial Properties", icon: <ClipboardList className="w-5 h-5" /> },
  { id: "amenities", label: "Amenities", icon: <Edit className="w-5 h-5" /> },
  { id: "propertyinquiries", label: "Property Inquiries", icon: <CheckSquare className="w-5 h-5" /> },
  { id: "contactinquiries", label: "Contact Form Inquiries", icon: <CheckSquare className="w-5 h-5" /> },
];

export default function Dashboard() {
  // const router = useRouter();
  const [active, setActive] = useState("profile");
  const [collapsed, setCollapsed] = useState(false);


  const renderContent = () => {
    switch (active) {
      case "profile":
        return <Profile />;
      case "users":
        return <Users />;
      case "residentialproperties":
        return <ResidentialProperties />;
        case "commercialproperties":
        return <CommercialProperties />;
      case "amenities":
        return <Amenities />;
      case "propertyinquiries":
        return <PropertyInquiries />;
        case "contactinquiries":
        return <ContactFormInquiries />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <aside
        className={cn(
          "bg-white border-r border-gray-200 flex flex-col duration-300",
          collapsed ? "w-20" : "w-64"
        )}
      >
        <div className="flex items-center justify-between p-6 border-b border-gray-200 min-h-[81px]">
          {!collapsed && (
            <h2 className="text-2xl font-bold tracking-tight">Admin Panel</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-600 hover:text-gray-900"
            onClick={() => setCollapsed(!collapsed)}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <Menu className="w-6 h-6 text-gray-800" />
            ) : (
              <X className="w-6 h-6 text-gray-800" />
            )}
          </Button>
        </div>

        <nav className="flex-1 px-2 py-4 space-y-2 overflow-y-auto">
          {sidebarItems.map(({ id, label, icon }) => (
            <Button
              key={id}
              variant="ghost"
              onClick={() => setActive(id)}
              className={cn(
                "w-full gap-3 flex items-center",
                collapsed ? "justify-center" : "justify-start",
                active === id
                  ? "bg-gray-800 text-white hover:bg-gray-900 hover:text-white"
                  : "text-gray-800 hover:bg-gray-200"
              )}
            >
              {icon}
              {!collapsed && <span className="truncate">{label}</span>}
            </Button>
          ))}

          {/* Logout Button */}
            <Button
            variant="ghost"
            onClick={() => {}}
            className={cn(
              "w-full gap-3 flex items-center mt-6",
              collapsed ? "justify-center" : "justify-start",
              "text-red-600 hover:bg-red-100"
            )}
            >
            <LogOut className="w-5 h-5" />
            {!collapsed && <span className="truncate font-semibold">Logout</span>}
            </Button>
        </nav>

        {!collapsed && (
          <footer className="p-6 border-t border-gray-200 text-sm text-gray-500">
            &copy; 2025 Admin System
          </footer>
        )}
      </aside>

      <main className="flex-1 overflow-auto">
        <DashboardHeader />
        <div className="flex-1 p-10">{renderContent()}</div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease forwards;
        }
      `}</style>
    </div>
  );
}
