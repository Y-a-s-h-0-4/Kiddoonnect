
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AppLayout } from "@/components/layout/AppLayout";
import { PageTransition } from "@/components/layout/PageTransition";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, ArrowLeft, Upload } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const addChildSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  fatherName: z.string().min(2, { message: "Father's name must be at least 2 characters" }),
  motherName: z.string().min(2, { message: "Mother's name must be at least 2 characters" }),
  bloodGroup: z.string().min(1, { message: "Blood group is required" }),
  allergies: z.string().optional(),
  dob: z.date({ required_error: "Date of birth is required" }),
  birthmark: z.string().optional(),
  aadharNumber: z.string().regex(/^\d{12}$/, { message: "Aadhar number must be 12 digits" }),
});

type AddChildFormValues = z.infer<typeof addChildSchema>;

const AddChild = () => {
  const navigate = useNavigate();
  const [avatarUrl, setAvatarUrl] = useState<string | undefined>(undefined);

  const form = useForm<AddChildFormValues>({
    resolver: zodResolver(addChildSchema),
    defaultValues: {
      name: "",
      fatherName: "",
      motherName: "",
      bloodGroup: "",
      allergies: "",
      birthmark: "",
      aadharNumber: "",
    },
  });

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

  const onSubmit = (data: AddChildFormValues) => {
    // In a real application, this would send data to a backend
    // For now, we'll just show a success toast and redirect
    
    // Calculate age from date of birth
    const today = new Date();
    const birthDate = new Date(data.dob);
    const age = today.getFullYear() - birthDate.getFullYear() - 
      (today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
    
    const nextCheckupDate = new Date();
    nextCheckupDate.setMonth(nextCheckupDate.getMonth() + 3);
    
    const child = {
      id: Math.floor(Math.random() * 10000).toString(),
      name: data.name,
      age,
      fatherName: data.fatherName,
      motherName: data.motherName,
      bloodType: data.bloodGroup,
      avatarUrl,
      allergies: data.allergies || "None",
      birthmark: data.birthmark || "None",
      aadharNumber: data.aadharNumber,
      dob: format(data.dob, "PPP"),
      nextCheckup: format(nextCheckupDate, "PPP"),
    };
    
    toast.success("Child added successfully!");
    
    // In a real app, we would save this data and navigate to the child's profile
    // For now, simply go back to the child profiles page
    setTimeout(() => navigate("/children"), 1500);
  };

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
            <h1 className="text-2xl font-bold tracking-tight">Add Child</h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <div className="flex flex-col items-center p-6 border rounded-lg">
                <div className="mb-4 relative group">
                  <div className="h-32 w-32 rounded-full flex items-center justify-center text-3xl font-semibold bg-primary text-primary-foreground overflow-hidden">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Child" className="h-full w-full object-cover" />
                    ) : (
                      "+"
                    )}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-full">
                      <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center text-white">
                        <Upload size={24} />
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
                <p className="text-sm text-muted-foreground mb-2">Upload Child's Photo</p>
                <Button variant="outline" size="sm" className="w-full">
                  <label htmlFor="photo-upload" className="cursor-pointer flex items-center justify-center gap-2 w-full">
                    <Upload size={14} />
                    <span>Upload Photo</span>
                  </label>
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 border rounded-lg p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Child Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter child's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="dob"
                      render={({ field }) => (
                        <FormItem className="flex flex-col">
                          <FormLabel>Date of Birth*</FormLabel>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className={cn(
                                    "w-full pl-3 text-left font-normal",
                                    !field.value && "text-muted-foreground"
                                  )}
                                >
                                  {field.value ? (
                                    format(field.value, "PPP")
                                  ) : (
                                    <span>Pick a date</span>
                                  )}
                                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                disabled={(date) =>
                                  date > new Date() || date < new Date("1950-01-01")
                                }
                                initialFocus
                                className={cn("p-3 pointer-events-auto")}
                              />
                            </PopoverContent>
                          </Popover>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="fatherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Father's Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter father's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="motherName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mother's Name*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter mother's name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="bloodGroup"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Blood Group*</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select blood group" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="A+">A+</SelectItem>
                              <SelectItem value="A-">A-</SelectItem>
                              <SelectItem value="B+">B+</SelectItem>
                              <SelectItem value="B-">B-</SelectItem>
                              <SelectItem value="AB+">AB+</SelectItem>
                              <SelectItem value="AB-">AB-</SelectItem>
                              <SelectItem value="O+">O+</SelectItem>
                              <SelectItem value="O-">O-</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="aadharNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Aadhar Number*</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter 12-digit Aadhar number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="allergies"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Allergies</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter allergies if any" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="birthmark"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Birthmark</FormLabel>
                          <FormControl>
                            <Input placeholder="Describe birthmark if any" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end space-x-2">
                    <Button type="button" variant="outline" onClick={() => navigate(-1)}>
                      Cancel
                    </Button>
                    <Button type="submit">Add Child</Button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </AppLayout>
    </PageTransition>
  );
};

export default AddChild;
