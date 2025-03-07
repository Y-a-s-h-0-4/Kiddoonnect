
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, FileText, Stethoscope, Calendar, Award, User, Upload, AlertTriangle, Droplet, CreditCard, Heart } from "lucide-react";
import { RecordItem } from "@/components/dashboard/RecordItem";
import { toast } from "sonner";

const ChildDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);
  
  // Mock data for the child profile
  const childData = {
    id: id,
    name: "Emma Johnson",
    age: 7,
    bloodType: "A+",
    dob: "January 15, 2016",
    nextCheckup: "October 15, 2023",
    allergies: "Peanuts, Penicillin",
    fatherName: "Robert Johnson",
    motherName: "Jane Johnson",
    birthmark: "Small birthmark on right shoulder",
    aadharNumber: "123456789012",
    emergency: {
      contact: "Jane Johnson (Mother)",
      phone: "+1 (555) 123-4567",
      doctor: "Dr. Smith",
    }
  };
  
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setAvatarUrl(e.target.result as string);
          toast.success("Photo uploaded successfully");
        }
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Mock medical records for this child
  const medicalRecords = [
    {
      id: "1",
      title: "Annual Vaccination",
      date: "May 15, 2023",
      childName: childData.name,
      category: "Vaccination",
      icon: <Stethoscope size={16} />,
      path: `/medical-records/1`,
      isUnread: true,
    },
    {
      id: "2",
      title: "Pediatrician Checkup",
      date: "April 3, 2023",
      childName: childData.name,
      category: "Medical",
      icon: <FileText size={16} />,
      path: `/medical-records/2`,
    }
  ];
  
  // Mock school records
  const schoolRecords = [
    {
      id: "1",
      title: "Report Card - Q2",
      date: "January 15, 2023",
      childName: childData.name,
      category: "School",
      icon: <FileText size={16} />,
      path: `/school-records/1`,
    }
  ];
  
  // Mock activity records
  const activityRecords = [
    {
      id: "1",
      title: "Swimming Certificate",
      date: "March 10, 2023",
      childName: childData.name,
      category: "Activity",
      icon: <Award size={16} />,
      path: `/activities/1`,
    }
  ];
  
  return (
    <PageTransition>
      <AppLayout userType="parent">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Button 
              variant="outline" 
              size="icon" 
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <ArrowLeft size={16} />
            </Button>
            <h1 className="text-2xl font-bold tracking-tight">Child Profile</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Profile Card */}
            <Card className="md:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User size={18} />
                  <span>Profile</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center gap-3 mb-4">
                  <div className="relative group">
                    <div className="h-24 w-24 rounded-full flex items-center justify-center text-2xl font-semibold bg-primary text-primary-foreground overflow-hidden">
                      {avatarUrl ? (
                        <img src={avatarUrl} alt={childData.name} className="h-full w-full object-cover" />
                      ) : (
                        childData.name.split(' ').map(n => n[0]).join('')
                      )}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                        <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center text-white">
                          <Upload size={20} />
                        </label>
                      </div>
                    </div>
                    <input 
                      id="photo-upload" 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handlePhotoUpload}
                    />
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full">
                      <Upload size={14} />
                      <span>Upload Photo</span>
                    </label>
                  </Button>
                </div>
                
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold">{childData.name}</h3>
                    <p className="text-sm text-muted-foreground">{childData.age} years old</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <h4 className="text-sm font-medium mb-1">Date of Birth</h4>
                    <p className="text-xs">{childData.dob}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <h4 className="text-sm font-medium mb-1">Parents</h4>
                    <p className="text-xs">Father: {childData.fatherName}</p>
                    <p className="text-xs">Mother: {childData.motherName}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 py-2">
                    <div className="bg-muted p-2 rounded-md text-center flex-1 flex items-center justify-center gap-1">
                      <Droplet size={14} className="text-red-500" />
                      <div>
                        <p className="text-xs text-muted-foreground">Blood Type</p>
                        <p className="font-medium">{childData.bloodType}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Calendar size={16} className="text-blue-500" />
                      <h4 className="text-sm font-medium">Next Checkup</h4>
                    </div>
                    <p className="text-xs pl-6">{childData.nextCheckup}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle size={16} className="text-amber-500" />
                      <h4 className="text-sm font-medium">Allergies</h4>
                    </div>
                    <p className="text-xs pl-6">{childData.allergies}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Heart size={16} className="text-pink-500" />
                      <h4 className="text-sm font-medium">Birthmark</h4>
                    </div>
                    <p className="text-xs pl-6">{childData.birthmark}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <div className="flex items-center gap-2 mb-2">
                      <CreditCard size={16} className="text-gray-500" />
                      <h4 className="text-sm font-medium">Aadhar Number</h4>
                    </div>
                    <p className="text-xs pl-6">{childData.aadharNumber}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <h4 className="text-sm font-medium mb-1">Emergency Contact</h4>
                    <p className="text-xs">{childData.emergency.contact}</p>
                    <p className="text-xs">{childData.emergency.phone}</p>
                  </div>
                  
                  <div className="border-t pt-2">
                    <h4 className="text-sm font-medium mb-1">Doctor</h4>
                    <p className="text-xs">{childData.emergency.doctor}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Records Tabs */}
            <Card className="md:col-span-3">
              <CardContent className="pt-6">
                <Tabs defaultValue="medical">
                  <TabsList className="grid grid-cols-3 mb-6">
                    <TabsTrigger value="medical">Medical Records</TabsTrigger>
                    <TabsTrigger value="school">School Records</TabsTrigger>
                    <TabsTrigger value="activities">Activities</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="medical" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">Medical Records</h2>
                      <Button variant="outline" size="sm" onClick={() => navigate("/medical-records")}>
                        View All
                      </Button>
                    </div>
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
                  
                  <TabsContent value="school" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">School Records</h2>
                      <Button variant="outline" size="sm">
                        View All
                      </Button>
                    </div>
                    {schoolRecords.map((record, index) => (
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
                      />
                    ))}
                  </TabsContent>
                  
                  <TabsContent value="activities" className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h2 className="text-lg font-medium">Activity Records</h2>
                      <Button variant="outline" size="sm" onClick={() => navigate("/activities")}>
                        View All
                      </Button>
                    </div>
                    {activityRecords.map((record, index) => (
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
                      />
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default ChildDetail;
