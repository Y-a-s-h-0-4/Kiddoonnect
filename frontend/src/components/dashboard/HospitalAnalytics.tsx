
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Bar, 
  BarChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for the bar chart
const monthlyRecords = [
  { name: "Jan", records: 49 },
  { name: "Feb", records: 62 },
  { name: "Mar", records: 41 },
  { name: "Apr", records: 50 },
  { name: "May", records: 65 },
  { name: "Jun", records: 78 },
  { name: "Jul", records: 91 },
  { name: "Aug", records: 81 },
  { name: "Sep", records: 56 },
  { name: "Oct", records: 42 },
  { name: "Nov", records: 0 },
  { name: "Dec", records: 0 }
];

// Mock data for the pie chart
const recordTypes = [
  { name: "Doctor Visits", value: 45, color: "#2563eb" },
  { name: "Vaccinations", value: 30, color: "#10b981" },
  { name: "Lab Tests", value: 15, color: "#f59e0b" },
  { name: "Prescriptions", value: 10, color: "#ef4444" }
];

// Mock data for age groups
const ageGroups = [
  { name: "0-2", patients: 24 },
  { name: "3-5", patients: 32 },
  { name: "6-8", patients: 18 },
  { name: "9-12", patients: 12 },
  { name: "13+", patients: 6 }
];

export function HospitalAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Monthly Records Added</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyRecords}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} records`, "Records"]}
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem"
                    }}
                  />
                  <Bar 
                    dataKey="records" 
                    fill="#2563eb" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Records added by month in 2023
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Record Types Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={recordTypes}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {recordTypes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => [`${value}%`, "Percentage"]}
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem"
                    }}
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Distribution of medical record types
            </p>
          </CardContent>
        </Card>
        
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Patients by Age Group</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={ageGroups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`${value} patients`, "Patients"]}
                    contentStyle={{ 
                      backgroundColor: "white", 
                      border: "1px solid #e2e8f0",
                      borderRadius: "0.375rem"
                    }}
                  />
                  <Bar 
                    dataKey="patients" 
                    fill="#10b981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Number of patients in each age group
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
