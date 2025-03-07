
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { RecordItem } from "@/components/dashboard/RecordItem";
import { Button } from "@/components/ui/button";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Syringe, 
  Stethoscope, 
  TestTube, 
  FileText, 
  PlusCircle,
  Search
} from "lucide-react";
import { Input } from "@/components/ui/input";

const MedicalRecords = () => {
  // Mock data for medical records
  const medicalRecords = [
    {
      id: "1",
      title: "Annual Vaccination",
      date: "May 15, 2023",
      childName: "Emma Johnson",
      category: "Vaccination",
      icon: <Syringe size={20} />,
      path: "/medical-records/1",
      isUnread: true,
    },
    {
      id: "2",
      title: "Pediatrician Checkup",
      date: "April 3, 2023",
      childName: "Noah Smith",
      category: "Medical",
      icon: <Stethoscope size={20} />,
      path: "/medical-records/2",
    },
    {
      id: "3",
      title: "Blood Test Results",
      date: "March 22, 2023",
      childName: "Olivia Williams",
      category: "Medical",
      icon: <TestTube size={20} />,
      path: "/medical-records/3",
    },
    {
      id: "4",
      title: "Prescription Renewal",
      date: "February 10, 2023",
      childName: "Emma Johnson",
      category: "Medical",
      icon: <FileText size={20} />,
      path: "/medical-records/4",
    },
  ];

  return (
    <PageTransition>
      <AppLayout userType="parent">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
              <p className="text-muted-foreground">
                View and manage your children's medical history
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              <span>Upload Record</span>
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-muted-foreground" />
            <Input 
              className="flex-1" 
              placeholder="Search medical records..." 
            />
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
              <TabsTrigger value="checkups">Check-ups</TabsTrigger>
              <TabsTrigger value="tests">Test Results</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              {medicalRecords.map((record, index) => (
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
            </TabsContent>
            <TabsContent value="vaccination" className="space-y-4">
              {medicalRecords
                .filter(record => record.category === "Vaccination")
                .map((record, index) => (
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
            </TabsContent>
            <TabsContent value="checkups" className="space-y-4">
              {medicalRecords
                .filter(record => record.category === "Medical" && record.title.includes("Checkup"))
                .map((record, index) => (
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
            </TabsContent>
            <TabsContent value="tests" className="space-y-4">
              {medicalRecords
                .filter(record => record.title.includes("Test"))
                .map((record, index) => (
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
            </TabsContent>
          </Tabs>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default MedicalRecords;
