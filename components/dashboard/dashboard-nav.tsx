"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  FolderOpen,
  Tags,
  Settings,
  FileText,
  Users,
  Plus,
  Search,
  BarChart,
} from "lucide-react";

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
  admin?: boolean;
}

const links: NavLink[] = [
  {
    href: "/dashboard",
    label: "Overview",
    icon: <LayoutDashboard className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/documents",
    label: "My Documents",
    icon: <FileText className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/folders",
    label: "Folders",
    icon: <FolderOpen className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/tags",
    label: "Tags",
    icon: <Tags className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/search",
    label: "Search",
    icon: <Search className="mr-2 h-4 w-4" />,
  },
  {
    href: "/dashboard/analytics",
    label: "Analytics",
    icon: <BarChart className="mr-2 h-4 w-4" />,
    admin: true,
  },
  {
    href: "/dashboard/users",
    label: "Users",
    icon: <Users className="mr-2 h-4 w-4" />,
    admin: true,
  },
  {
    href: "/dashboard/settings",
    label: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
  },
];

export function DashboardNav() {
  const pathname = usePathname();
  // This would normally be fetched from the authentication context
  const isAdmin = true;

  return (
    <div className="flex h-full w-full flex-col gap-2 p-4">
      <div className="flex h-12 items-center">
        <Link 
          href="/dashboard/documents/new" 
          className="w-full"
        >
          <Button className="w-full justify-start">
            <Plus className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>
      
      <nav className="grid gap-1 py-2">
        {links.map((link) => {
          // Skip admin-only links for non-admin users
          if (link.admin && !isAdmin) return null;
          
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                pathname === link.href ? "bg-accent text-accent-foreground" : "transparent"
              )}
            >
              {link.icon}
              <span>{link.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}