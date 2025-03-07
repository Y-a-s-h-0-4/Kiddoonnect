
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Line, 
  LineChart, 
  ResponsiveContainer, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid,
  Legend,
  BarChart,
  Bar
} from "recharts";

// Mock data for height and weight over time
const growthData = [
  { age: "0", height: 50, weight: 3.5 },
  { age: "1", height: 75, weight: 10 },
  { age: "2", height: 85, weight: 12.5 },
  { age: "3", height: 95, weight: 14 },
  { age: "4", height: 100, weight: 16.5 },
  { age: "5", height: 108, weight: 18.5 },
  { age: "6", height: 115, weight: 21 },
  { age: "7", height: 122, weight: 24 },
];

// Mock data for vaccinations by year
const vaccinationData = [
  { year: "2016", count: 8 },
  { year: "2017", count: 3 },
  { year: "2018", count: 2 },
  { year: "2019", count: 2 },
  { year: "2020", count: 1 },
  { year: "2021", count: 1 },
  { year: "2022", count: 1 },
  { year: "2023", count: 1 }
];

interface ChildAnalyticsProps {
  childName: string;
  childAge: number;
}

export function ChildAnalytics({ childName, childAge }: ChildAnalyticsProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Growth Chart</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={growthData.slice(0, childAge + 1)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="age" label={{ value: 'Age (years)', position: 'insideBottom', offset: -5 }} />
                  <YAxis yAxisId="left" label={{ value: 'Height (cm)', angle: -90, position: 'insideLeft' }} />
                  <YAxis yAxisId="right" orientation="right" label={{ value: 'Weight (kg)', angle: 90, position: 'insideRight' }} />
                  <Tooltip />
                  <Legend />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="height"
                    stroke="#2563eb"
                    activeDot={{ r: 8 }}
                    name="Height (cm)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="weight"
                    stroke="#10b981"
                    name="Weight (kg)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              {childName}'s growth chart over time
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-medium">Vaccination History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={vaccinationData.slice(0, childAge + 1)}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="count"
                    name="Vaccinations"
                    fill="#f59e0b"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
            <p className="text-sm text-muted-foreground text-center mt-2">
              Number of vaccinations by year
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
