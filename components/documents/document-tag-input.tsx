"use client";

import { useState, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface DocumentTagInputProps {
  value: string[];
  onChange: (value: string[]) => void;
}

export function DocumentTagInput({ value, onChange }: DocumentTagInputProps) {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = () => {
    if (inputValue.trim() !== "" && !value.includes(inputValue.trim())) {
      const newTags = [...value, inputValue.trim()];
      onChange(newTags);
      setInputValue("");
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    } else if (e.key === "Backspace" && inputValue === "" && value.length > 0) {
      const newTags = [...value];
      newTags.pop();
      onChange(newTags);
    }
  };

  const handleRemoveTag = (tag: string) => {
    const newTags = value.filter((t) => t !== tag);
    onChange(newTags);
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2 mb-2">
        {value.map((tag) => (
          <Badge key={tag} variant="secondary">
            {tag}
            <Button
              variant="ghost"
              size="icon"
              className="h-4 w-4 ml-1 p-0"
              onClick={() => handleRemoveTag(tag)}
            >
              <X className="h-3 w-3" />
              <span className="sr-only">Remove {tag}</span>
            </Button>
          </Badge>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a tag and press Enter"
          className="flex-1"
        />
        <Button 
          type="button" 
          variant="secondary" 
          onClick={handleAddTag}
          disabled={inputValue.trim() === ""}
        >
          Add
        </Button>
      </div>
    </div>
  );
}