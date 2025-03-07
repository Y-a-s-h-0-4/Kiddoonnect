import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { PageTransition } from "@/components/layout/PageTransition";
import { AppLayout } from "@/components/layout/AppLayout";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  ArrowLeft,
  FileText,
  Calendar,
  User,
  Clock,
  Pill,
  Hospital,
  Printer,
  Download,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { jsPDF } from "jspdf";

// Mock data for medical records
const medicalRecordsData = [
  {
    id: "1",
    title: "Annual Vaccination",
    date: "May 15, 2023",
    time: "10:30 AM",
    childName: "Emma Johnson",
    childId: "1",
    childAge: "8 years",
    childImage: "",
    doctor: "Dr. Sarah Williams",
    hospital: "City Children's Hospital",
    category: "Vaccination",
    status: "Completed",
    description:
      "Emma received her annual flu vaccination as scheduled. No adverse reactions were observed during the 15-minute monitoring period post-vaccination.",
    details: {
      vaccineName: "Influenza (Flu) Vaccine",
      manufacturer: "GlaxoSmithKline",
      batchNumber: "FL-2023-0542",
      site: "Left deltoid",
      nextDose: "May 2024",
      notes: "Patient tolerated the procedure well. No immediate side effects.",
    },
    recommendations:
      "Monitor for any delayed reactions such as fever or soreness at the injection site. Paracetamol may be given if needed for discomfort.",
    attachments: [
      { name: "Vaccination_Certificate.pdf", type: "pdf", size: "245 KB" },
      { name: "Information_Sheet.pdf", type: "pdf", size: "128 KB" },
    ],
  },
  {
    id: "2",
    title: "Pediatrician Checkup",
    date: "April 3, 2023",
    time: "2:15 PM",
    childName: "Noah Smith",
    childId: "2",
    childAge: "6 years",
    childImage: "",
    doctor: "Dr. Michael Chen",
    hospital: "Family Wellness Center",
    category: "Medical",
    status: "Completed",
    description:
      "Routine pediatric check-up including growth assessment, developmental screening, and general health evaluation.",
    details: {
      height: "112 cm (50th percentile)",
      weight: "20 kg (45th percentile)",
      temperature: "36.8°C",
      bloodPressure: "95/60 mmHg",
      heartRate: "90 bpm",
      respiratoryRate: "22 breaths/min",
      vision: "20/25 both eyes",
      hearing: "Normal",
      notes:
        "Growth and development appropriate for age. No concerns identified during examination.",
    },
    recommendations:
      "Continue balanced diet and regular physical activity. Next routine check-up in 6 months.",
    attachments: [
      { name: "Growth_Chart.pdf", type: "pdf", size: "310 KB" },
      { name: "Checkup_Summary.pdf", type: "pdf", size: "175 KB" },
    ],
  },
  {
    id: "3",
    title: "Blood Test Results",
    date: "March 22, 2023",
    time: "9:45 AM",
    childName: "Olivia Williams",
    childId: "3",
    childAge: "7 years",
    childImage: "",
    doctor: "Dr. Emily Rodriguez",
    hospital: "Metropolitan Medical Lab",
    category: "Medical",
    status: "Completed",
    description:
      "Complete blood count (CBC) and basic metabolic panel as part of annual health assessment.",
    details: {
      hemoglobin: "13.5 g/dL (Normal range: 11.5-15.5)",
      whiteBloodCells: "7.0 x 10^9/L (Normal range: 5.0-14.5)",
      redBloodCells: "4.6 x 10^12/L (Normal range: 4.0-5.2)",
      platelets: "280 x 10^9/L (Normal range: 150-450)",
      glucose: "85 mg/dL (Normal range: 70-100)",
      calcium: "9.8 mg/dL (Normal range: 8.5-10.5)",
      notes: "All results within normal ranges. No abnormalities detected.",
    },
    recommendations:
      "No follow-up required. Continue regular health maintenance.",
    attachments: [
      { name: "Lab_Results.pdf", type: "pdf", size: "425 KB" },
      { name: "Lab_Analysis.pdf", type: "pdf", size: "290 KB" },
    ],
  },
  {
    id: "4",
    title: "Prescription Renewal",
    date: "February 10, 2023",
    time: "3:30 PM",
    childName: "Emma Johnson",
    childId: "1",
    childAge: "8 years",
    childImage: "",
    doctor: "Dr. James Wilson",
    hospital: "City Children's Hospital",
    category: "Medical",
    status: "Completed",
    description:
      "Renewal of asthma maintenance medication prescription for ongoing management.",
    details: {
      medication: "Fluticasone propionate (Flixotide)",
      dosage: "50mcg, 2 puffs twice daily",
      quantity: "1 inhaler (120 doses)",
      refills: "3",
      duration: "3 months",
      notes:
        "Asthma currently well-controlled. No exacerbations in the past 6 months.",
    },
    recommendations:
      "Continue current asthma action plan. Follow up in 3 months for assessment. Contact if symptoms worsen or rescue inhaler usage increases.",
    attachments: [
      { name: "Prescription.pdf", type: "pdf", size: "180 KB" },
      { name: "Asthma_Action_Plan.pdf", type: "pdf", size: "215 KB" },
    ],
  },
  {
    id: "123",
    title: "Annual Check-up Report",
    date: "Oct 5, 2023",
    time: "11:00 AM",
    childName: "Emily Johnson",
    childId: "1",
    childAge: "8 years",
    childImage: "",
    doctor: "Dr. Robert Anderson",
    hospital: "City Children's Hospital",
    category: "Medical",
    status: "Completed",
    description:
      "Comprehensive annual health check-up with developmental assessment and immunization review.",
    details: {
      height: "128 cm (55th percentile)",
      weight: "26 kg (60th percentile)",
      temperature: "36.6°C",
      bloodPressure: "100/65 mmHg",
      heartRate: "85 bpm",
      respiratoryRate: "20 breaths/min",
      vision: "20/20 both eyes",
      hearing: "Normal",
      notes:
        "Growth and development on track. All major developmental milestones achieved.",
    },
    recommendations:
      "Continue balanced nutrition and regular physical activity. Schedule dental check-up within next 3 months.",
    attachments: [
      { name: "Annual_Checkup_Report.pdf", type: "pdf", size: "345 KB" },
      { name: "Growth_Chart.pdf", type: "pdf", size: "215 KB" },
    ],
  },
  {
    id: "456",
    title: "School Report Card",
    date: "Sep 30, 2023",
    time: "2:00 PM",
    childName: "Michael Johnson",
    childId: "2",
    childAge: "6 years",
    childImage: "",
    doctor: "",
    hospital: "Springfield Elementary School",
    category: "School",
    status: "Completed",
    description:
      "First quarter academic performance and behavioral assessment report.",
    details: {
      academics: {
        reading: "Exceeding expectations",
        mathematics: "Meeting expectations",
        science: "Meeting expectations",
        socialStudies: "Meeting expectations",
        arts: "Exceeding expectations",
      },
      behavior:
        "Works well with others, follows classroom rules, occasionally needs reminders to stay on task.",
      attendance: "Present 45/45 days",
      notes:
        "Michael shows strong aptitude in reading and creative activities. Has adjusted well to first grade environment.",
    },
    recommendations:
      "Continue reading at home. Practice basic addition and subtraction skills through games and daily activities.",
    attachments: [
      { name: "Report_Card_Q1.pdf", type: "pdf", size: "280 KB" },
      { name: "Teacher_Comments.pdf", type: "pdf", size: "150 KB" },
    ],
  },
  {
    id: "789",
    title: "Vaccination Record",
    date: "Sep 15, 2023",
    time: "9:30 AM",
    childName: "Emily Johnson",
    childId: "1",
    childAge: "8 years",
    childImage: "",
    doctor: "Dr. Patricia Lee",
    hospital: "Community Health Clinic",
    category: "Vaccination",
    status: "Completed",
    description:
      "Scheduled vaccination as per the national immunization program.",
    details: {
      vaccineName: "DTaP (Diphtheria, Tetanus, Pertussis) Booster",
      manufacturer: "Sanofi Pasteur",
      batchNumber: "DTB-2023-1184",
      site: "Right deltoid",
      nextDose: "N/A (Final booster for this series)",
      notes:
        "Vaccination administered without complications. Brief explanation of possible side effects provided to parent.",
    },
    recommendations:
      "Apply cold compress if soreness occurs at injection site. Contact clinic if fever persists over 101°F for more than 24 hours.",
    attachments: [
      { name: "Vaccination_Certificate.pdf", type: "pdf", size: "210 KB" },
      { name: "Immunization_Schedule.pdf", type: "pdf", size: "175 KB" },
    ],
  },
];

