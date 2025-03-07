
import { PageTransition } from "@/components/layout/PageTransition";
import { AppLayout } from "@/components/layout/AppLayout";
import { ChildProfileCard } from "@/components/dashboard/ChildProfileCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { Button } from "@/components/ui/button";
import { RecordItem } from "@/components/dashboard/RecordItem";
import { Plus, Calendar, FileText, AlertTriangle, Activity, ChartBar, Siren } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChildAnalytics } from "@/components/dashboard/ChildAnalytics";
import { EmergencySOS } from "@/components/dashboard/EmergencySOS";

const children = [
  {
    id: "1",
    name: "Emily Johnson",
    age: 8,
    bloodType: "O+",
    nextCheckup: "Oct 15, 2023",
    allergies: "Peanuts, Dairy",
    dob: "January 15, 2015",
    emergency: {
      contact: "Jane Johnson (Mother)",
      phone: "+1 (555) 123-4567",
      doctor: "Dr. Smith"
    }
  },
  {
    id: "2",
    name: "Michael Johnson",
    age: 6,
    bloodType: "A+",
    nextCheckup: "Nov 20, 2023",
    allergies: "Dust, Pollen",
    dob: "March 8, 2017",
    emergency: {
      contact: "Jane Johnson (Mother)",
      phone: "+1 (555) 123-4567",
      doctor: "Dr. Wilson"
    }
  }
];

// Recent records for dashboard
const recentRecords = [
  {
    id: "123",
    title: "Annual Check-up Report",
    date: "Oct 5, 2023",
    childName: "Emily Johnson",
    category: "Medical",
    icon: <FileText size={20} />,
    path: "/medical-records/123",
    isUnread: true,
  },
  {
    id: "456",
    title: "School Report Card",
    date: "Sep 30, 2023",
    childName: "Michael Johnson",
    category: "School",
    icon: <FileText size={20} />,
    path: "/school-records/456",
  },
  {
    id: "789",
    title: "Vaccination Record",
    date: "Sep 15, 2023",
    childName: "Emily Johnson",
    category: "Vaccination",
    icon: <FileText size={20} />,
    path: "/medical-records/789",
  }
];

const ParentDashboard = () => {
  const [selectedChild, setSelectedChild] = useState(children[0]);

  return (
    <PageTransition>
      <AppLayout userType="parent">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Monitor your children's health, education, and activities
              </p>
            </div>
            <div className="flex gap-2">
              <EmergencySOS childData={selectedChild} />
              <Button asChild>
                <Link to="/add-child">
                  <Plus size={16} className="mr-2" />
                  Add Child
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatsCard 
              title="Upcoming Vaccinations" 
              value="2"
              description="Next: Flu Shot (Oct 15)"
              icon={<FileText size={18} />}
              color="blue"
              delay={0}
            />
            <StatsCard 
              title="School Events" 
              value="3"
              description="Next: Parent-Teacher Meeting"
              icon={<Calendar size={18} />}
              color="green"
              delay={1}
            />
            <StatsCard 
              title="Medical Alerts" 
              value="1"
              description="Annual check-up due"
              icon={<AlertTriangle size={18} />}
              color="amber"
              delay={2}
            />
            <StatsCard 
              title="Activity Updates" 
              value="5"
              description="Swimming lesson tomorrow"
              icon={<Activity size={18} />}
              color="rose"
              delay={3}
            />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold tracking-tight">Child Profiles</h2>
              <Link to="/children" className="text-sm text-primary hover:underline">
                View all
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {children.map((child, index) => (
                <ChildProfileCard
                  key={child.id}
                  id={child.id}
                  name={child.name}
                  age={child.age}
                  bloodType={child.bloodType}
                  nextCheckup={child.nextCheckup}
                  allergies={child.allergies}
                  delay={index}
                />
              ))}
              <div className="w-full h-full min-h-[200px] flex items-center justify-center">
                <Button variant="outline" asChild className="h-auto aspect-square p-8 rounded-lg border-dashed">
                  <Link to="/add-child" className="flex flex-col items-center gap-2">
                    <Plus size={24} />
                    <span>Add Child</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          <Tabs defaultValue="records">
            <TabsList className="mb-4">
              <TabsTrigger value="records">Recent Records</TabsTrigger>
              <TabsTrigger value="analytics">
                <ChartBar size={14} className="mr-1" />
                Child Analytics
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="records" className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-semibold tracking-tight">Recent Records</h2>
                <Link to="/medical-records" className="text-sm text-primary hover:underline">
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentRecords.map((record, index) => (
                  <RecordItem
                    key={record.id}
                    id={record.id}
                    title={record.title}
                    date={record.date}
                    childName={record.childName}
                    category={record.category}
                    icon={record.icon}
                    path={record.path}
                    delay={index}
                    isUnread={record.isUnread}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold tracking-tight">Child Analytics</h2>
                <div className="space-x-2">
                  {children.map(child => (
                    <Button
                      key={child.id}
                      variant={selectedChild.id === child.id ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedChild(child)}
                    >
                      {child.name}
                    </Button>
                  ))}
                </div>
              </div>
              
              <ChildAnalytics 
                childName={selectedChild.name} 
                childAge={selectedChild.age} 
              />
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default ParentDashboard;
