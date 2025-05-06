"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Download,
  FileText,
  Filter,
  FolderIcon,
  Grid3X3,
  List,
  MoreHorizontal,
  Pencil,
  PlusCircle,
  Search,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DocumentCard } from "@/components/documents/document-card";
import { DocumentList } from "@/components/documents/document-list";

const documents = [
  {
    id: "1",
    title: "Q1 Financial Report",
    description: "Quarterly financial report for Q1 2023",
    type: "PDF",
    size: "2.4 MB",
    tags: ["Finance", "Report"],
    updatedAt: new Date(2023, 3, 15),
    thumbnail: null,
  },
  {
    id: "2",
    title: "Marketing Strategy 2023",
    description: "Annual marketing strategy document",
    type: "DOCX",
    size: "1.8 MB",
    tags: ["Marketing", "Strategy"],
    updatedAt: new Date(2023, 3, 10),
    thumbnail: null,
  },
  {
    id: "3",
    title: "Product Launch Timeline",
    description: "Timeline for upcoming product launches",
    type: "XLSX",
    size: "956 KB",
    tags: ["Product", "Planning"],
    updatedAt: new Date(2023, 3, 5),
    thumbnail: null,
  },
  {
    id: "4",
    title: "Client Meeting Notes",
    description: "Notes from client meeting on project scope",
    type: "PDF",
    size: "1.2 MB",
    tags: ["Meeting", "Client"],
    updatedAt: new Date(2023, 3, 1),
    thumbnail: null,
  },
  {
    id: "5",
    title: "Design Assets",
    description: "Compiled design assets for the website redesign",
    type: "ZIP",
    size: "8.7 MB",
    tags: ["Design", "Assets"],
    updatedAt: new Date(2023, 2, 25),
    thumbnail: null,
  },
  {
    id: "6",
    title: "HR Policy Update",
    description: "Updated HR policies for 2023",
    type: "PDF",
    size: "3.1 MB",
    tags: ["HR", "Policy"],
    updatedAt: new Date(2023, 2, 20),
    thumbnail: null,
  },
];

export default function DocumentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter documents based on search query
  const filteredDocuments = documents.filter((doc) =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold md:text-2xl">My Documents</h1>
        <Link href="/dashboard/documents/new">
          <Button size="sm">
            <PlusCircle className="mr-2 h-4 w-4" />
            Upload Document
          </Button>
        </Link>
      </div>
      
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search documents..."
            className="pl-8 w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Tabs 
            defaultValue="grid" 
            value={viewMode}
            onValueChange={(value) => setViewMode(value as "grid" | "list")}
            className="hidden sm:block"
          >
            <TabsList className="grid w-16 grid-cols-2">
              <TabsTrigger value="grid" className="p-1.5">
                <Grid3X3 className="h-4 w-4" />
              </TabsTrigger>
              <TabsTrigger value="list" className="p-1.5">
                <List className="h-4 w-4" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      <div className="flex-1">
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredDocuments.map((doc) => (
              <DocumentCard key={doc.id} document={doc} />
            ))}
          </div>
        ) : (
          <DocumentList documents={filteredDocuments} />
        )}
        
        {filteredDocuments.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-2 rounded-lg border border-dashed p-8 text-center">
            <div className="rounded-full bg-background p-3">
              <FileText className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold">No documents found</h3>
            <p className="text-sm text-muted-foreground max-w-xs">
              {searchQuery 
                ? `No documents matching "${searchQuery}" were found. Try a different search term.` 
                : "You don't have any documents yet. Upload a document to get started."}
            </p>
            <Link href="/dashboard/documents/new" className="mt-4">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Upload Document
              </Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}