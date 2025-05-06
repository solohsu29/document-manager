"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { FileIcon, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploaderProps {
  onFileSelect: (file: File) => void;
  maxSize?: number; // in bytes
  acceptedFileTypes?: string[];
}

export function FileUploader({
  onFileSelect,
  maxSize = 10 * 1024 * 1024, // 10MB
  acceptedFileTypes = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/zip",
    "application/x-zip-compressed",
    "image/jpeg",
    "image/png",
  ],
}: FileUploaderProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        const { code } = rejectedFiles[0].errors[0];
        if (code === "file-too-large") {
          setError(`File is too large. Max size is ${maxSize / (1024 * 1024)}MB`);
        } else if (code === "file-invalid-type") {
          setError("File type not supported");
        } else {
          setError("Error uploading file");
        }
        return;
      }

      if (acceptedFiles.length > 0) {
        const file = acceptedFiles[0];
        setSelectedFile(file);
        setError(null);
        onFileSelect(file);
      }
    },
    [maxSize, onFileSelect]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 1,
  });

  const removeFile = () => {
    setSelectedFile(null);
    setError(null);
  };

  const getFileIcon = () => {
    if (!selectedFile) return null;
    
    if (selectedFile.type.includes("pdf")) {
      return <FileIcon className="h-8 w-8 text-red-500" />;
    } else if (selectedFile.type.includes("word")) {
      return <FileIcon className="h-8 w-8 text-blue-500" />;
    } else if (selectedFile.type.includes("excel") || selectedFile.type.includes("sheet")) {
      return <FileIcon className="h-8 w-8 text-green-500" />;
    } else if (selectedFile.type.includes("zip")) {
      return <FileIcon className="h-8 w-8 text-amber-500" />;
    } else if (selectedFile.type.includes("image")) {
      return <FileIcon className="h-8 w-8 text-purple-500" />;
    } else {
      return <FileIcon className="h-8 w-8 text-gray-500" />;
    }
  };

  return (
    <div className="w-full">
      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={cn(
            "flex flex-col items-center justify-center rounded-md border border-dashed border-input p-6 cursor-pointer transition-colors",
            isDragActive
              ? "border-primary/50 bg-primary/5"
              : "hover:border-primary/50 hover:bg-primary/5",
            error && "border-destructive/50 bg-destructive/5 hover:border-destructive hover:bg-destructive/10"
          )}
        >
          <input {...getInputProps()} />
          <UploadCloud className={cn("h-10 w-10 mb-3", error ? "text-destructive" : "text-muted-foreground")} />
          <div className="text-center">
            <p className="text-sm font-medium mb-1">Drag & drop your file here</p>
            <p className="text-xs text-muted-foreground mb-3">
              Supported formats: PDF, Word, Excel, Zip, Images
            </p>
            <Button size="sm" variant="secondary" type="button">
              Browse Files
            </Button>
          </div>
          {error && <p className="text-xs text-destructive mt-3">{error}</p>}
        </div>
      ) : (
        <div className="flex items-center gap-3 rounded-md border p-3">
          {getFileIcon()}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{selectedFile.name}</p>
            <p className="text-xs text-muted-foreground">
              {(selectedFile.size / 1024).toFixed(0)} KB
            </p>
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8"
            onClick={removeFile}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  );
}