const MedicalRecordDetail = () => {
  const [record, setRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate fetching data from API
    const fetchRecord = () => {
      setLoading(true);
      setTimeout(() => {
        const foundRecord = medicalRecordsData.find(
          (record) => record.id === id
        );
        if (foundRecord) {
          setRecord(foundRecord);
        }
        setLoading(false);
      }, 800); // Simulate network delay
    };

    fetchRecord();
  }, [id]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const generateReport = () => {
    const doc = new jsPDF();

    // Add content to the PDF
    doc.text("This is a sample report", 10, 10);

    return doc;
  };

  const handlePrint = () => {
    const doc = generateReport();
    doc.autoPrint(); // Automatically open the print dialog
    window.open(doc.output("bloburl"), "_blank");
  };

  const handleDownload = () => {
    const doc = generateReport();
    doc.save("report.pdf"); // Save the PDF with a specific name
  };

  if (loading) {
    return (
      <PageTransition>
        <AppLayout userType="parent">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft size={18} />
              </Button>
              <Skeleton className="h-8 w-48" />
            </div>
            <Card>
              <CardHeader>
                <Skeleton className="h-6 w-36 mb-2" />
                <Skeleton className="h-4 w-24" />
              </CardHeader>
              <CardContent className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </CardContent>
            </Card>
          </div>
        </AppLayout>
      </PageTransition>
    );
  }

  if (!record) {
    return (
      <PageTransition>
        <AppLayout userType="parent">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft size={18} />
              </Button>
              <h1 className="text-2xl font-bold">Record Not Found</h1>
            </div>
            <Card>
              <CardContent className="py-6">
                <div className="text-center space-y-4">
                  <FileText
                    size={48}
                    className="mx-auto text-muted-foreground"
                  />
                  <div>
                    <h2 className="text-xl font-semibold">
                      Medical Record Not Found
                    </h2>
                    <p className="text-muted-foreground mt-1">
                      The requested record does not exist or has been removed.
                    </p>
                  </div>
                  <Button onClick={handleGoBack}>Go Back</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </AppLayout>
      </PageTransition>
    );
  }

  let categoryColor = "";
  switch (record.category.toLowerCase()) {
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
    <PageTransition>
      <AppLayout userType="parent">
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={handleGoBack}>
                <ArrowLeft size={18} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">{record.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{record.date}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{record.time}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint}>
                <Printer size={16} className="mr-2" />
                Print
              </Button>
              <Button size="sm" onClick={handleDownload}>
                <Download size={16} className="mr-2" />
                Download
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center ${categoryColor}`}
                    >
                      <FileText size={16} />
                    </div>
                    Record Details
                    <Badge variant="outline" className="ml-2">
                      {record.category}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Description</h3>
                    <p className="text-muted-foreground">
                      {record.description}
                    </p>
                  </div>

                  <Separator />

                  <Tabs defaultValue="details" className="w-full">
                    <TabsList className="grid grid-cols-3 mb-4">
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="recommendations">
                        Recommendations
                      </TabsTrigger>
                      <TabsTrigger value="attachments">Attachments</TabsTrigger>
                    </TabsList>

                    <TabsContent value="details" className="space-y-4">
                      {record.category === "Vaccination" && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Vaccine Name</p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.vaccineName}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Manufacturer</p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.manufacturer}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Batch Number</p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.batchNumber}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">
                              Injection Site
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.site}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Next Dose Due</p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.nextDose}
                            </p>
                          </div>
                        </div>
                      )}

                      {record.category === "Medical" &&
                        !record.details.medication && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Height</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.height}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Weight</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.weight}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Temperature</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.temperature}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Blood Pressure
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.bloodPressure}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Heart Rate</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.heartRate}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">
                                Respiratory Rate
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.respiratoryRate}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Vision</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.vision}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Hearing</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.hearing}
                              </p>
                            </div>
                          </div>
                        )}

                      {record.category === "Medical" &&
                        record.details.medication && (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Medication</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.medication}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Dosage</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.dosage}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Quantity</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.quantity}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Refills</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.refills}
                              </p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm font-medium">Duration</p>
                              <p className="text-sm text-muted-foreground">
                                {record.details.duration}
                              </p>
                            </div>
                          </div>
                        )}

                      {record.category === "School" && (
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium mb-2">
                              Academic Performance
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Reading</p>
                                <p className="text-sm text-muted-foreground">
                                  {record.details.academics.reading}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">
                                  Mathematics
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {record.details.academics.mathematics}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Science</p>
                                <p className="text-sm text-muted-foreground">
                                  {record.details.academics.science}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">
                                  Social Studies
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {record.details.academics.socialStudies}
                                </p>
                              </div>
                              <div className="space-y-1">
                                <p className="text-sm font-medium">Arts</p>
                                <p className="text-sm text-muted-foreground">
                                  {record.details.academics.arts}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Behavior</p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.behavior}
                            </p>
                          </div>
                          <div className="space-y-1">
                            <p className="text-sm font-medium">Attendance</p>
                            <p className="text-sm text-muted-foreground">
                              {record.details.attendance}
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="mt-4">
                        <p className="text-sm font-medium">Notes</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          {record.details.notes}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="recommendations">
                      <div className="p-4 border rounded-lg bg-muted/30">
                        <h3 className="font-medium mb-2">Recommendations</h3>
                        <p className="text-sm text-muted-foreground">
                          {record.recommendations}
                        </p>
                      </div>
                    </TabsContent>

                    <TabsContent value="attachments">
                      <div className="space-y-3">
                        {record.attachments.map(
                          (attachment: any, index: number) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                                  <FileText size={18} />
                                </div>
                                <div>
                                  <p className="font-medium text-sm">
                                    {attachment.name}
                                  </p>
                                  <p className="text-xs text-muted-foreground">
                                    {attachment.size}
                                  </p>
                                </div>
                              </div>
                              <Button variant="outline" size="sm">
                                <Download size={14} className="mr-2" />
                                Download
                              </Button>
                            </div>
                          )
                        )}
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Child Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col items-center text-center mb-4">
                    <Avatar className="h-20 w-20 mb-2">
                      <AvatarImage
                        src={record.childImage}
                        alt={record.childName}
                      />
                      <AvatarFallback className="bg-primary/10 text-primary text-xl">
                        {record.childName
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg">
                      {record.childName}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {record.childAge}
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <Button
                      variant="outline"
                      className="w-full justify-start"
                      asChild
                    >
                      <div>
                        <User size={16} className="mr-2" />
                        View Full Profile
                      </div>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Provider Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {record.doctor && (
                    <div className="space-y-1">
                      <div className="flex items-start gap-3">
                        <User
                          size={16}
                          className="mt-0.5 text-muted-foreground"
                        />
                        <div>
                          <p className="text-sm font-medium">Doctor</p>
                          <p className="text-sm text-muted-foreground">
                            {record.doctor}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="space-y-1">
                    <div className="flex items-start gap-3">
                      <Hospital
                        size={16}
                        className="mt-0.5 text-muted-foreground"
                      />
                      <div>
                        <p className="text-sm font-medium">Facility</p>
                        <p className="text-sm text-muted-foreground">
                          {record.hospital}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default MedicalRecordDetail;
