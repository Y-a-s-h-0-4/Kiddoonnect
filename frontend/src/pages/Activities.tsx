
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { RecordItem } from "@/components/dashboard/RecordItem";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PlusCircle, Music, Trophy, Book, Award } from "lucide-react";
import { useState } from "react";

const Activities = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  // Mock data for activities
  const activities = [
    {
      id: "1",
      title: "Piano Recital",
      date: "June 20, 2023",
      childName: "Emma Johnson",
      category: "Activity",
      icon: <Music size={20} />,
      path: "/activities/1",
    },
    {
      id: "2",
      title: "Soccer Tournament",
      date: "July 5, 2023",
      childName: "Noah Smith",
      category: "Activity",
      icon: <Trophy size={20} />,
      path: "/activities/2",
      isUnread: true,
    },
    {
      id: "3",
      title: "Art Competition",
      date: "May 25, 2023",
      childName: "Olivia Williams",
      category: "Activity",
      icon: <Book size={20} />,
      path: "/activities/3",
    },
    {
      id: "4",
      title: "Swimming Certificate",
      date: "April 15, 2023",
      childName: "Emma Johnson",
      category: "Activity",
      icon: <Award size={20} />,
      path: "/activities/4",
    },
  ];

  return (
    <PageTransition>
      <AppLayout userType="parent">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Activities</h1>
              <p className="text-muted-foreground">
                Track your children's extracurricular activities
              </p>
            </div>
            <Button className="flex items-center gap-2">
              <PlusCircle size={16} />
              <span>Add Activity</span>
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Activities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activities.map((activity, index) => (
                    <RecordItem
                      key={activity.id}
                      id={activity.id}
                      title={activity.title}
                      date={activity.date}
                      childName={activity.childName}
                      category={activity.category}
                      icon={activity.icon}
                      path={activity.path}
                      delay={index}
                      isUnread={activity.isUnread}
                    />
                  ))}
                </CardContent>
              </Card>
            </div>

            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Activity Calendar</CardTitle>
                </CardHeader>
                <CardContent>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default Activities;
