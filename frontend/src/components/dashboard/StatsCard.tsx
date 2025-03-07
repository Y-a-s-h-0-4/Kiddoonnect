
import { ReactNode } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: ReactNode;
  delay?: number;
  color?: "blue" | "green" | "amber" | "rose";
}

export function StatsCard({ 
  title, 
  value, 
  description, 
  icon, 
  delay = 0,
  color = "blue" 
}: StatsCardProps) {
  const colorVariants = {
    blue: "from-blue-500/20 to-blue-500/5 text-blue-700",
    green: "from-green-500/20 to-green-500/5 text-green-700",
    amber: "from-amber-500/20 to-amber-500/5 text-amber-700",
    rose: "from-rose-500/20 to-rose-500/5 text-rose-700"
  };
  
  const bgGradient = colorVariants[color];
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: delay * 0.1 }}
      className="w-full"
    >
      <Card className="overflow-hidden card-hover border border-border/50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-muted-foreground">{title}</h3>
            <div className={`flex items-center justify-center p-2 rounded-full bg-gradient-to-br ${bgGradient}`}>
              {icon}
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-2xl font-bold">{value}</p>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
