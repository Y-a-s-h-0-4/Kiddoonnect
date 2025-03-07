
import { PageTransition } from "@/components/layout/PageTransition";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { 
  FilePlus, Users, FileText, CheckCircle, 
  AlertCircle, Calendar, Search, ChartBar
} from "lucide-react";
import { Link } from "react-router-dom";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecordItem } from "@/components/dashboard/RecordItem";
import { Input } from "@/components/ui/input";
import { HospitalAnalytics } from "@/components/dashboard/HospitalAnalytics";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const HospitalDashboard = () => {
  return (
    <PageTransition>
      <AppLayout userType="hospital">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Hospital Dashboard</h1>
              <p className="text-muted-foreground">
                Manage patient records and access medical information
              </p>
            </div>
            <Button asChild>
              <Link to="/add-record">
                <FilePlus size={16} className="mr-2" />
                Add Record
              </Link>
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Records Added" 
              value="124"
              description="Last 30 days"
              icon={<FileText size={18} />}
              color="blue"
              delay={0}
            />
            <StatsCard 
              title="Patients" 
              value="87"
              description="Active profiles"
              icon={<Users size={18} />}
              color="green"
              delay={1}
            />
            <StatsCard 
              title="Pending Approvals" 
              value="12"
              description="Records waiting for review"
              icon={<AlertCircle size={18} />}
              color="amber"
              delay={2}
            />
            <StatsCard 
              title="Upcoming Appointments" 
              value="28"
              description="Next 7 days"
              icon={<Calendar size={18} />}
              color="rose"
              delay={3}
            />
          </div>
          
          <Tabs defaultValue="records">
            <TabsList className="mb-4">
              <TabsTrigger value="records">Recent Records</TabsTrigger>
              <TabsTrigger value="analytics">
                <ChartBar size={14} className="mr-1" />
                Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="records" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Recent Records Added</h2>
                <Link to="/medical-records" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="flex items-center gap-2 mb-4">
                <Search size={18} className="text-muted-foreground" />
                <Input 
                  placeholder="Search records by name, type, or date..." 
                  className="flex-1"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <RecordItem
                  id="1"
                  title="Complete Blood Count Results"
                  date="Today, 2:15 PM"
                  childName="Emily Johnson"
                  category="Medical"
                  icon={<FileText size={16} />}
                  path="/medical-records/1"
                  isUnread={true}
                  delay={0}
                />
                
                <RecordItem
                  id="2"
                  title="Annual Check-up Report"
                  date="Yesterday, 10:30 AM"
                  childName="Michael Johnson"
                  category="Medical"
                  icon={<CheckCircle size={16} />}
                  path="/medical-records/2"
                  delay={1}
                />
                
                <RecordItem
                  id="3"
                  title="Vaccination - Influenza"
                  date="Oct 15, 2023"
                  childName="Sarah Thompson"
                  category="Vaccination"
                  icon={<FileText size={16} />}
                  path="/medical-records/3"
                  delay={2}
                />
                
                <RecordItem
                  id="4"
                  title="Allergy Test Results"
                  date="Oct 10, 2023"
                  childName="James Wilson"
                  category="Medical"
                  icon={<AlertCircle size={16} />}
                  path="/medical-records/4"
                  delay={3}
                />
                
                <RecordItem
                  id="5"
                  title="Physical Therapy Evaluation"
                  date="Oct 5, 2023"
                  childName="Emma Davis"
                  category="Medical"
                  icon={<FileText size={16} />}
                  path="/medical-records/5"
                  delay={4}
                />
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <HospitalAnalytics />
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default HospitalDashboard;
