
import { motion } from "framer-motion";
import { ChevronRight, Calendar, AlertTriangle, Droplet } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";

interface ChildProfileCardProps {
  id: string;
  name: string;
  age: number;
  avatarUrl?: string;
  bloodType: string;
  nextCheckup: string;
  allergies: string;
  delay?: number;
}

export function ChildProfileCard({ 
  id, 
  name, 
  age, 
  avatarUrl, 
  bloodType, 
  nextCheckup, 
  allergies, 
  delay = 0 
}: ChildProfileCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      whileHover={{ y: -5 }}
      className="w-full"
    >
      <Link to={`/children/${id}`}>
        <Card className="overflow-hidden card-hover border border-border/50">
          <CardContent className="p-0">
            <div className="relative">
              <div className="h-20 child-gradient" />
              <Avatar className="absolute -bottom-10 left-4 h-20 w-20 border-4 border-background">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
            </div>
            
            <div className="pt-12 pb-4 px-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-muted-foreground text-sm">{age} years old</p>
                </div>
                <div className="flex items-center gap-1 bg-secondary rounded-full px-3 py-1 text-xs font-medium">
                  <Droplet size={12} className="text-red-500" />
                  <span>Blood: {bloodType}</span>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-blue-500 shrink-0" />
                  <p>Next checkup: {nextCheckup}</p>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                  <p>Allergies: {allergies}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-border/50">
                <span className="text-sm font-medium text-primary">View profile</span>
                <ChevronRight size={16} className="text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}
