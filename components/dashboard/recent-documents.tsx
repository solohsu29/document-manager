"use client";

import { useState } from "react";
import { 
  Download, 
  MoreHorizontal, 
  Pencil, 
  Star,
  Trash2, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

// Sample data - would normally come from the database
const recentDocuments = [
  {
    id: "1",
    title: "Q1 Financial Report",
    type: "PDF",
    size: "2.4 MB",
    tags: ["Finance", "Report"],
    updatedAt: new Date(2023, 3, 15),
  },
  {
    id: "2",
    title: "Marketing Strategy 2023",
    type: "DOCX",
    size: "1.8 MB",
    tags: ["Marketing", "Strategy"],
    updatedAt: new Date(2023, 3, 10),
  },
  {
    id: "3",
    title: "Product Launch Timeline",
    type: "XLSX",
    size: "956 KB",
    tags: ["Product", "Planning"],
    updatedAt: new Date(2023, 3, 5),
  },
  {
    id: "4",
    title: "Client Meeting Notes",
    type: "PDF",
    size: "1.2 MB",
    tags: ["Meeting", "Client"],
    updatedAt: new Date(2023, 3, 1),
  },
  {
    id: "5",
    title: "Design Assets",
    type: "ZIP",
    size: "8.7 MB",
    tags: ["Design", "Assets"],
    updatedAt: new Date(2023, 2, 25),
  },
];

export function RecentDocuments() {
  // This would normally use a context for favorites
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(itemId => itemId !== id) 
        : [...prev, id]
    );
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[40px]"></TableHead>
          <TableHead>Title</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Size</TableHead>
          <TableHead>Updated</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentDocuments.map((doc) => (
          <TableRow key={doc.id}>
            <TableCell>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => toggleFavorite(doc.id)}
                className="h-8 w-8"
              >
                <Star
                  className={`h-4 w-4 ${
                    favorites.includes(doc.id)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-muted-foreground"
                  }`}
                />
              </Button>
            </TableCell>
            <TableCell className="font-medium">
              <div className="flex flex-col">
                <span>{doc.title}</span>
                <div className="flex gap-1 mt-1">
                  {doc.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </TableCell>
            <TableCell>{doc.type}</TableCell>
            <TableCell>{doc.size}</TableCell>
            <TableCell>{format(doc.updatedAt, "MMM d, yyyy")}</TableCell>
            <TableCell className="text-right">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <span className="sr-only">Open menu</span>
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Download className="mr-2 h-4 w-4" />
                    <span>Download</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}