
import { AppLayout } from "@/components/layout/AppLayout";
import { ChildProfileCard } from "@/components/dashboard/ChildProfileCard";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ChildProfiles = () => {
  // Mock data for children profiles
  const children = [
    {
      id: "1",
      name: "Emma Johnson",
      age: 7,
      bloodType: "A+",
      nextCheckup: "Oct 15, 2023",
      allergies: "Peanuts, Dairy",
    },
    {
      id: "2",
      name: "Noah Smith",
      age: 5,
      bloodType: "O-",
      nextCheckup: "Nov 20, 2023",
      allergies: "Dust, Pollen",
    },
    {
      id: "3",
      name: "Olivia Williams",
      age: 9,
      bloodType: "B+",
      nextCheckup: "Dec 5, 2023",
      allergies: "Shellfish, Eggs",
    },
  ];

  return (
    <PageTransition>
      <AppLayout userType="parent">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Child Profiles</h1>
              <p className="text-muted-foreground">
                Manage and view your children's profiles
              </p>
            </div>
            <Button asChild className="flex items-center gap-2">
              <Link to="/add-child">
                <PlusCircle size={16} />
                <span>Add Child</span>
              </Link>
            </Button>
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
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default ChildProfiles;
