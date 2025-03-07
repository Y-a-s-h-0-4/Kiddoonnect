
import { useState } from "react";
import { Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

// Mock data for child profiles
const childrenData = [
  { id: "1", name: "Emma Johnson", age: 7, parentName: "Jane Johnson" },
  { id: "2", name: "Noah Smith", age: 5, parentName: "Sarah Smith" },
  { id: "3", name: "Olivia Williams", age: 9, parentName: "Michael Williams" },
  { id: "4", name: "James Wilson", age: 6, parentName: "Emily Wilson" },
  { id: "5", name: "Emma Davis", age: 8, parentName: "Robert Davis" },
];

interface ChildSearchProps {
  onSelectChild?: (childId: string, childName: string) => void;
}

export function ChildSearch({ onSelectChild }: ChildSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const filteredChildren = childrenData.filter(child => 
    child.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    child.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    child.parentName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSelectChild = (childId: string, childName: string) => {
    if (onSelectChild) {
      onSelectChild(childId, childName);
      setIsOpen(false);
    } else {
      navigate(`/add-record?childId=${childId}&childName=${encodeURIComponent(childName)}`);
      setIsOpen(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search child by ID or name..."
            className="pl-10"
            readOnly
            onClick={() => setIsOpen(true)}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Child</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Input
            placeholder="Enter child ID, name, or parent name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          
          <div className="max-h-[300px] overflow-y-auto space-y-2">
            {filteredChildren.length === 0 ? (
              <div className="text-center py-4 text-muted-foreground">
                No results found
              </div>
            ) : (
              filteredChildren.map((child) => (
                <Card key={child.id} className="cursor-pointer hover:bg-secondary/20" onClick={() => handleSelectChild(child.id, child.name)}>
                  <CardContent className="p-3 flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                      <User size={16} />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{child.name}</p>
                      <div className="flex items-center text-xs text-muted-foreground space-x-2">
                        <span>ID: {child.id}</span>
                        <span>•</span>
                        <span>Parent: {child.parentName}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
