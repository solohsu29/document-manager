"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Menu } from "lucide-react";
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

export function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);
  // This would normally be fetched from the authentication context
  const isAdmin = true;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
        >
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="pr-0">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          <span className="font-semibold">DocManager</span>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="mt-4">
            <Link href="/dashboard/documents/new" className="w-full">
              <SheetClose asChild>
                <Button className="w-full justify-start">
                  <Plus className="mr-2 h-4 w-4" />
                  Upload Document
                </Button>
              </SheetClose>
            </Link>
          </div>
          <nav className="grid gap-1 py-4">
            {links.map((link) => {
              // Skip admin-only links for non-admin users
              if (link.admin && !isAdmin) return null;
              
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}