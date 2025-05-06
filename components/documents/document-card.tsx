import { format } from "date-fns";
import { FileIcon, MoreHorizontal } from "lucide-react";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
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

interface DocumentCardProps {
  document: Document;
}

export function DocumentCard({ document }: DocumentCardProps) {
  const getFileIcon = () => {
    switch (document.type) {
      case 'PDF':
        return { icon: 'file-text', bg: 'bg-red-100 text-red-500 dark:bg-red-900/20' };
      case 'DOCX':
        return { icon: 'file-text', bg: 'bg-blue-100 text-blue-500 dark:bg-blue-900/20' };
      case 'XLSX':
        return { icon: 'file-spreadsheet', bg: 'bg-green-100 text-green-500 dark:bg-green-900/20' };
      case 'ZIP':
        return { icon: 'file-archive', bg: 'bg-amber-100 text-amber-500 dark:bg-amber-900/20' };
      default:
        return { icon: 'file', bg: 'bg-gray-100 text-gray-500 dark:bg-gray-800' };
    }
  };
  
  const { bg } = getFileIcon();

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="p-4 pb-0">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className={cn('rounded p-2', bg)}>
              <FileIcon className="h-4 w-4" />
            </div>
            <span className="text-xs text-muted-foreground">{document.type}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0" aria-label="Menu">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Download</DropdownMenuItem>
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Share</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h3 className="font-medium line-clamp-1">{document.title}</h3>
        <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
          {document.description}
        </p>
        <div className="flex flex-wrap gap-1 mt-3">
          {document.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0 text-xs text-muted-foreground">
        <span>{document.size}</span>
        <span>Updated {format(document.updatedAt, "MMM d, yyyy")}</span>
      </CardFooter>
    </Card>
  );
}