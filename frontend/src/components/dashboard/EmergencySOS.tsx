
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertTriangle, Phone, Siren } from "lucide-react";

interface EmergencySOSProps {
  childData: {
    name: string;
    age: number;
    bloodType: string;
    allergies?: string;
    dob?: string;
    emergency?: {
      contact?: string;
      phone?: string;
      doctor?: string;
    };
  };
}

export function EmergencySOS({ childData }: EmergencySOSProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full gap-2">
          <Siren size={18} />
          <span>Emergency SOS</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-destructive font-bold text-xl">
            <AlertTriangle size={22} className="text-destructive" />
            EMERGENCY INFORMATION
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 mt-2">
          <div className="p-4 rounded-lg bg-red-50 border border-red-200">
            <div className="space-y-3">
              <h3 className="font-bold text-lg">{childData.name}</h3>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-muted-foreground">Age</p>
                  <p className="font-medium">{childData.age} years</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Blood Type</p>
                  <p className="font-medium text-red-600">{childData.bloodType}</p>
                </div>
                {childData.dob && (
                  <div>
                    <p className="text-muted-foreground">Date of Birth</p>
                    <p className="font-medium">{childData.dob}</p>
                  </div>
                )}
                {childData.allergies && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Allergies</p>
                    <p className="font-medium">{childData.allergies}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {childData.emergency && (
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
              <h3 className="font-bold mb-2">Emergency Contacts</h3>
              <div className="space-y-2 text-sm">
                {childData.emergency.contact && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Primary Contact:</span>
                    <span className="font-medium">{childData.emergency.contact}</span>
                  </div>
                )}
                {childData.emergency.phone && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone:</span>
                    <span className="font-medium">{childData.emergency.phone}</span>
                  </div>
                )}
                {childData.emergency.doctor && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Doctor:</span>
                    <span className="font-medium">{childData.emergency.doctor}</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          <div className="flex flex-col gap-2 mt-4">
            <Button className="gap-2 bg-red-600 hover:bg-red-700">
              <Phone size={16} />
              Call Emergency Services (911)
            </Button>
            {childData.emergency?.phone && (
              <Button variant="outline" className="gap-2">
                <Phone size={16} />
                Call Emergency Contact
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
