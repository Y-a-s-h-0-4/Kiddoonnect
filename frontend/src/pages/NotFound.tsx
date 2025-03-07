
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <div className="text-center max-w-md mx-auto">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <div className="relative w-32 h-32 mx-auto">
              <div className="absolute inset-0 bg-primary/10 rounded-full animate-pulse-slow" />
              <div className="absolute inset-2 bg-primary/20 rounded-full animate-pulse-slow animation-delay-200" />
              <div className="absolute inset-4 bg-primary/30 rounded-full flex items-center justify-center font-bold text-6xl animate-pulse-slow animation-delay-400 text-primary">
                404
              </div>
            </div>
          </motion.div>
          
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold mb-2"
          >
            Page not found
          </motion.h1>
          
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-muted-foreground mb-6"
          >
            The page you are looking for doesn't exist or has been moved.
          </motion.p>
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <Button asChild>
              <Link to="/">Return to home</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default NotFound;
