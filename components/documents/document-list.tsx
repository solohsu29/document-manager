import { format } from "date-fns";
import { 
  Download, 
  FileIcon, 
  MoreHorizontal, 
  Pencil, 
  Trash2 
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
import { cn } from "@/lib/utils";

interface Document {
  id: string;
  title: string;
  description: string;
  type: string;
  size: string;
  tags: string[];
  updatedAt: Date;
  thumbnail: string | null;
}

interface DocumentListProps {
  documents: Document[];
}

export function DocumentList({ documents }: DocumentListProps) {
  const getFileIconClass = (type: string) => {
    switch (type) {
      case 'PDF':
        return 'bg-red-100 text-red-500 dark:bg-red-900/20';
      case 'DOCX':
        return 'bg-blue-100 text-blue-500 dark:bg-blue-900/20';
      case 'XLSX':
        return 'bg-green-100 text-green-500 dark:bg-green-900/20';
      case 'ZIP':
        return 'bg-amber-100 text-amber-500 dark:bg-amber-900/20';
      default:
        return 'bg-gray-100 text-gray-500 dark:bg-gray-800';
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[30%]">Title</TableHead>
            <TableHead className="hidden md:table-cell">Type</TableHead>
            <TableHead className="hidden md:table-cell">Size</TableHead>
            <TableHead className="hidden sm:table-cell">Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {documents.map((doc) => (
            <TableRow key={doc.id}>
              <TableCell className="font-medium">
                <div className="flex items-center space-x-3">
                  <div className={cn('rounded p-2', getFileIconClass(doc.type))}>
                    <FileIcon className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="font-medium">{doc.title}</div>
                    <div className="hidden lg:flex gap-1 mt-1">
                      {doc.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{doc.type}</TableCell>
              <TableCell className="hidden md:table-cell">{doc.size}</TableCell>
              <TableCell className="hidden sm:table-cell">
                {format(doc.updatedAt, "MMM d, yyyy")}
              </TableCell>
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
    </div>
  );
}