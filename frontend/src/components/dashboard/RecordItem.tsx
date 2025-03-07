
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface RecordItemProps {
  id: string;
  title: string;
  date: string;
  childName: string;
  category: string;
  icon: ReactNode;
  path: string;
  delay?: number;
  isUnread?: boolean;
}

export function RecordItem({ 
  id, 
  title, 
  date, 
  childName, 
  category, 
  icon, 
  path, 
  delay = 0,
  isUnread = false
}: RecordItemProps) {
  let categoryColor = "";
  
  switch (category.toLowerCase()) {
    case "vaccination":
    case "medical":
      categoryColor = "bg-blue-100 text-blue-700";
      break;
    case "school":
      categoryColor = "bg-green-100 text-green-700";
      break;
    case "activity":
      categoryColor = "bg-amber-100 text-amber-700";
      break;
    default:
      categoryColor = "bg-gray-100 text-gray-700";
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="w-full"
    >
      <Link to={path}>
        <Card className={cn(
          "overflow-hidden card-hover border border-border/50",
          isUnread && "ring-2 ring-primary/20"
        )}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={`h-10 w-10 rounded-full flex items-center justify-center ${categoryColor} mt-1`}>
                  {icon}
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{title}</h3>
                    {isUnread && <Badge variant="default" className="text-[10px] px-1.5 py-0">New</Badge>}
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{childName} • {date}</p>
                  <Badge variant="outline" className="mt-1 font-normal">
                    {category}
                  </Badge>
                </div>
              </div>
              <ChevronRight size={16} className="text-muted-foreground mt-2" />
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
