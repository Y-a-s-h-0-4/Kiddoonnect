import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  FileText,
  Home,
  LogOut,
  Menu,
  Settings,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface AppLayoutProps {
  children: ReactNode;
  userType: "parent" | "hospital";
}

export const AppLayout = ({ children, userType }: AppLayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const isActive = (path: string) => location.pathname === path;

  const navigationItems = [
    {
      icon: Home,
      label: "Dashboard",
      path: userType === "parent" ? "/dashboard" : "/hospital-dashboard",
    },
    {
      icon: User,
      label: "Child Profiles",
      path: "/children",
      parentOnly: true,
    },
    {
      icon: FileText,
      label: "Medical Records",
      path: userType === "parent" ? "/medical-records" : "/add-record",
    },
    {
      icon: Calendar,
      label: "Activities",
      path: "/activities",
      parentOnly: true,
    },
    { icon: Settings, label: "Settings", path: "/settings" },
  ].filter((item) => (userType === "hospital" ? !item.parentOnly : true));

  const userBgColor =
    userType === "parent" ? "child-gradient" : "hospital-gradient";

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar for desktop */}
      <AnimatePresence>
        {(!isMobile || isMenuOpen) && (
          <motion.aside
            initial={isMobile ? { x: -280 } : { x: 0 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`${
              isMobile ? "fixed inset-y-0 left-0 z-50" : "relative"
            } w-64 border-r bg-card flex flex-col`}
          >
            <div className="p-4 flex items-center justify-between border-b">
              <Link
                to={
                  userType === "parent" ? "/dashboard" : "/hospital-dashboard"
                }
                className="flex items-center space-x-2"
              >
                <div
                  className={`w-50 h-10 rounded-full flex items-center justify-center  text-white font-bold text-xl`}
                >
                  <img
                    src="https://res.cloudinary.com/diwdkifv7/image/upload/v1741210986/kc_lmhfm3.png"
                    alt="Logo"
                    className="h-9"
                  />
                </div>
              </Link>
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={closeMenu}>
                  <X size={20} />
                </Button>
              )}
            </div>

            <div className="overflow-y-auto flex-1 py-4">
              <nav className="space-y-1 px-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-smooth ${
                      isActive(item.path)
                        ? `bg-primary text-primary-foreground`
                        : `hover:bg-muted text-muted-foreground hover:text-foreground`
                    }`}
                    onClick={isMobile ? closeMenu : undefined}
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="p-4 border-t">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src="" />
                    <AvatarFallback className={userBgColor}>
                      {userType === "parent" ? "JD" : "HC"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {userType === "parent" ? "Jane Doe" : "City Hospital"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {userType === "parent" ? "Parent" : "Healthcare Provider"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <Link to="/login">
                    <LogOut size={18} />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <header className="h-16 border-b flex items-center px-4 bg-card/80 backdrop-blur-sm sticky top-0 z-10">
          {isMobile && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="mr-4"
            >
              <Menu size={20} />
            </Button>
          )}
          <div className="text-lg font-medium">
            {userType === "parent" ? "Parent Portal" : "Hospital Portal"}
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
};
